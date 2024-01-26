const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // Remember, the backend needs to be authorized with a token
  // We're providing a token you can use to interact with the backend API
  // DON'T MODIFY THIS TOKEN
  static token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
    "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
    "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

  static async request(endpoint, data = {}, method = "GET") {
    const url = new URL(`${BASE_URL}/${endpoint}`);
    const headers = {
      authorization: `Bearer ${JoblyApi.token}`,
      'content-type': 'application/json',
    };

    url.search = (method === "GET")
      ? new URLSearchParams(data).toString()
      : "";

    // set to undefined since the body property cannot exist on a GET method
    const body = (method !== "GET")
      ? JSON.stringify(data)
      : undefined;

    const resp = await fetch(url, { method, body, headers });

    if (!resp.ok) {
      console.error("API Error:", resp.statusText, resp.status);
      const message = (await resp.json()).error.message;
      throw Array.isArray(message) ? message : [message];
    }

    return await resp.json();
  }

  // Individual API routes

  /** Get list of companies. */

  static async getCompanies(searchTerm) {
    const res = searchTerm
      ? await this.request('companies', {nameLike: searchTerm})
      : await this.request('companies');

    return res.companies;
  }


  /** Get details on a company by handle. */

  static async getCompany(handle) {
    const res = await this.request(`companies/${handle}`);
    return res.company;
  }


  /**  Get list of jobs. */

  static async getJobs(searchTerm) {
    const res = searchTerm
       ? await this.request('jobs', {title: searchTerm})
       : await this.request('jobs');

    return res.jobs;
  }


  /** Registers user with form data --
   *    On success, stores response token in API and returns the token.
   *    On failure, returns the response error messages.
   *
   *  formData: { username, password, firstName, lastName, email }
   */

  static async registerUser(username, password, firstName, lastName, email) {
    const data = {username, password, firstName, lastName, email};


    // FIXME: here's a fix!
    let res;
    try {
      res = await this.request(`auth/register`, data, "POST");
      JoblyApi.token = res.token;
      return { username, firstName, lastName, email };

    } catch (err) {
      console.log('This is err FORREAL: ', err);
      console.log('{errors: [...err] }', {errors: [...err]});
      return { errors: [...err] };
    }
  }


  /** Logins user */

  static async loginUser(username, password) {
    const data = { username, password };


    // FIXME: here's a fix!
    let res;
    try {
      res = await this.request(`auth/token`, data, "POST");
      JoblyApi.token = res.token;
      const { firstName, lastName, email } = await this.getUser(username);
      return { firstName, lastName, email };
    } catch (err) {
      return { errors: [...res.error.message] };
    }
  }


  /** Gets user */

  static async getUser(username) {


    // FIXME: here's a fix!
    let res;
    try {
      const { user } = await this.request(`users/${username}`);
      return user;
    } catch (err) {
      return { errors: [...res.error.message] };
    }
  }

}

export default JoblyApi;
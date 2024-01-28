import supertest from "supertest";
import config from "../config";

const account = {
  async login(creds) {
    return await supertest(config.ulr)
      .get("/v2/user/login")
      .query(creds);
  },
  async getSessionInCache(creds = {username: config.credentials.username, password: config.credentials.password}) {
    const res = await this.login(creds);
    return res.body.message.split(':')[1];
  },
  async getUserInfo(username) {
    return await supertest(config.ulr)
      .get(`/v2/user/${username}`)
  },
}

export default account;
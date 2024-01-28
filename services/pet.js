import supertest from "supertest";
import config from "../config";

const pet = {
  async findByStatus(status) {
    return await supertest(config.ulr)
      .get("/v2/pet/findByStatus")
      .query({status: status});
  },
  async findPetById(id) {
    return await supertest(config.ulr)
      .get(`/v2/pet/${id}`)
  },
  async addNewPet(body) {
    return await supertest(config.ulr)
      .post('/v2/pet')
      .send(body)
  }    
}
  
export default pet;
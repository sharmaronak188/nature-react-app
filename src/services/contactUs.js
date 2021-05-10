import axios from "axios";

const USER_API_BASE_URL = "http://localhost:8081/user/contact/";
const headers = {
  "content-type": "application/json",
};

class contactService {
  // Adding a new contact data to the database.
  addContact(name, email, query) {
    return axios.post(
      USER_API_BASE_URL,
      { name: name, email: email, query: query },
      { headers: headers }
    );
  }
}

export default new contactService();

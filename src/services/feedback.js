import axios from "axios";

const USER_API_BASE_URL = "http://localhost:8081/user/feedback/";
const headers = {
  "content-type": "application/json",
};

class feedbackService {
  // Adding a new feedback comment to the database.
  addFeedback(name, email, comment) {
    return axios.post(
      USER_API_BASE_URL,
      { name: name, email: email, comment: comment },
      { headers: headers }
    );
  }
}

export default new feedbackService();

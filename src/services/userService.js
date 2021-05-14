import axios from "axios";
import * as moment from "moment"; // Library for parsing, validating, formatting dates.

const USER_API_BASE_URL = "http://localhost:8081/user/";
const headers = {
  "content-type": "application/json",
};

class UserService {
  // Sign Up function to post the data to the DB which is entered by the user
  signUp(name, email, password) {
    return axios.post(
      USER_API_BASE_URL,
      { name: name, email: email, password: password },
      { headers: headers }
    );
  }

  // login function to post valid user data into the DB
  login(email, password) {
    return axios.post(USER_API_BASE_URL + "login", {
      email: email,
      password: password,
    });
  }

  // Setting the local storage with token ID, name and expiry time
  setLocalStorage(responseObj) {
    const expiresAt = moment().add(responseObj.data.expiresIn);
    console.log(responseObj.data);
    localStorage.setItem("id_token", responseObj.data.token);
    localStorage.setItem("name", responseObj.data.name);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
  }

  //Logout function to remove items from localStorage
  logout() {
    localStorage.removeItem("email");
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
    localStorage.removeItem("name");
    localStorage.removeItem("productId");
    localStorage.removeItem("productName");
    localStorage.removeItem("productPrice");
  }

  // Function to check is the user logged in or not after the token has expired
  isLoggedIn() {
    return moment().isAfter(this.getExpiration());
  }

  //Function to check if user is logged out or not
  isLoggedOut() {
    return !this.isLoggedIn();
  }

  //Function to check the status of token
  getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }
}

export default new UserService();

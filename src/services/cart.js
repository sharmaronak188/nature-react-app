import axios from "axios"; // Library used to make HTTP request to external APIs or resources.
const tokenProvider = require("axios-token-interceptor");

// Creating instance to store our USER_API_BASE_URL
const instance = axios.create({
  baseURL: "http://localhost:8081/user/cart",
});

// Using interceptor to check token is valid or not before every cart request is sent for Authorization
instance.interceptors.request.use(
  tokenProvider({
    getToken: () => {
      if (localStorage.getItem("id_token")) {
        return localStorage.getItem("id_token").split("Bearer ")[1];
      }
    },
  })
);

// Headers in JSON format
const headers = {
  "content-type": "application/json",
};

// Cart Service to interact with the backend API for add, get, empty and Update operations.
class CartService {
  // to add items in the cart according to the user email.
  addItems(email, productsToAdd) {
    return instance.post(
      "",
      { email: email, productsToAdd: productsToAdd },
      { headers: headers }
    );
  }

  // get items of the cart for particular user.
  getItems(email) {
    return instance.post("id", { email: email }, { headers: headers });
  }

  // Function to delete all items present in the cart
  emptyCart(email) {
    return instance.put("empty", { email: email }, { headers: headers });
  }

  // Function to update the cart in the backend DB.
  updateCart(email, productsToUpdate) {
    return instance.put(
      "update",
      { email: email, productsToUpdate: productsToUpdate },
      { headers: headers }
    );
  }
}

export default new CartService();

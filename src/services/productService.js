import axios from "axios";

const USER_API_BASE_URL = "http://localhost:8081/user/product/";
const headers = {
  "content-type": "application/json",
};

class ProductService {
  // To get all the products from the database.
  getProducts() {
    return axios.get(USER_API_BASE_URL, { headers: headers });
  }

  // To get all details of the product by id from the DB.
  getProduct(id) {
    return axios.get(`${USER_API_BASE_URL}${id}`, { headers: headers });
  }
}

export default new ProductService();

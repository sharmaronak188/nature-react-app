import axios from "axios";

const USER_API_BASE_URL = "http://localhost:8081/user/product/";
const headers = {
  "content-type": "application/json",
};

class ProductService {
  getProducts() {
    return axios.get(USER_API_BASE_URL, { headers: headers });
  }

  getProduct(id) {
    return axios.get(`${USER_API_BASE_URL}${id}`, { headers: headers });
  }
}

export default new ProductService();

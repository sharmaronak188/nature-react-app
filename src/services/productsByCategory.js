import axios from "axios";

const USER_API_BASE_URL = "http://localhost:8081/user/category/";
const headers = {
  "content-type": "application/json",
};

class ProductCategory {
  // To get all the list product categories from the backend
  getProductCategories() {
    return axios.get(USER_API_BASE_URL, { headers: headers });
  }

  // Function to get the list of products by category based on the category ID.
  getProductByCategories(id) {
    const newUrl = `${USER_API_BASE_URL}${id}`;
    return axios.get(newUrl, { headers: headers });
  }

  // Getting product category according to the category id
  getProductCategory(id) {
    const url = `http://localhost:8081/user/categoryById/${id}`;
    return axios.get(url, { headers: headers });
  }
}

export default new ProductCategory();

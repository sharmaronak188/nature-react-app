import React from "react";
import ProductService from "../services/productService";

class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
  }

  // Invoked after the Component has been Mounted i.e after first render() lifecycle.
  componentDidMount() {
    ProductService.getProducts()
      .then((res) => {
        console.log(res.data.message);
        this.setState({ products: res.data.message });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    var referto = "";
    return (
      <div>
        <div className="productsAvailable">
          <h2>Products Available</h2>
        </div>
        <div className="bonsai">
          {this.state.products &&
            this.state.products.map((val) => {
              referto = "/productDetails/" + val.id;
              return (
                <div className="fruitbonsai" key={val.id}>
                  <a className="bonsaiBox" href={referto}>
                    <img src={val.images[0]} alt={val.productName} />
                    <div className="box">
                      <h3>{val.productName}</h3>
                    </div>
                  </a>
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}

export default Products;

import React from "react";
import ProductCategory from "../services/productsByCategory";

class ProductsByCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      products: [],
      category: {},
    };
  }

  componentDidMount() {
    ProductCategory.getProductByCategories(this.state.id)
      .then((res) => {
        this.setState({ products: res.data.message });
      })
      .catch((err) => {
        console.log(err);
      });
    ProductCategory.getProductCategory(this.state.id)
      .then((res) => {
        this.setState({ category: res.data.message[0] });
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
          <h3>{this.state.category.name}</h3>
        </div>
        <div className="bonsai">
          {this.state.products &&
            this.state.products.map((val) => {
              referto = "/productDetails/" + val.id;
              return <div className="fruitbonsai" key={val.id}>
                <a className="bonsaiBox" href={referto}>
                  <img src={val.images[0]} alt={val.productName} />
                  <div className="box">
                    <h3>{val.productName}</h3>
                  </div>
                </a>
              </div>
            })
          }
        </div>
      </div>
    );
  }
}

export default ProductsByCategory;

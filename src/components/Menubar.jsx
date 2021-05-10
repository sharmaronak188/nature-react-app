import React from "react";
import ProductCategory from "../services/productsByCategory";
import { NavLink } from "react-router-dom";

class Menubar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
    };
  }

  componentDidMount() {
    ProductCategory.getProductCategories()
      .then((res) => {
        this.setState({ categories: res.data.message });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    let referto = "";
    return (
      <div className="menu">
        <p>PRODUCT CATEGORIES</p>
        {this.state.categories &&
          this.state.categories.map((val) => {
            referto = "/productsByCategory/" + val.id;
            return (
              <NavLink className="links" key={val.id} to={referto}>
                {val.name}
              </NavLink>
            );
          })}
      </div>
    );
  }
}

export default Menubar;

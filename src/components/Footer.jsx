import React from "react";

// Importing the Link components from React router DOM for routing and Navigating from one URL to another.
import { Link } from "react-router-dom";

// Providing the required Link to be redirected to on Click.
class Footer extends React.Component {
  render() {
    return (
      <footer>
        <div className="follow">
          <h3>Follow Us</h3>
          <p>
            <img src="/assets/Logo/AllLogo.jpg" alt="logo" />
            <br />
            We also accept:
            <br />
            <br />
            <img src="/assets/Logo/visaLogo.jpg" alt="visaLogo" />
          </p>
        </div>
        <div className="support">
          <h3>Support</h3>
          <ul type="none">
            <li>
              <Link className="nav-link" to="/" style={{ color: 'inherit', textDecoration: 'inherit' }}>
                Home
              </Link>
            </li>
            <li>
              <Link className="nav-link" to="/products" style={{ color: 'inherit', textDecoration: 'inherit' }}>
                Products available
              </Link>
            </li>
            <li>
              <Link className="nav-link" to="/aboutus" style={{ color: 'inherit', textDecoration: 'inherit' }}>
                About Us
              </Link>
            </li>
            <li>
              <Link className="nav-link" to="/contactus" style={{ color: 'inherit', textDecoration: 'inherit' }}>
                Contact Us
              </Link>
            </li>
            <li>
              <Link className="nav-link" to="/feedback" style={{ color: 'inherit', textDecoration: 'inherit' }}>
                Feedback
              </Link>
            </li>
          </ul>
        </div>
        <div className="account">
          <h3>My Accounts</h3>
          <ul type="none">
            <li>My account</li>
            <li>
              <Link className="nav-link" to="/orders" style={{ color: 'inherit', textDecoration: 'inherit' }}>
                My orders
              </Link>
            </li>
            <li>My credit slips</li>
            <li>My addresses</li>
            <li>My personnel information</li>
          </ul>
        </div>
        <div className="useful">
          <h3>Useful Links</h3>
          <ul type="none">
            <li>Specials</li>
            <li>New products</li>
            <li>Best sellers</li>
            <li>Our store(s)!</li>
            <li>
              <Link className="nav-link" to="/contactus" style={{ color: 'inherit', textDecoration: 'inherit' }}>
                Contact us
              </Link>
            </li>
            <li>Shipping and Delivery policy</li>
            <li>Privacy Policy</li>
            <li>Frequently Asked Questiones</li>
            <li>Terms and Conditions of Use</li>
          </ul>
        </div>
        <div className="copyright">
          <h3>&copy;2017 Nature's Paradise, All rights reserved.</h3>
        </div>
        <div className="address">
          <h3>
            Written by Nature's Paradise.
            <br />
            Visit us at:natureparadise.in or at MG Road,Bangalore, KA, India{" "}
          </h3>
        </div>
      </footer>
    );
  }
}

export default Footer;

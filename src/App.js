import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

// Importing all the components
import Login from "./components/Login";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Menubar from "./components/Menubar";
import Footer from "./components/Footer";
import Main from "./components/Main";
import Feedback from "./components/Feedback";
import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";
import Orders from "./components/Orders";
import Cart from "./components/Cart";
import Products from "./components/Products";
import ProductDetails from "./components/ProductDetails";
import ProductsByCategory from "./components/ProductsByCategory";

// Routing using react-router-dom BrowserRouter which uses the history API to keep UI in sync with URL.
function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Navbar />
        <Menubar />
        <Switch>
          <Route path="/" exact component={Main} />
          <Route path="/login" component={Login} />
          <Route path="/feedback" component={Feedback} />
          <Route path="/aboutus" component={AboutUs} />
          <Route path="/contactus" component={ContactUs} />
          <Route path="/products" exact component={Products} />
          <Route
            exact
            path="/productsByCategory/:id"
            component={ProductsByCategory}
          />
          <Route exact path="/productDetails/:id" component={ProductDetails} />
          <Route exact path="/cart" component={Cart} />
          <Route exact path="/orders" component={Orders} />
          <Redirect to="/" />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

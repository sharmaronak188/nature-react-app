import React from "react";

// Importing NavLink and Link from React router DOM for routing and Navigating purpose from one URL to another.
import { NavLink, Link } from "react-router-dom";

// Importing required Services.
import UserService from "../services/userService";

// Importing the necessary components from Material-UI core and icons library.
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ShoppingCartRoundedIcon from "@material-ui/icons/ShoppingCartRounded";
import ExitToAppRoundedIcon from "@material-ui/icons/ExitToAppRounded";
import { red, yellow } from "@material-ui/core/colors";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      anchorEl: null
    };
    this.initialState = this.state;
    this.logout = this.logout.bind(this);
  }

  // Function to set State when the user is logged out.
  logout = () => {
    UserService.logout();
    this.setState({ state: this.initialState });
  }

  // Invoking the loggedIn method from UserService to check whether the user is logged in or not. 
  componentDidMount() {
    if (UserService.isLoggedIn()) {
      this.setState({ loggedIn: true });
    }
    else {
      this.setState({ loggedIn: false });
    }
  }

  render() {
    // When user is logged in.
    const handleClick = (event) => {
      this.setState({ anchorEl: event.currentTarget })
    };

    // When user is logged out.
    const handleClose = () => {
      this.setState({ anchorEl: null })
    };

    return (<div className="header" style={{ backgroundImage: "url(/assets/Nature/LeavesFinal.jpg)" }}>
      <img src="/assets/Logo/logoTreeBig.jpg" alt="Tree logo" />
      <h2>Nature's Paradise<br />
        <span>Make your Home a Greener Place !!</span></h2>
      <p>{!this.state.loggedIn && <NavLink
        activeClassName="menu_active"
        className="nav-link"
        to="/login"
      >
        Login
                </NavLink>
      }
        {
          this.state.loggedIn && <span>
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
              <AccountCircleIcon />
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={this.state.anchorEl}
              keepMounted
              open={Boolean(this.state.anchorEl)}
              onClose={handleClose}
            >
              <MenuItem><a href="/cart"><ShoppingCartRoundedIcon style={{ color: yellow[500] }} /></a></MenuItem>
              <MenuItem><Link to="/orders">My Orders</Link></MenuItem>
              <MenuItem onClick={this.logout}><a href="/login"><ExitToAppRoundedIcon style={{ color: red[500] }} /></a></MenuItem>
            </Menu>
          </span>
        }
      </p>
    </div>);
  }
}

export default Header;
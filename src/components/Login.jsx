/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

// Importing the required Service.
import UserService from "../services/userService";

class Login extends React.Component {
  constructor(props) {
    super(props);
    // Setting initial state of the component.
    this.state = {
      signUpName: '',
      signUpEmail: '',
      signUpPassword: '',
      name: '',
      email: '',
      password: '',
      loginEmailError: '',
      loginPasswordError: '',
      nameError: '',
      emailError: '',
      passwordError: '',
      signUpSuccess: '',
      signUpFail: ''
    }
    this.initialState = this.state;
  }

  stopSignUpSubmission = (e) => {
    e.preventDefault()
    const isValid = this.signUpValidate()
    if (isValid) {
      console.log(this.state)
      this.signUp();
      this.setState(this.initialState)
    }
  }

  signUpValidate = () => {
    let nameError = ""
    let emailError = ""
    let passwordError = ""
    if (!this.state.signUpName) {
      nameError = "Name cannot be empty"
    }
    else if (!this.state.signUpName.match(/[A-za-z]+$/)) {
      nameError = "Name should consists of only characters"
    }
    if (!this.state.signUpEmail) {
      emailError = "Email cannot be empty"
    }
    else if (!this.state.signUpEmail.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
      emailError = "Invalid Email"
    }
    if (!this.state.signUpPassword) {
      passwordError = "Password cannot be empty"
    }
    else if (!this.state.signUpPassword.match(/[A-Z]{1,}[a-z]{1,}[$,#,@][0-9]/g)) {
      passwordError = "Invalid Password"
    }

    if (nameError || emailError || passwordError) {
      this.setState({ nameError: nameError, emailError: emailError, passwordError: passwordError })
      return false
    }
    return true;
  }

  // refreshPage = () => {
  //   window.location.reload(false);
  // }

  stopLoginSubmission = (e) => {
    e.preventDefault()
    const isValid = this.loginValidate()
    if (isValid) {
      console.log(this.state)
      this.login();
      this.setState(this.initialState)
    }
  }

  loginValidate = () => {
    let loginEmailError = ""
    let loginPasswordError = ""
    if (!this.state.email) {
      loginEmailError = "Email cannot be empty"
    }
    else if (!this.state.email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
      loginEmailError = "Invalid Email"
    }
    if (!this.state.password) {
      loginPasswordError = "Password cannot be empty"
    }
    else if (!this.state.password.match(/[A-Z]{1,}[a-z]{1,}[$,#,@][0-9]/g)) {
      loginPasswordError = "Invalid Password"
    }

    if (loginEmailError || loginPasswordError) {
      this.setState({ loginEmailError: loginEmailError, loginPasswordError: loginPasswordError })
      return false
    }
    return true;
  }

  login() {
    let loginPasswordError = "";
    localStorage.setItem('email', this.state.email);
    UserService.login(this.state.email, this.state.password).then(res => {
      console.log(res);
      UserService.setLocalStorage(res);
      console.log("Login successful");
      if (localStorage.getItem('productId') && localStorage.getItem('productPrice') && localStorage.getItem('productName')) {
        this.props.history.push("/cart");
      } else {
        this.props.history.push("/");
      }
    }).catch(
      err => {
        localStorage.removeItem('email');
        if (err.status === 401) {
          loginPasswordError = "Invalid Username/Password";
          return false;
        } else {
          loginPasswordError = "Invalid Username/Password";
          this.setState({ loginPasswordError: loginPasswordError });
          return false;
        }
      }
    );
  }

  signUp() {
    UserService.signUp(this.state.signUpName, this.state.signUpEmail, this.state.signUpPassword).then(res => {
      console.log(res);
      this.setState({ signUpSuccess: res.data.message });
    }).catch(err => {
      if (err.message === "Request failed with status code 401") {
        this.setState({ signUpFail: "User already exists" });
      }
    });
  }


  render() {
    const { email, password } = this.state;
    const isLoginEnabled = email.length > 0 && password.length > 0;
    const { signUpName, signUpEmail, signUpPassword } = this.state;
    const isSignUpEnabled = signUpName.length > 0 && signUpEmail.length > 0 && signUpPassword.length > 0;
    return (
      <div>
        <div className="loginBlock">
          <h3>AUTHENTICATION</h3>
          <div className="createAccount">
            <form method="POST" onSubmit={this.stopSignUpSubmission}>
              <h2>Add Account</h2>
              <p><label htmlFor="name">Name : </label>
                <span id="nameBox"><input type="text" name="name" placeholder="Enter your name" id="userName" value={this.state.signUpName} onChange={(e) => {
                  this.setState({
                    signUpName: e.target.value
                  })
                }} /></span>
                <span id="nameError">{this.state.nameError}</span></p>
              <p><label htmlFor="email">Email : </label>
                <input type="email" name="email" placeholder="Enter your email address" id="userEmail" value={this.state.signUpEmail} onChange={(e) => {
                  this.setState({
                    signUpEmail: e.target.value
                  })
                }} />
                <span id="emailError">{this.state.emailError}</span>
              </p>
              <p><label htmlFor="password">Password : </label>
                <input type="password" name="password" placeholder="Enter your password" id="userPassword" value={this.state.signUpPassword} onChange={(e) => {
                  this.setState({
                    signUpPassword: e.target.value
                  })
                }} />
                <span id="passwordError">{this.state.passwordError}</span>
              </p>
              <p><a><input type="submit" disabled={!isSignUpEnabled} value="Create Account" /></a></p>
              <p><span id="signUpSuccess" style={{ color: 'green' }}>{this.state.signUpSuccess}</span>
                <span id="signUpFail">{this.state.signUpFail}</span></p>
            </form>
          </div>
          <div className="alreadyUser">
            <form method="POST" onSubmit={this.stopLoginSubmission}>
              <h2>Already a User??</h2>
              <p><label htmlFor="email">Email : </label>
                <input type="email" name="email" placeholder="Enter registered email address" id="email" value={this.state.email} onChange={(e) => {
                  this.setState({
                    email: e.target.value
                  })
                }} />
                <span id="loginEmailError">{this.state.loginEmailError}</span>
              </p>
              <p><label htmlFor="password">Password : </label>
                <input type="password" name="password" placeholder="Enter your password" id="password" value={this.state.password} onChange={(e) => {
                  this.setState({
                    password: e.target.value
                  })
                }} />
                <span id="loginPasswordError">{this.state.loginPasswordError}</span>
              </p>
              <p><a><input type="submit" disabled={!isLoginEnabled} value="Login" /></a>
              </p>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;

/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";

// Importing needed Services
import contactService from '../services/contactUs';

// Initializing the state
const INITIAL_STATE = {
  name: "",
  email: "",
  query: "",
  nameError: "",
  emailError: "",
  queryError: "",
};


class ContactUs extends Component {
  constructor(props) {
    super(props);

    this.state = INITIAL_STATE;

    // Setting the name and email of the user if he/she is already loggedin.
    if (localStorage.getItem('name') && localStorage.getItem('email')) {
      this.state.name = localStorage.getItem('name');
      this.state.email = localStorage.getItem('email');
    }
  }

  // Stop Submission when the Submit button is clicked i.e called on onSubmit event.
  stopSubmission = (e) => {
    e.preventDefault();
    const isValid = this.validate();
    if (isValid) {
      console.log(this.state);
      contactService.addContact(this.state.name, this.state.email, this.state.query).then(res => {
        alert("Thank you for contacting Us");
      }).catch(err => {
        // Handling error
        alert("Some error occured. Try again");
      })
      this.setState(this.INITIAL_STATE);
    }
  };

  // validate function to handle all the errors and print a valid message.
  validate = () => {
    let nameError = "";
    let emailError = "";
    let queryError = "";
    if (!this.state.name) {
      nameError = "Name cannot be empty";
    } else if (!this.state.name.match(/[A-za-z]+$/)) {
      nameError = "Name should contain only characters";
    }
    if (!this.state.email) {
      emailError = "Email cannot be empty";
    } else if (
      !this.state.email.match(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      )
    ) {
      emailError = "Please enter a valid email address";
    }
    if (!this.state.query) {
      queryError = "Please enter your query";
    }

    if (nameError || emailError || queryError) {
      this.setState({
        nameError: nameError,
        emailError: emailError,
        queryError: queryError,
      });
      return false;
    }
    return true;
  };

  render() {
    // Button is enabled only when the length of all necessary input fields is greater than zero.
    const { name, email, query } = this.state;
    const isEnabled = name.length > 0 && email.length > 0 && query.length > 0;
    return (
      <div className="contactUsBlock">
        <h3>CONTACT US</h3>
        <div className="contactUsForm">
          <form name="contactForm" method="POST" onSubmit={this.stopSubmission}>
            <h2>Contact</h2>
            <div className="form-group">
              <p>
                <label htmlFor="cust_name">Name :</label>
                <input
                  type="text"
                  id="customerName"
                  required=""
                  placeholder="Enter your name"
                  value={this.state.name}
                  onChange={(e) => {
                    this.setState({
                      name: e.target.value,
                    });
                  }}
                />
                <span id="nameError">{this.state.nameError}</span>
              </p>
            </div>
            <div className="form-group">
              <p>
                <label htmlFor="cust_name">Email : </label>
                <input
                  type="text"
                  id="customerMail"
                  required=""
                  placeholder="Enter your email address"
                  value={this.state.email}
                  onChange={(e) => {
                    this.setState({
                      email: e.target.value,
                    });
                  }}
                />
                <span id="emailError">{this.state.emailError}</span>
              </p>
            </div>
            <div className="form-group">
              <p>
                <label htmlFor="cust_message" class="query">
                  Query:
                </label>
                <br />
                <textarea
                  rows="4"
                  id="customerNote"
                  name="customerNote"
                  required=""
                  placeholder="Mention your Query"
                  value={this.state.query}
                  onChange={(e) => {
                    this.setState({
                      query: e.target.value,
                    });
                  }}
                ></textarea>
                <span id="queryError">{this.state.queryError}</span>
              </p>
            </div>
            <a className="formSubmit" href="#">
              <input type="submit" disabled={!isEnabled} id="submit" value="Submit" />
            </a>
          </form>
        </div>
      </div>
    );
  }
}

export default ContactUs;

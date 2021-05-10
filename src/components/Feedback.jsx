import React, { Component } from "react";

// Importing the necessary services.
import feedbackService from '../services/feedback';

// Initializing the state of the component
const INITIAL_STATE = {
  name: "",
  email: "",
  feedback: "",
  nameError: "",
  emailError: "",
  feedbackError: "",
};

class Feedback extends Component {
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
      feedbackService.addFeedback(this.state.name, this.state.email, this.state.feedback).then(res => {
        alert("Thank You for your valuable feedback");
      }).catch(err => {
        alert("Some error occured. Try again");
      })
      this.setState(this.INITIAL_STATE);
    }
  };

  //  validate function to handle all the errors and print a valid message.
  validate = () => {
    let nameError = "";
    let emailError = "";
    let feedbackError = "";
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
    if (!this.state.feedback) {
      feedbackError = "Please enter your query";
    }

    if (nameError || emailError || feedbackError) {
      this.setState({
        nameError: nameError,
        emailError: emailError,
        feedbackError,
      });
      return false;
    }
    return true;
  };

  render() {
    // Button is enabled only when the length of all necessary input fields is greater than zero.
    const { name, email, feedback } = this.state;
    const isEnabled = name.length > 0 && email.length > 0 && feedback.length > 0;
    return (
      <div className="feedbackBlock">
        <h3>FEEDBACK</h3>
        <div className="feedbackForm">
          <form
            name="feedbackForm"
            method="POST"
            onSubmit={this.stopSubmission}
          >
            <h2>Your Feedback</h2>
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
                <label htmlFor="cust_name">Email :</label>
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
              <p className="formfield">
                <label htmlFor="cust_message">Comment:</label>
                <br />
                <textarea
                  rows="5"
                  id="customerNote"
                  name="customerNote"
                  placeholder="Write your comments here"
                  value={this.state.feedback}
                  onChange={(e) => {
                    this.setState({
                      feedback: e.target.value,
                    });
                  }}
                ></textarea>
                <span id="feedbackError">{this.state.feedbackError}</span>
              </p>
            </div>
            <a href=" # " className="feedbackSubmit">
              <input type="submit" id="submit" disabled={!isEnabled} value="Post comment" />
            </a>
          </form>
        </div>
      </div>
    );
  }
}

export default Feedback;

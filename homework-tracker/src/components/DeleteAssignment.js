import React from "react";
import Logo from "../assets/Logo.png";
import { Link, Redirect } from "react-router-dom";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import firebase from "./authentication/firebase";

export default function DeleteAssignment(props) {
  const assignment = props.location.state.assignment;

  const API_URL = process.env.REACT_APP_API_URL;

  const deleteAssignment = async (event) => {
    // DELETE request HERE
    let JWTtoken = await (
      await firebase.auth().currentUser.getIdTokenResult()).token;
      if (JWTtoken !== null) {
        const id = assignment._id
        const result = await fetch(API_URL + "assignments/" + id, {
          method:"DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${JWTtoken}`
          },
        });
        if(result.status === 200) {
          alert("Deleted Assignment");
        window.location.href = "/";
      } else {
        alert("Error: Something went wrong, please try again");
      }
  }
};

  return (
    <div>
      <div className="header">
        <div className="brand">
          <Link to="/">
            <img alt="Logo" src={Logo} />
          </Link>
          <h1>Delete Assignment</h1>
        </div>
      </div>
      <div className="Card">
        <div id="add-assignment-form" className="addAssignmentForm">
          <div className="brand">
            <h2>Are you sure you want to delete the following assignment ?</h2>
          </div>
          <input placeholder={assignment.title} />
          <input placeholder={assignment.description} />
          <div className="dueDate">
            <input placeholder={assignment.date.toDateString().slice(4)} />
            <FontAwesomeIcon className="calendar" icon={faCalendar} />
          </div>
          <div className="buttons">
            <Link to="/">
              <button className="cancel">Cancel</button>
            </Link>
            <button className="submit" onClick={deleteAssignment}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

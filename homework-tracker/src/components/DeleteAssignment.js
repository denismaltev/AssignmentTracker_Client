import React from "react";
import Logo from "../assets/Logo.png";
import { Link, Redirect } from "react-router-dom";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function DeleteAssignment(props) {
  const assignment = props.location.state.assignment;

  const deleteAssignment = async (event) => {
    // DELETE request HERE
    alert("DELETE request");
    window.location.href = "/";
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

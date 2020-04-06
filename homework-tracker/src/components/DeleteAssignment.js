import React from "react";
import Logo from "../assets/Logo.png";
import { Link, Redirect } from "react-router-dom";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function DeleteAssignment(props) {
  const assignment = props.location.state.assignment;

  const deleteAssignment = async (event) => {
    alert("DELETE request");
    //<Redirect to="/" />;
    //<Redirect to="/edit" />;
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
        <form
          onSubmit={deleteAssignment}
          id="add-assignment-form"
          className="addAssignmentForm"
        >
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
            <button className="submit" variant="" type="submit">
              Delete
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import Logo from "../assets/Logo.png";
import { Link } from "react-router-dom";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import firebase from "./authentication/firebase";

export default function EditAssignment(props) {
  const assignment = props.location.state.assignment;
  const [errorMessage, setErrorMesage] = useState("");
  const [title, setTitle] = useState(assignment.title);
  const [description, setDescription] = useState(assignment.description);
  const [date, setDate] = useState(assignment.date.toISOString().slice(0, 10));

  const API_URL = process.env.REACT_APP_API_URL;

  const createAssignment = async event => {
    event.preventDefault();
    const { title, description, date } = event.target.elements;
    // Validation
    if (title.value === "" || date.value === "") {
      setErrorMesage("Error: Please fill all required fields");
    } else if (
      title.value === assignment.title &&
      description.value === assignment.description &&
      date.value === assignment.date.toISOString().slice(0, 10)
    ) {
      setErrorMesage("No changes detected");
    } else {
      setErrorMesage("");
      // Here should be PUT-request
      let JWTtoken = await (
        await firebase.auth().currentUser.getIdTokenResult()
      ).token;
      if(JWTtoken !== null) {
        const id = assignment.id
        const result = await fetch(API_URL + "assignments/" + id, {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${JWTtoken}`
          },
          body: JSON.stringify({
            title: title.value,
            description: description.value,
            date: date.value
          })
        });
        if(result.status === 200) {
          alert("Updated Assignment!");
          window.location.href = "/";
        } else {
          alert("Error: Something went wrong, please try again")
        }
      }

      //alert(`PUT-request: ${title.value} ${description.value} ${date.value}`);
    }
    document.getElementById("add-assignment-form").reset();
  };

  const clearForm = event => {
    event.preventDefault();
    setTitle(assignment.title);
    setDescription(assignment.description);
    setDate(assignment.date.toISOString().slice(0, 10));
    setErrorMesage("");
  };
  useEffect(() => {}, [errorMessage]);

  return (
    <div>
      <div className="header">
        <div className="brand">
          <Link to="/">
            <img alt="Logo" src={Logo} />
          </Link>
          <h1>Edit Assignment</h1>
        </div>
      </div>
      <div className="Card">
        <form onSubmit={createAssignment} id="add-assignment-form"
        className="addAssignmentForm">
          <p style={{ color: "red", fontSize: 12 }}>{errorMessage}</p>
          <input
            onChange={event => {
              setTitle(event.target.value);
            }}
            value={title}
            name="title"
            type="text"
            placeholder="Title"
          />
          <input
            onChange={event => {
              setDescription(event.target.value);
            }}
            value={description}
            name="description"
            type="text"
            placeholder="Description (optional)"
          />
          <div className="dueDate">
          <input
            onChange={event => {
              setDate(event.target.value);
            }}
            value={date}
            name="date"
            type="date"
            placeholder="Due Date"
          />
          <FontAwesomeIcon className="calendar" icon={faCalendar} />
          </div>
           <div className="buttons">
          <button className="cancel" onClick={clearForm}>Cancel</button>
          <button className="submit" variant="" type="submit">
            Save
          </button>
          </div>
        </form>
      </div>
    </div>
  );
}

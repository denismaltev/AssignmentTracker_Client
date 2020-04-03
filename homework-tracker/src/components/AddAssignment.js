import React from "react";
import Logo from "../assets/Logo.png";
import { Form, Button } from "react-bootstrap";

export default function AddAssignment() {
  const createAssignment = async event => {
    event.preventDefault();
    const { title, description, date } = event.target.elements;

    // Here should be POST-request
    alert(`POST-request: ${title.value} ${description.value} ${date.value}`);
    document.getElementById("add-assignment-form").reset();
  };

  const clearForm = event => {
    event.preventDefault();
    document.getElementById("add-assignment-form").reset();
  };

  return (
    <div>
      <div className="header">
        <div className="brand">
          <img src={Logo} />
          <h1>Add Assignment</h1>
        </div>
      </div>
      <div className="Card">
        <form onSubmit={createAssignment} id="add-assignment-form">
          <input name="title" type="text" placeholder="Title" />
          <input name="description" type="text" placeholder="Description" />
          <input name="date" type="date" placeholder="Due Date" />
          <button onClick={clearForm}>Cancel</button>
          <button variant="" type="submit">
            Add
          </button>
        </form>
      </div>
    </div>
  );
}

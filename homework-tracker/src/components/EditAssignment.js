import React, { useState, useEffect } from "react";
import Logo from "../assets/Logo.png";

export default function EditAssignment(props) {
  const assignment = props.location.state.assignment;
  const [errorMessage, setErrorMesage] = useState("");

  const createAssignment = async event => {
    event.preventDefault();
    const { title, description, date } = event.target.elements;
    // Validation
    if (title.value === "" || date.value === "") {
      setErrorMesage("Error: Please fill all required fields");
    } else {
      setErrorMesage("");
      // Here should be POST-request
      alert(`POST-request: ${title.value} ${description.value} ${date.value}`);
    }
    document.getElementById("add-assignment-form").reset();
  };

  const clearForm = event => {
    event.preventDefault();
    document.getElementById("add-assignment-form").reset();
  };
  useEffect(() => {}, [errorMessage]);
  return (
    <div>
      <div className="header">
        <div className="brand">
          <img src={Logo} />
          <h1>Edit Assignment</h1>
        </div>
      </div>
      <div className="Card">
        <form onSubmit={createAssignment} id="add-assignment-form">
          <p style={{ color: "red", fontSize: 12 }}>{errorMessage}</p>
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

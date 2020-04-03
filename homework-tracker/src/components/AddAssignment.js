import React, { useState, useEffect } from "react";
import Logo from "../assets/Logo.png";
import { Link } from "react-router-dom";

export default function AddAssignment() {
  const [errorMessage, setErrorMesage] = useState("");

  const createAssignment = async event => {
    event.preventDefault();
    const { title, description, date } = event.target.elements;

    // Validation
    if (title.value === "" || date.value === "") {
      setErrorMesage("Error: Please fill all required fields");
    } else {
      setErrorMesage("");
      alert(`POST-request: ${title.value} ${description.value} ${date.value}`);
    }
    // Here should be POST-request
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
          <Link to="/">
            <img src={Logo} />
          </Link>
          <h1>Add Assignment</h1>
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

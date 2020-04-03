import React, { useState, useEffect } from "react";

export default function EditAssignment(props) {
  const assignment = props.location.state.assignment;
  const [errorMessage, setErrorMesage] = useState("");
  const [title, setTitle] = useState(assignment.title);
  const [description, setDescription] = useState(assignment.description);
  const [date, setDate] = useState(assignment.date);

  const createAssignment = async event => {
    event.preventDefault();
    const { title, description, date } = event.target.elements;
    // Validation
    if (title.value === "" || date.value === "") {
      setErrorMesage("Error: Please fill all required fields");
    } else if (
      title.value === assignment.title &&
      description.value === assignment.description &&
      date.value === assignment.date
    ) {
      setErrorMesage("No changes detected");
    } else {
      setErrorMesage("");
      // Here should be PUT-request
      alert(`PUT-request: ${title.value} ${description.value} ${date.value}`);
    }
    document.getElementById("add-assignment-form").reset();
  };

  const clearForm = event => {
    event.preventDefault();
    setTitle(assignment.title);
    setDescription(assignment.description);
    setDate(assignment.date);
  };
  useEffect(() => {}, [errorMessage]);

  return (
    <div>
      <div className="header">
        <div className="brand">
          <h1>Edit Assignment</h1>
        </div>
      </div>
      <div className="Card">
        <form onSubmit={createAssignment} id="add-assignment-form">
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
            placeholder="Description"
          />
          <input
            onChange={event => {
              setDate(event.target.value);
            }}
            value={date}
            name="date"
            type="date"
            placeholder="Due Date"
          />
          <button onClick={clearForm}>Cancel</button>
          <button variant="" type="submit">
            Edit
          </button>
        </form>
      </div>
    </div>
  );
}

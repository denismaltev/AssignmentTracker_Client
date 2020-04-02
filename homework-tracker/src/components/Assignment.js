import React from "react";

export default function Assignment(props) {
  const deleteAssignment = async () => {
    // No logic yet
    alert("DELETE request to DB");
  };

  return (
    <div>
      <p onClick={deleteAssignment} style={{ color: "red" }}>
        [X]
      </p>
      {props.assignment.isDone ? (
        <strike>
          <h4>
            <p>{props.assignment.title}</p>
          </h4>
        </strike>
      ) : (
        <h4>
          <p>{props.assignment.title}</p>
        </h4>
      )}
      <p>{props.assignment.description}</p>
      <p>{props.assignment.data}</p>
      <p>=============================</p>
    </div>
  );
}

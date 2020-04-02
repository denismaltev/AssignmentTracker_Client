import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";

export default function Assignment(props) {
  const [refreshComponent, setRefreshComponent] = useState(false);
  const deleteAssignment = async () => {
    // No logic yet
    alert("DELETE request to DB");
  };
  const editAssignment = async () => {
    // No logic yet
    alert("PUT request to DB");
  };

  function isDoneChange() {
    if (props.assignment.isDone) {
      props.assignment.isDone = false;
    } else {
      props.assignment.isDone = true;
    }
    setRefreshComponent(true);
  }

  useEffect(() => {
    setRefreshComponent(false);
  }, [refreshComponent]);

  return (
    <div>
      <Button onClick={editAssignment} style={{ color: "green" }}>
        E
      </Button>
      <Button onClick={deleteAssignment} style={{ color: "red" }}>
        X
      </Button>
      {props.assignment.isDone ? (
        <strike>
          <h4>
            <div onClick={isDoneChange}>{props.assignment.title}</div>
          </h4>
        </strike>
      ) : (
        <div>
          <h4>
            <div onClick={isDoneChange}>{props.assignment.title}</div>
          </h4>
        </div>
      )}
      <p>{props.assignment.description}</p>
      <p>{props.assignment.data}</p>
      <p>=============================</p>
    </div>
  );
}

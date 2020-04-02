import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTimes } from '@fortawesome/free-solid-svg-icons'

export default function Assignment(props) {
  const [refreshComponent, setRefreshComponent] = useState(false);
  const [isShown, setIsShown] = useState(false)


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
    <div className="Card"
    onMouseEnter= {() => setIsShown(true)}
    onMouseLeave={()=> setIsShown(false)}
    >
    {isShown &&(
      <div className="CardFunctions">
              <FontAwesomeIcon icon={faPen}
              onClick={editAssignment}  />
              <FontAwesomeIcon icon={faTimes}
              onClick={deleteAssignment}  />
              </div>
        )}
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

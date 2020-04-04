import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTimes, faBell } from "@fortawesome/free-solid-svg-icons";
import { faCircle, faCheckCircle } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";

export default function Assignment(props) {
  const [refreshComponent, setRefreshComponent] = useState(false);
  const [isShown, setIsShown] = useState(false);
  const [notify, setNotify] = useState(false);
  const today = new Date();

  const deleteAssignment = async () => {
    // No logic yet
    alert("DELETE request to DB");
  };

  useEffect(() => {
    setRefreshComponent(false);
  }, [refreshComponent]);

  function isDoneChange() {
    if (props.assignment.isDone) {
      props.assignment.isDone = false;
    } else {
      props.assignment.isDone = true;
    }
    setRefreshComponent(true);
  }

  function isNotifyChange() {
    if (notify) {
      setNotify(false);
    } else {
      setNotify(true);
    }
  }

  function isAssignmentExpired() {
    return today.getTime() - props.assignment.date.getTime() > 0 &&
      !props.assignment.isDone
      ? true
      : false;
  }

  function daysLeft() {
    return Math.ceil((props.assignment.date - today) / 1000 / 60 / 60 / 24);
  }

  function assignmentStatus() {
    if (props.assignment.isDone) {
      return <div style={{ color: "green" }}>DONE</div>;
    } else if (isAssignmentExpired() && daysLeft() < 0) {
      return <div style={{ color: "red" }}>LATE!</div>;
    } else if (daysLeft() === 0) {
      return <div style={{ color: "green" }}>TODAY!</div>;
    } else {
      return <div style={{ color: "green" }}>{daysLeft()} days left</div>;
    }
  }

  return (
    <div
      className="Card"
      onMouseEnter={() => setIsShown(true)}
      onMouseLeave={() => setIsShown(false)}
    >
      <div className="CardHeading">
        {props.assignment.isDone ? (
          <div>
            <strike>
              <h4>
                <div onClick={isDoneChange}>{props.assignment.title}</div>
              </h4>
            </strike>
            <FontAwesomeIcon
              icon={faCheckCircle}
              className="checkboxDone"
              onClick={isDoneChange}
            />
          </div>
        ) : (
          <div>
            <h4>
              <div onClick={isDoneChange}>{props.assignment.title}</div>
            </h4>
            <FontAwesomeIcon
              icon={faCircle}
              className="checkbox"
              onClick={isDoneChange}
            />
          </div>
        )}
        {isShown && (
          <div className="CardFunctions">
            <Link
              to={{
                pathname: "/edit",
                state: { assignment: props.assignment }
              }}
            >
              <FontAwesomeIcon icon={faPen} className="edit" />
            </Link>
            <FontAwesomeIcon
              className="delete"
              icon={faTimes}
              onClick={deleteAssignment}
            />
          </div>
        )}
      </div>
      <p className="CardDescription">{props.assignment.description}</p>
      <div className="DueDate">
        <p className="CardDate">
          <span className="DueDateTitle">Due Date: </span>
          {props.assignment.date.toDateString().slice(4, 10)}
        </p>
        {notify ? (
          <FontAwesomeIcon
            className="notification notifyOn"
            icon={faBell}
            onClick={isNotifyChange}
          />
        ) : (
          <FontAwesomeIcon
            className="notification notifyOff"
            icon={faBell}
            onClick={isNotifyChange}
          />
        )}
      </div>
      {assignmentStatus()}
    </div>
  );
}

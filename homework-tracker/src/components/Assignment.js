import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTimes, faBell } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function Assignment(props) {
  const [refreshComponent, setRefreshComponent] = useState(false);
  const [isShown, setIsShown] = useState(false);
  const [notify, setNotify] = useState(false);

  const deleteAssignment = async () => {
    // No logic yet
    alert("DELETE request to DB");
  };

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

  useEffect(() => {
    setRefreshComponent(false);
  }, [refreshComponent]);

  return (
    <div
      className="Card"
      onMouseEnter={() => setIsShown(true)}
      onMouseLeave={() => setIsShown(false)}
    >
      <div className="CardHeading">
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
        {isShown && (
          <div className="CardFunctions">
            <Link
              to={{
                pathname: "/edit",
                state: { assignment: props.assignment }
              }}
            >
              <FontAwesomeIcon icon={faPen} />
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
          {props.assignment.date.toDateString().slice(4)}
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
    </div>
  );
}

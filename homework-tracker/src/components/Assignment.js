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

  function isNotifyDueDate() {
    if (notify) {
      var currentDay = props.assignment.date.getTme() - today.getTime();

      if(currentDay < 3) {
      alert(`${currentDay} days left until ${props.assignment.title} is due!`)
      }
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
      return <div className="complete">DONE</div>;
    } else if (isAssignmentExpired() && daysLeft() < 0) {
      return <div className="late">LATE!</div>;
    } else if (daysLeft() === 0) {
      return <div className="incomplete">TODAY!</div>;
    } else {
      return <div className="incomplete">{daysLeft()} days left</div>;
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
                state: { assignment: props.assignment },
              }}
            >
              <FontAwesomeIcon icon={faPen} className="edit" />
            </Link>
            <Link
              to={{
                pathname: "/delete",
                state: { assignment: props.assignment },
              }}
            >
              <FontAwesomeIcon className="delete" icon={faTimes} />
            </Link>
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

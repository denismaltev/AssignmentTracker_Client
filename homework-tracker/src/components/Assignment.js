import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTimes, faBell } from "@fortawesome/free-solid-svg-icons";
import { faCircle, faCheckCircle } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
import firebase from "./authentication/firebase";

export default function Assignment(props) {
  const [refreshComponent, setRefreshComponent] = useState(false);
  const [isShown, setIsShown] = useState(false);
  const [notification, setNotification] = useState("notification-incomplete");
  const today = new Date();

  useEffect(() => {
    setRefreshComponent(false);
  }, [refreshComponent]);

  function isDoneChange() {
    if (props.assignment.isDone) {
      props.assignment.isDone = false;
      setNotification("notification-incomplete");
      //postIsDone()
    } else {
      props.assignment.isDone = true;
      setNotification("notification-complete");
      //postIsDone()
    }
    setRefreshComponent(true);
  }

  const API_URL = process.env.REACT_APP_API_URL;

  // NEEDS WORK
  const postIsDone = async event => {
    //event.preventDefault();
    const { isDone } = event.target.elements;
    let JWTtoken = await (await firebase.auth().currentUser.getIdTokenResult())
      .token;
    if (JWTtoken !== null) {
      const id = props.assignment._id;
      console.log(id);
      const result = await fetch(API_URL + "assignments/" + id, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${JWTtoken}`
        },
        body: JSON.stringify({
          isDone: isDone.value
        })
      });
      if (result.status === 200) {
        alert("Updated Assignment!");
      } else {
        alert("Error: Something went wrong, please try again");
      }
    }
    document.getElementById("add-assignment-form").reset();
  };

  function isAssignmentExpired() {
    return today.getTime() - props.assignment.date.getTime() > 0 &&
      !props.assignment.isDone
      ? true
      : false;
  }

  // function NotificationStatus() {
  //   if(props.assignment.isDone) {
  //     setNotification("notification-complete")
  //   } else if(isAssignmentExpired && !props.assignment.isDone) {
  //     setNotification("notification-late")
  //   } else if(!props.assignment.isDone && daysLeft() === 0) {
  //     setNotification("notification-today")
  //   } else {
  //     setNotification("notification-incomplete")
  //   }
  //   setRefreshComponent(true)
  // }

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
                state: { assignment: props.assignment }
              }}
            >
              <FontAwesomeIcon icon={faPen} className="edit" />
            </Link>
            <Link
              to={{
                pathname: "/delete",
                state: { assignment: props.assignment }
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
        <FontAwesomeIcon className={notification} icon={faBell} />
      </div>
      {assignmentStatus()}
    </div>
  );
}

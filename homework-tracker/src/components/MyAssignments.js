import React, { useState, useEffect } from "react";
import Assignment from "./Assignment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Logo from "../assets/Logo.png";
import firebase from "./authentication/firebase";

export default function MyAssignments() {
  const [active, setActive] = useState(true);
  const [completed, setCompleted] = useState(true);
  const [assignments, setAssignments] = useState([]);
  const API_URL = process.env.REACT_APP_API_URL;

  const getMyAssignmentsFromServer = async () => {
    // Here fetch request GET
    let JWTtoken = await (await firebase.auth().currentUser.getIdTokenResult())
      .token;
    console.log(JWTtoken); // Do not forget to DELETE
    if (JWTtoken !== null) {
      const response = await fetch(API_URL + "assignments", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${JWTtoken}`
        }
      });
      const result = await response.json();

      // Date converter
      result.forEach(el => {
        el.date = new Date(el.date.slice(0, 10));
      });

      // sort assignments by date
      result.sort((a, b) => {
        return a.date.getTime() - b.date.getTime();
      });
      setAssignments(result);
    }
  };

  useEffect(() => {
    getMyAssignmentsFromServer();
  }, []);

  function showAllAssignments() {
    setCompleted(true);
    setActive(true);
  }

  function showOnlyActiveAssignments() {
    setCompleted(false);
    setActive(true);
  }

  function showOnlyCompletedAssignments() {
    setCompleted(true);
    setActive(false);
  }

  return (
    <div>
      <div className="header">
        <div className="brand">
          <img alt="Logo" src={Logo} />
          <h1>My Assignments</h1>
        </div>
        <div className="sortLinks">
          <p className="headerLink" onClick={showAllAssignments}>
            All
          </p>
          <p className="headerLink" onClick={showOnlyActiveAssignments}>
            Active
          </p>
          <p className="headerLink" onClick={showOnlyCompletedAssignments}>
            Completed
          </p>
        </div>
      </div>
      <div className="wrapper">
        <Link to="/add">
          <FontAwesomeIcon
            className="addIcon fill-gradient-linear"
            icon={faPlusCircle}
          />
        </Link>
        {assignments.map(assignment =>
          (completed && assignment.isDone) || (active && !assignment.isDone) ? (
            <Assignment key={assignment.title} assignment={assignment} />
          ) : (
            <p key={assignment._id}></p>
          )
        )}
      </div>
      <svg>
        <linearGradient id="linear">
          <stop className="linear-stop1" offset="0%"></stop>
          <stop className="linear-stop2" offset="50%"></stop>
          <stop className="linear-stop3" offset="100%"></stop>
        </linearGradient>
      </svg>
    </div>
  );
}

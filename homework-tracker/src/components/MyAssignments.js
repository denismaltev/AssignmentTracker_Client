import React, { useState, useEffect } from "react";
import Assignment from "./Assignment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Logo from "../assets/Logo.png";
import firebase from "./authentication/firebase";

// fake data must be replaced with data from DB
// const fakeDataArray = [
//   {
//     title: "Final Assignment - SSD",
//     description: "Group Project Web APP",
//     date: new Date(2020, 2, 20),
//     isDone: false
//   },
//   {
//     title: "FullStack JS",
//     description: " bla bla bla",
//     date: new Date(2020, 3, 6),
//     isDone: false
//   },
//   {
//     title: "Passion Project",
//     description: "bla bla bla2",
//     date: new Date(2020, 4, 22),
//     isDone: true
//   },
//   {
//     title: "bla bla Project",
//     description: "bla bla bla3",
//     date: new Date(2020, 5, 1),
//     isDone: true
//   }
// ];

export default function MyAssignments() {
  const [active, setActive] = useState(true);
  const [completed, setCompleted] = useState(true);
  const [assignments, setAssignments] = useState([]);
  const API_URL = process.env.REACT_APP_API_URL;

  const getMyAssignmentsFromServer = async () => {
    // Here fetch request GET
    //var result = fakeDataArray;
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
      const server_result = await response.json();

      //console.log(server_result);

      // Converter
      var result = [];
      server_result.forEach(el => {
        result.push({
          title: el.Name,
          description: el.Description,
          date: new Date(el.DueDate.slice(0, 10)),
          isDone: el.isDone
        });
      });
      console.log(result);
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
            <p key={assignment.title}></p>
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

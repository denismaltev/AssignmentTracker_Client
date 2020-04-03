import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Assignment from "./Assignment";
import  Logo  from '../assets/Logo.png'

// fake data must be replaced with data from DB
const fakeDataArray = [
  {
    title: "Final Assignment - SSD",
    description: "Group Project Web APP",
    data: "April 8 2020",
    isDone: false
  },
  {
    title: "FullStack JS",
    description: " bla bla bla",
    data: "April 10 2020",
    isDone: false
  },
  {
    title: "Passion Project",
    description: "bla bla bla2",
    data: "March 30 2020",
    isDone: true
  },
  {
    title: "bla bla Project",
    description: "bla bla bla3",
    data: "March 12 2020",
    isDone: true
  }
];

export default function MyAssignments() {
  const [active, setActive] = useState(true);
  const [completed, setCompleted] = useState(true);

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
      <img src= {Logo} />
      <h1>My Assignments</h1>
      </div>
      <div className="sortLinks">
      <p className="headerLink" onClick={showAllAssignments}>All</p>
      <p className="headerLink" onClick={showOnlyActiveAssignments}>Active</p>
      <p className="headerLink" onClick={showOnlyCompletedAssignments}>Completed</p>
      </div>
      </div>
      <div className="wrapper">
      {fakeDataArray.map(assignment =>
        (completed && assignment.isDone) || (active && !assignment.isDone) ? (
          <Assignment key={assignment.title} assignment={assignment} />
        ) : (
          <p key={assignment.title}></p>
        )
      )}
      </div>
    </div>
  );
}

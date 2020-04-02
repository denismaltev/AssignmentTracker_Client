import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Assignment from "./Assignment";
import  Logo  from '../assets/Logo.png'

// fake data must be replaced with data from DB
const fakeDataArray = [
  {
    title: "Final Assignment - SSD",
    description: "Group Project Web APP",
    data: "01-07-2019",
    isDone: false
  },
  {
    title: "FullStack JS",
    description: " bla bla bla",
    data: "01-03-2019",
    isDone: false
  },
  {
    title: "Passion Project",
    description: "bla bla bla2",
    data: "01-08-2019",
    isDone: true
  },
  {
    title: "bla bla Project",
    description: "bla bla bla3",
    data: "01-05-2019",
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
      <img src= {Logo} />
      <h1>My Assignments</h1>
      <div className="sortButtons">
      <Button className="headerButton" onClick={showAllAssignments}>All</Button>
      <Button className="headerButton" onClick={showOnlyActiveAssignments}>Active</Button>
      <Button className="headerButton" onClick={showOnlyCompletedAssignments}>Completed</Button>
      </div>
      </div>
      {fakeDataArray.map(assignment =>
        (completed && assignment.isDone) || (active && !assignment.isDone) ? (
          <Assignment key={assignment.title} assignment={assignment} />
        ) : (
          <p key={assignment.title}></p>
        )
      )}
    </div>
  );
}

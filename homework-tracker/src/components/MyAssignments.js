import React from "react";
import {} from "react-bootstrap";
import Assignment from "./Assignment";

// fake data must be replaced by data from DB
const fakeDataArray = [
  {
    title: "Final Assignment - SSD",
    description: "Group Project Web APP",
    data: "01-01-2019",
    isDone: false
  },
  {
    title: "FullStack JS",
    description: " bla bla bla",
    data: "01-07-2019",
    isDone: false
  },
  {
    title: "Passion Project",
    description: "bla bla bla2",
    data: "01-02-2019",
    isDone: true
  }
];

export default function MyAssignments() {
  return (
    <div>
      <h1>My Assignments</h1>
      {fakeDataArray.map(assignment => (
        <Assignment key={assignment.title} assignment={assignment} />
      ))}
    </div>
  );
}

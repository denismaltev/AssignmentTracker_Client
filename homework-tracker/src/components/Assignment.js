import React from "react";

export default function Assignment(props) {
  console.log(props.assignment.title);
  return (
    <div>
      <p>{props.assignment.title}</p>
      <p>{props.assignment.description}</p>
      <p>{props.assignment.data}</p>
      <p>=============================</p>
    </div>
  );
}

import React from 'react';
import Logo from '../../assets/Logo.png'

const Message = ({title, message}) => {
  return ( 
    <div className="Message__container">
      <img src={Logo} alt="Homework Helper Logo"/>
      <div className="Message__text-wrapper">
        <h1>{title}</h1>
        <p>{message}</p>
      </div>
    </div>
   );
}
 
export default Message;
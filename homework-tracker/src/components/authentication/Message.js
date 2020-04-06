import React from 'react';
import Logo from '../../assets/Logo.png'

const Message = ({ title, message, buttonText, buttonOnClick }) => {
  return (
    <div className="auth__container Message">
      <img className="auth__logo" src={Logo} alt="Homework Helper Logo" />
      <div className="auth__form-wrapper">
        <h1>{title}</h1>
        <p className="auth__message auth__message--lone">{message}</p>
        {
          buttonText ? (
            <button onClick={buttonOnClick}>{buttonText}</button>
          ) : null
        }
      </div>
    </div>
  );
}

export default Message;
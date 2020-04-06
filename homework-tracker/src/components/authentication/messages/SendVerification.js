import React from 'react';
import Message from '../Message';
import app from '../firebase';

const SendVerification = () => {
  const title = "Thanks for registering!"
  const message = "A verification link has been sent to the email address you used to register. Please verify your email before continuing."

  try {
    app.auth().currentUser.sendEmailVerification()
  } catch (error) {
    console.log(error.code)
  }

  return (
    <div>
      <Message title={title} message={message} />
    </div>
  );
}

export default SendVerification;
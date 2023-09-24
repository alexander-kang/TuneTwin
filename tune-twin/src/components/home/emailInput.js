import React, { useContext, useState } from 'react';
import { EmailContext } from './emailContext';

function EmailInput() {
  const { email, updateEmail } = useContext(EmailContext);
  const [submittedEmail, setSubmittedEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleEmailChange = (e) => {
    updateEmail(e.target.value);
  };

  const handleSubmit = () => {
    // Save the email as submittedEmail
    setSubmittedEmail(email);
    // Clear the email input
    updateEmail('');
    // Mark the email as submitted
    setIsSubmitted(true);
    sessionStorage.setItem('email',  email);

    // Redirect the user to Google
    window.location.href = `http://127.0.0.1:8080/?email=${email}`;
  };

  const inputStyles = {
    width: '100%',
    padding: '10px',
    marginTop: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    fontSize: '16px',
  };

  const buttonStyles = {
    display: 'inline-block',
    marginTop: '10px',
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
  };

  const submittedStyles = {
    marginTop: '20px',
    fontSize: '16px',
    color: '#333',
    fontWeight: 'bold',
  };

  return (
    <div>
      <h2 style={{ fontSize: '24px', marginBottom: '10px', color: '#333' }}>
        Enter Your Email
      </h2>
      <p style={{ fontSize: '16px', color: '#555' }}>
        We'll redirect you to Google after submission.
      </p>
      <input
        type="email"
        placeholder="Your email address"
        value={email}
        onChange={handleEmailChange}
        style={inputStyles}
      />
      <button className="submit-button" onClick={handleSubmit} style={buttonStyles}>
        Submit
      </button>
      {isSubmitted && (
        <p style={submittedStyles}>Submitted Email: {submittedEmail}</p>
      )}
    </div>
  );
}

export default EmailInput;

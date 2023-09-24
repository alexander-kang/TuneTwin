import React, { useContext, useState } from 'react';
import { EmailContext } from './emailContext';
import NavBarSignedInNoToggle from '../navBar/navBarSignedInNoToggle';
import Footer from '../footer/footer';
import './email.css'

function EmailInput() {
  const { email, updateEmail,  updateIsSignedIn } = useContext(EmailContext);
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
    updateIsSignedIn();
    // Mark the email as submitted
    setIsSubmitted(true);
    sessionStorage.setItem('email', email);

    // Redirect the user to next page
    window.location.href = `http://127.0.0.1:8080/?email=${email}`;
  }

  return (
    <div>
      <NavBarSignedInNoToggle/>

      <div className="email-content">
        <h2>
          Enter Your Email
        </h2>
        <p className="email-caption">
          We'll redirect you to the Spotify login after submission.
        </p>
        <form onSubmit={(e) => {e.preventDefault()}}>
          <input className="email-input" type="email" placeholder="Your email address" value={email} onChange={handleEmailChange}/>
          <input className="submit-button" type="submit" value="Submit" onClick={handleSubmit}/>
        </form>
        {isSubmitted && (
          <p className="submitted">
            Submitted Email: {submittedEmail}
          </p>
        )}
      </div>

      <Footer/>
    </div>
  )
}

export default EmailInput

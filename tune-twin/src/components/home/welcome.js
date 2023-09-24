import React, { useContext } from 'react';
import { EmailContext } from './emailContext';
import LandingPageSignedIn from './homeSignedIn';
import LandingPageNotSignedIn from './homeNotSignedIn';

function Welcome() {
  const { isSignedIn } = useContext(EmailContext); // Access isSignedIn from context

  return (
    <div>
      {isSignedIn ? (
         <LandingPageSignedIn/>
      ) : (
        <LandingPageNotSignedIn/>
      )}
    </div>
  );
}

export default Welcome;

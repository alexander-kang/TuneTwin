import React, { createContext, useState } from 'react';

const EmailContext = createContext();

function MyProvider({ children }) {
  const [email, setEmail] = useState('');
  const [isSignedIn, setIsSignedIn] = useState(false);

  const updateEmail = (newEmail) => {
    setEmail(newEmail);
  };

  const updateIsSignedIn = () => {
    setIsSignedIn(true);
  };

  return (
    <EmailContext.Provider value={{ email, updateEmail, isSignedIn, updateIsSignedIn }}>
      {children}
    </EmailContext.Provider>
  );
}

export { EmailContext, MyProvider };

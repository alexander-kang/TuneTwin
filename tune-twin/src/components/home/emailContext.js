import React, { createContext, useState } from 'react';

const EmailContext = createContext();

function MyProvider({ children }) {
  const [email, setEmail] = useState('');

  const updateEmail = (newEmail) => {
    setEmail(newEmail);
  };

  return (
    <EmailContext.Provider value={{ email, updateEmail }}>
      {children}
    </EmailContext.Provider>
  );
}

export { EmailContext, MyProvider };

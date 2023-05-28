import React, { createContext, useState } from 'react';

export const UserIdContext = createContext(null);

export const UserIdProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [userData, setUserData] = useState(null);

  return (
    <UserIdContext.Provider value={{ userId, setUserId, userData, setUserData }}>
      {children}
    </UserIdContext.Provider>
  );
};

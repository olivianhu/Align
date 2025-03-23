import {useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { UserContext } from './UserContext';

export function UserContextProvider( {children} ) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");
  const [isLogged, setIsLogged] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (name) {
      setReady(true);
    }
  }, [name])
  UserContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };

  return(
    <UserContext.Provider value={{email, setEmail, name, setName, isLogged, setIsLogged, ready, setReady, userId, setUserId}}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
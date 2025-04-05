import {useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { UserContext } from './UserContext';
import supabase from "./helper/supabaseClient";

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

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      console.log("session", session);
      if (session) {
        setUserId(session.user.id);
        setEmail(session.user.email);
        setIsLogged(true);
        
        const { data } = await supabase
          .from("profiles")
          .select("name")
          .eq("id", session.user.id)
          .single();
        // console.log("user", data);
        setName(data.name);
      }
    };

    getSession();

    // Listen for auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUserId(session?.user.id ?? null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return(
    <UserContext.Provider value={{email, setEmail, name, setName, isLogged, setIsLogged, ready, setReady, userId, setUserId}}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
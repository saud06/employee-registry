import axios from 'axios';
import React, { useContext, useEffect, useState } from "react";

const AuthContext = React.createContext();

// Custom hook which will be called by all other components to get / consume context and get AuthContext data
export function useAuth(){
  // All other components will get AuthContext data from the context
  return useContext(AuthContext);
}

// AuthProvider function is not the AuthContext (or context provider) itself. Rather, It will wrap the whole application
export function AuthProvider({children}){
  // Set loader because the server requires some time to fetch the data from Firebase
  const [loader, setLoader] = useState(true);
  // Set current logged in user data 
  const [currentUser, setCurrentUser] = useState({});

  // Update currentUser data and loader after getitng the data from server
  useEffect(() => {
    async function fetchUser(){
      await axios.get('employees/login').then(response => {
        setCurrentUser({'cookie': response.data.cookies, 'data': response.data.loggedInEmployeeData});
        setLoader(false);
      });
    }

    fetchUser();
  }, []);

  // Signup function
  async function signup(employee){
    await axios.post('employees/signup', employee);
  }

  // Login function
  async function login(employee){
    await axios.post('employees/login', employee);
  }

  // Logout function
  async function logout(){
    await axios.delete('employees/logout').then(response => {
      window.location.href = '/';
    });
  }

  // Create value obj to set into the Provider
  const value = {
    currentUser,
    signup,
    login,
    logout,
  }

  return(
    <AuthContext.Provider value={value}>
      {/* Show children data once loading is done */}
      {!loader && children}
    </AuthContext.Provider>
  );
}
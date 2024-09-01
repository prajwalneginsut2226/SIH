import React, { createContext, useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

export const Context = createContext({ isUserAuthenticated: false });

const AppWrapper = () => {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const [user, setUser] = useState({});


  return (
    <Context.Provider
      value={{ isUserAuthenticated, setIsUserAuthenticated, user, setUser }}
    ><App />
    </Context.Provider>

  );
};
 
ReactDOM.createRoot(document.getElementById('root')).render(
  
    <AppWrapper />
  
)
      
import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { auth } from "../firebase";
import PropTypes from "prop-types";

export const AppContext = createContext({});

export const AppProvider = ({ children }) => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      toast.dismiss();
      if (user) {
        setUserData(user);
      } else {
        setUserData({});
      }
    });
  }, []);

  return (
    <AppContext.Provider value={{ userData }}>{children}</AppContext.Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

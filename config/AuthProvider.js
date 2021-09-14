import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = React.createContext({
  user: "",
  appData: {},
  login: () => null,
  auto_login: () => null,
  logout: () => null,
});
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const [appData, setAppData] = useState({});
  return (
    <AuthContext.Provider value={{
      user,
      appData,
      login: (usr, nav) => {
        const user = JSON.stringify(usr);
        AsyncStorage.setItem("USER_ID", user).then(() => {
          setUser(usr.user);
          nav.navigate("EventListing");
        });
      },

      auto_login: (usr, nav) => {
        setUser(usr);
        nav.replace("EventListing");
      },

      sule: (param) => {
        Object.keys(param).forEach(key => {
          appData[key] = param[key];
        });
        setAppData(appData);
      },

      logout: (nav) => {
        setUser("");
        setAppData([]);
        AsyncStorage.setItem("USER_ID", "").then(() => {
          nav.navigate("Login");
        });
      },
    }}>{children}</AuthContext.Provider>
  );
};
export default AuthProvider;

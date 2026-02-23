import { createContext, useContext } from "react";

const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  // const { data, error, isLoading } = useQuery(["user"], getProfile);

  return <UserContext.Provider value={{}}>{children}</UserContext.Provider>;
};

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { User, UserInfo } from "../model/userTypes";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  currentUser: UserInfo | null;
  setCurrentUser: (user: UserInfo | null) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

interface AuthProviderProps {
  children: ReactNode;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: AuthProviderProps) {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<UserInfo | null>(null);
  const [loading,setLoading] = useState(false)

  useEffect(() => {
    const storedUser = localStorage.getItem("userInfo");
    if (storedUser) {
      const user = JSON.parse(storedUser) as UserInfo;
      console.log(user);
      setCurrentUser(user);
      // navigate("/");
    }
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser,loading,setLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to get the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthProvider;

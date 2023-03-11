import {
  useContext,
  createContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  User,
} from 'firebase/auth';
import { auth } from '../firebase';

interface UserContexT {
  googleSignIn: () => void;
  logOut: () => void;
  user: User | null
  isLoading: boolean;
}

const AuthContext = createContext<UserContexT>(null!);

interface Props {
  children?: ReactNode
}

export const AuthContextProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider);
  };

  const logOut = () => {
    setUser(null);
    signOut(auth);
  };

  useEffect(() => {
    setIsLoading(true);
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setIsLoading(false);
      }

      if (!currentUser) {
        setIsLoading(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{
      googleSignIn,
      logOut,
      user,
      isLoading,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};

import SignUp from "./routes/SignUp";
import Login from "./routes/Login";
import Reset from "./routes/ResetPassword";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Container from "./components/Container";
import { AuthContext } from "./contexts/AuthContext";
import { useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "./firebase";
import User from "./routes/User";
import Dashboard from "./routes/Dashboard";
import PrivateRoute from "./routes/PrivateRoute";

const App = () => {
  const [currentUser, setCurrentUser] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const signUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  const logout = () => {
    return signOut(auth);
  };

  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setIsLoading(false);
    });
    return unsubscribe;
  }, []);

  const style = {
    maxWidth: "400px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };
  return (
    <AuthContext.Provider
      value={{ signUp, currentUser, login, logout, resetPassword }}
    >
      {!isLoading ? (
        <Router>
          <Routes>
            <Route exact path="/" element={<PrivateRoute><User/></PrivateRoute>} />
            <Route exact path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route
              path="/dashboard/folders/:folderId"
              element={<PrivateRoute><Dashboard /></PrivateRoute>}
            />
            <Route path="/auth" element={<Container />}>
              <Route path="signup" element={<SignUp style={style} />} />
              <Route path="login" element={<Login style={style} />} />
              <Route path="resetPassword" element={<Reset style={style} />} />
            </Route>
          </Routes>
        </Router>
      ) : null}
    </AuthContext.Provider>
  );
};
export default App;

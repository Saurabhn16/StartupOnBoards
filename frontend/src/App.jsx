import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/Home";
import MessageI from "./pages/home/Message";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import Blogs from "./pages/blogs/Blogs";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";
import ProfileUpdate from "./pages/profile/ProfileUpdate";
import Navbar from "./components/navbar/navbar";
import UserBlogs from "./pages/userBLogs/userBlog";
import SearchUpdate from "./pages/search/search";
import UserProfile from "./pages/userProfile/userProfile";
import Event from "./pages/Event/Event";
import Quiz from "./pages/Quiz/Quiz";

function App() {
  const { authUser } = useAuthContext();

  return (
    <div className=" container">
      <Navbar />

      <div className="main-content flex">
        <Routes>
        <Route
            path="/"
            element={ <Home />}
          />
         
              <Route
            path="/quiz"
            element={ <Quiz/>}
          />
          <Route
            path="/blogs"
            element={authUser ? <Blogs /> : <Navigate to="/login" />}
          />
          <Route
            path="/profile"
            element={authUser ? <ProfileUpdate /> : <Navigate to="/login" />}
          />
          <Route
            path="/userBlogs"
            element={authUser ? <UserBlogs /> : <Navigate to="/login" />}
          />
          <Route
            path="/search"
            element={authUser ? <SearchUpdate /> : <Navigate to="/login" />}
          />
          <Route
            path="/profile/:id"
            element={authUser ? <UserProfile /> : <Navigate to="/login" />}
          />
          <Route
            path="/messages"
            element={authUser ? <MessageI /> : <Navigate to="/login" />}
          />
   <Route
            path="/events"
            element={authUser ? <Event /> : <Navigate to="/login" />}
          />

          <Route
            path="/login"
            element={authUser ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/signup"
            element={authUser ? <Navigate to="/" /> : <SignUp />}
          />

        </Routes>
        <Toaster />
      </div>
    </div>
  );
}

export default App;

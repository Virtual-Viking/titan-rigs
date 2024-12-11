import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login"; // Adjust the path based on your folder structure
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        {/* Define the route for the login page */}
        <Route path="/" element={<Login />} />
        {/* Add more routes as needed for your application */}
      </Routes>
    </Router>
  );
}

export default App;

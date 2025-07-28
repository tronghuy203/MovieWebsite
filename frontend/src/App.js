import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import UserRoutes from "./Routes/UserRoutes";
import AdminRoutes from "./Routes/AdminRoutes";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<UserRoutes />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
      </Routes>
    </Router>
  );
};

export default App;

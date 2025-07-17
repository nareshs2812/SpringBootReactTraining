import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Header from "./components/Header";
import SearchEmployee from "./components/SearchEmployee";

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Register />} />
         <Route path="/login" element={<Login />} />
        <Route path="/search" element={<SearchEmployee />} />
          <Route path="/get-employees" element={<GetEmployees />} />
          <Route path="/add-employees" element={<AddEmployees />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

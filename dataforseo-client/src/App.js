import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import CreateTask from "./components/CreateTask";
import GetTask from "./components/GetTask";
import TaskResults from "./components/TaskResults";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<TaskResults />} />
          <Route path="/create-task" element={<CreateTask />} />
          <Route path="/get-task" element={<GetTask />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

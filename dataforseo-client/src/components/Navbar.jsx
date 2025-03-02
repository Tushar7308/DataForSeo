import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaTasks, FaPlusCircle, FaClipboardList, FaBars, FaTimes } from "react-icons/fa";
import "../styles/Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="logo" onClick={() => navigate("/")}>
        Task Manager
      </div>

      <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes size={25} color="white" /> : <FaBars size={25} color="white" />}
      </div>

      <ul className={menuOpen ? "active" : ""}>
        <li>
          <Link to="/" onClick={() => setMenuOpen(false)}>
            <FaClipboardList /> Dashboard
          </Link>
        </li>
        <li>
          <Link to="/create-task" onClick={() => setMenuOpen(false)}>
            <FaPlusCircle /> Create Task
          </Link>
        </li>
        <li>
          <Link to="/get-task" onClick={() => setMenuOpen(false)}>
            <FaTasks /> Get Task
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

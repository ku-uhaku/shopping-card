import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useContext } from "react";
import Shopping from "../context/Shopping";

const Nav = () => {
  const { card } = useContext(Shopping);
  return (
    <header className="bg-danger ">
      <nav className=" d-flex justify-content-around align-items-center ">
        <h1>kuuhaku</h1>
        <ul className="d-flex justify-content-between align-items-center list-unstyled">
          <li className="mx-3">
            <Link to="/" className="text-decoration-none text-light">
              Home
            </Link>
          </li>
          <li>
            <Link to="/card" className="text-decoration-none text-light">
              <AiOutlineShoppingCart /> ({card.length})
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Nav;

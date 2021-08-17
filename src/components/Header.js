import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Route } from "react-router-dom";
import { logout } from "../actions/userActions";
import styles from "../styles/header.module.css";
import SearchBox from "./SearchBox";

const Header = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => dispatch(logout());

  return (
    <header className={styles.header}>
      <div id="navbar" className="navbar">
        <h1 className="logo">
          <span className="text-primary">
            <i className="fas fa-shopping-cart"></i>MI-
          </span>
          SHOP
        </h1>
        <nav>
          <ul>
            <li>
              <Link to="/cart" className="navbar-logo">
                Cart
              </Link>
            </li>
          </ul>
        </nav>
        <Route render={({ history }) => <SearchBox history={history} />} />

        {userInfo ? (
          <div className={styles.dropdown}>
            <span>{userInfo.name}</span>
            <div class="dropdown-content">
              <Link to="/profile" className="navbar-logo">
                PROFILE
              </Link>
              <button onClick={logoutHandler}>Logout</button>
            </div>
          </div>
        ) : (
          <Link to="/login" className="navbar-logo">
            SIGN IN
          </Link>
        )}

        {userInfo && !userInfo.isAdmin && (
          <div class="dropdown">
            <span>ADMIN</span>
            <div class="dropdown-content">
              <Link to="/admin/userlist" className="navbar-logo">
                USERS
              </Link>
              <Link to="/admin/productlist" className="navbar-logo">
                PRODUCTS
              </Link>
              <Link to="/admin/orderlist" className="navbar-logo">
                ORDERS
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

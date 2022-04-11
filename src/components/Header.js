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

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header className={styles.hero}>
      <div className={styles.navbar}>
        <Link className={styles.link} to="/">
          <h1
            style={{
              margin: 0,
            }}
          >
            Shop
            <i className="fas fa-shopping-cart"></i>
            Easy
          </h1>
        </Link>

        <ul>
          <li>
            <Link className={styles.link} to="/cart">
              Cart
            </Link>
          </li>
          {!userInfo && (
            <li>
              <Link className={styles.link} to="/profile">
                Profile
              </Link>
            </li>
          )}
          {!userInfo && (
            <li>
              <Link className={styles.link} to="/login">
                Login
              </Link>
            </li>
          )}
          {!userInfo && (
            <li>
              <button className={styles.button} onClick={logoutHandler}>
                Logout
              </button>
            </li>
          )}
          {userInfo && userInfo.isAdmin && (
            <li>
              <Link className={styles.link} to="/admin/userlist">
                USERS
              </Link>
            </li>
          )}
          {userInfo && userInfo.isAdmin && (
            <li>
              <Link className={styles.link} to="/admin/productlist">
                PRODUCTS
              </Link>
            </li>
          )}
          {userInfo && userInfo.isAdmin && (
            <li>
              <Link className={styles.link} to="/admin/orderlist">
                ORDERS
              </Link>
            </li>
          )}
          {/* <Route render={({ history }) => <SearchBox history={history} />} /> */}
        </ul>
      </div>
    </header>
  );
};

export default Header;

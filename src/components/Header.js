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
    <header>
      <nav id="navbar" className={styles.navbar}>
        <div className={styles.container}>
          <h1 className={styles.logo}>
            <span className={styles.textPrimary}>
              <i className="fas fa-shopping-cart"></i>
            </span>
            <Link to="/" className={styles.a}>
              OnPick
            </Link>
          </h1>

          <ul className={styles.ul}>
            <li className={styles.li}>
              <div
                style={{
                  paddingRight: 5,
                  paddingTop: 20,
                }}
              >
                <Route
                  render={({ history }) => <SearchBox history={history} />}
                />
              </div>
            </li>
            <li className={styles.li}>
              <Link to="/cart" className={styles.suba}>
                Cart
              </Link>
            </li>
            {userInfo && (
              <li className={styles.li}>
                <Link to="/profile" className={styles.suba}>
                  PROFILE
                </Link>
              </li>
            )}
            {userInfo && (
              <li className={styles.li}>
                <button onClick={logoutHandler} className={styles.suba}>
                  Logout
                </button>
              </li>
            )}
            {!userInfo && (
              <li className={styles.li}>
                <Link to="/login" className={styles.suba}>
                  LOGIN
                </Link>
              </li>
            )}
            {userInfo && userInfo.isAdmin && (
              <li className={styles.li}>
                <Link to="/admin/userlist" className={styles.suba}>
                  USERS
                </Link>
              </li>
            )}
            {userInfo && userInfo.isAdmin && (
              <li className={styles.li}>
                <Link to="/admin/productlist" className={styles.suba}>
                  PRODUCTS
                </Link>
              </li>
            )}
            {userInfo && userInfo.isAdmin && (
              <li className={styles.li}>
                <Link to="/admin/orderlist" className={styles.suba}>
                  ORDERS
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;

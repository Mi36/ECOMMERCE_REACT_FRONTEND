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
        <Link to="/">
          <h1 className={styles.logo}>
            <span className={styles.textPrimary}>
              <i className="fas fa-shopping-cart"></i>
              Shop
            </span>
            Easy
          </h1>
        </Link>
        <nav>
          <ul>
            <li>
              <Link to="/cart">Cart</Link>
            </li>
            {!userInfo && (
              <li>
                <Link to="/profile">Profile</Link>
              </li>
            )}
            {!userInfo && (
              <li>
                <Link to="/login">Login</Link>
              </li>
            )}
            {!userInfo && (
              <li>
                <Link onClick={logoutHandler}>Logout</Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
    // <header>
    //   <nav id="navbar" className={styles.navbar}>
    //     <div className={styles.container}>
    //       <h1 className={styles.logo}>
    //         <span className={styles.textPrimary}>
    //           <i className="fas fa-shopping-cart"></i>
    //         </span>
    //         <Link to="/" className={styles.a}>
    //           OnPick
    //         </Link>
    //       </h1>

    //       <ul className={styles.ul}>
    //         <li className={styles.li}>
    //           <div
    //             style={{
    //               paddingRight: 5,
    //               paddingTop: 20,
    //             }}
    //           >
    //             <Route
    //               render={({ history }) => <SearchBox history={history} />}
    //             />
    //           </div>
    //         </li>
    //         </li>
    //         {userInfo && userInfo.isAdmin && (
    //           <li className={styles.li}>
    //             <Link to="/admin/userlist" className={styles.suba}>
    //               USERS
    //             </Link>
    //           </li>
    //         )}
    //         {userInfo && userInfo.isAdmin && (
    //           <li className={styles.li}>
    //             <Link to="/admin/productlist" className={styles.suba}>
    //               PRODUCTS
    //             </Link>
    //           </li>
    //         )}
    //         {userInfo && userInfo.isAdmin && (
    //           <li className={styles.li}>
    //             <Link to="/admin/orderlist" className={styles.suba}>
    //               ORDERS
    //             </Link>
    //           </li>
    //         )}
    //       </ul>
    //     </div>
    //   </nav>
    // </header>
  );
};

export default Header;

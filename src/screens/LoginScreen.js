import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { login } from "../actions/userActions";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import Message from "../components/Message";
import styles from "../styles/loginScreen.module.css";

const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);

  const { loading, error, userInfo } = userLogin;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  //redirect if there is already userInfo
  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    // check why using prevent default
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <section className={styles.py3}>
      <div className={styles.container}>
        <h1 className={styles.lheading}>
          <span className={styles.textPrimary}>Sign</span> In
        </h1>
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}
        <form onSubmit={submitHandler}>
          <label>Email</label>
          <div className={styles.formGroup}>
            <input
              type="email"
              size="50"
              name="name"
              value={email}
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <label>Password</label>
          <div className={styles.formGroup}>
            <input
              type="password"
              size="50"
              name="name"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className={styles.submitContainer}>
            <button type="submit" className={styles.btn}>
              Submit
            </button>

            <div className={styles.accountAlready}>
              New Customer?{" "}
              <Link
                to={redirect ? `/register?redirect=${redirect}` : "/register"}
              >
                Register
              </Link>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default LoginScreen;

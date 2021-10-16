import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { register } from "../actions/userActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import styles from "../styles/registerScreen.module.css";

const RegisterScreen = ({ location, history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(register(name, email, password));
    }
  };

  return (
    <section className={styles.py3}>
      <div className={styles.container}>
        <h1 className={styles.lheading}>
          <span className={styles.textPrimary}>Sign</span> Up
        </h1>
        {message && <Message variant="danger">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}
        <form onSubmit={submitHandler}>
          <label>Name</label>
          <div className={styles.formGroup}>
            <input
              type="text"
              name="name"
              size="50"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <label>Email</label>
          <div className={styles.formGroup}>
            <input
              type="email"
              name="name"
              size="50"
              value={email}
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <label>Password</label>
          <div className={styles.formGroup}>
            <input
              type="password"
              name="name"
              size="50"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <label>Confirm password</label>
          <div className={styles.formGroup}>
            <input
              type="password"
              name="name"
              size="50"
              placeholder="Enter password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className={styles.submitContainer}>
            <button type="submit" className={styles.btn}>
              Submit
            </button>

            <div className={styles.accountAlready}>
              Have an Account?{" "}
              <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
                Login
              </Link>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default RegisterScreen;

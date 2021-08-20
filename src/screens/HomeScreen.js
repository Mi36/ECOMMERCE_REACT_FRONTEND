import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { listProducts } from "../actions/productActions";
import Meta from "../components/Meta";
import styles from "../styles/homeScreen.module.css";

const HomeScreen = ({ match }) => {
  const dispatch = useDispatch();

  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber || 1;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  return (
    <>
      <Meta />

      <Link to="/" className="btn btn-li">
        GO BACK
      </Link>

      <h1>Latest products</h1>
      {loading ? (
        <h2>Loading.....</h2>
      ) : error ? (
        <h3>{error}</h3>
      ) : (
        <>
          {products?.length > 0 &&
            products.map((product) => {
              return (
                <div className={styles.header}>
                  <div>
                    <div>
                      <img src={product.image} alt="product" />
                    </div>
                  </div>
                  <div>
                    <div>
                      <h2>{product.category}</h2>
                      <div>
                        <span>
                          <i
                            className={
                              product?.rating >= 1
                                ? "fas fa-star"
                                : product?.rating >= 0.5
                                ? "fas fa-star-half-alt"
                                : "far fa-star"
                            }
                          ></i>
                        </span>
                        <span>
                          <i
                            className={
                              product?.rating >= 2
                                ? "fas fa-star"
                                : product?.rating >= 1.5
                                ? "fas fa-star-half-alt"
                                : "far fa-star"
                            }
                          ></i>
                        </span>
                        <span>
                          <i
                            className={
                              product?.rating >= 3
                                ? "fas fa-star"
                                : product?.rating >= 2.5
                                ? "fas fa-star-half-alt"
                                : "far fa-star"
                            }
                          ></i>
                        </span>
                        <span>
                          <i
                            className={
                              product?.rating >= 4
                                ? "fas fa-star"
                                : product?.rating >= 3.5
                                ? "fas fa-star-half-alt"
                                : "far fa-star"
                            }
                          ></i>
                        </span>
                        <span>
                          <i
                            className={
                              product?.rating >= 5
                                ? "fas fa-star"
                                : product?.rating >= 4.5
                                ? "fas fa-star-half-alt"
                                : "far fa-star"
                            }
                          ></i>
                        </span>
                        <span>
                          {` `}
                          {product?.numReviews} Reviews
                        </span>
                      </div>
                    </div>
                    <Link to={`/product/${product._id}`}>{product.name}</Link>
                    <p>{product.price}</p>
                  </div>
                </div>
              );
            })}
        </>
      )}
    </>
  );
};

export default HomeScreen;

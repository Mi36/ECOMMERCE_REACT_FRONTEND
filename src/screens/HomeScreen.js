import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { listProducts } from "../actions/productActions";
import Meta from "../components/Meta";

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
    <div style={{}}>
      <Meta />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Link
          to="/"
          style={{
            textDecoration: "none",
            backgroundColor: "brown",
            borderRadius: 10,
            paddingLeft: 5,
            paddingRight: 5,
            alignSelf: "center",
            color: "white",
          }}
        >
          GO BACK
        </Link>
        <h1
          style={{
            textAlign: "center",
            alignSelf: "center",
            paddingTop: 10,
            paddingLeft: 100,
          }}
        >
          Latest products
        </h1>
      </div>

      {loading ? (
        <h2>Loading.....</h2>
      ) : error ? (
        <h3>{error}</h3>
      ) : (
        <div
          style={{
            marginTop: 30,
            marginBottom: 120,
          }}
        >
          {products?.length > 0 &&
            products.map((product) => {
              return (
                <div style={{}}>
                  <img
                    style={{}}
                    src={product.image}
                    alt="product"
                    height="440px"
                    width="440px"
                  />

                  <div>
                    <h2>{product.category}</h2>

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
                  <Link to={`/product/${product._id}`}>{product.name}</Link>
                  <p>{product.price}</p>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default HomeScreen;

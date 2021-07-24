import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import { Product } from "../components/Product";

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProducts(keyword));
  }, [dispatch, keyword]);

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  return (
    <>
      <h1>Latest products</h1>
      {loading ? (
        <h2>Loading.....</h2>
      ) : error ? (
        <h3>{error}</h3>
      ) : (
        <Row>
          {products.length > 0 &&
            products.map((product) => {
              return (
                <Col key={product._id}>
                  <Product product={product} />
                </Col>
              );
            })}
        </Row>
      )}
    </>
  );
};

export default HomeScreen;

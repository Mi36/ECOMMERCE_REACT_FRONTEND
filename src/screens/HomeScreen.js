import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { listProducts } from "../actions/productActions";
import Meta from "../components/Meta";
import Paginate from "../components/Paginate";
import { Product } from "../components/Product";
import ProductCarousel from "../components/ProductCarousel";

const HomeScreen = ({ match }) => {
  const dispatch = useDispatch();

  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber || 1;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;
  return (
    <>
      <Meta />
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to="/" className="btn btn-li">
          GO BACK
        </Link>
      )}
      <h1>Latest products</h1>
      {loading ? (
        <h2>Loading.....</h2>
      ) : error ? (
        <h3>{error}</h3>
      ) : (
        <>
          <Row>
            {products?.length > 0 &&
              products.map((product) => {
                return (
                  <Col key={product._id}>
                    <Product product={product} />
                  </Col>
                );
              })}
          </Row>
          <Paginate pages={pages} page={page} />
        </>
      )}
    </>
  );
};

export default HomeScreen;

import React, { useEffect } from "react";
import { Button, Col, Image, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { listProductsDetails } from "../actions/productActions";

export const ProductScreen = ({ match }) => {
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  useEffect(() => {
    // this how we get params and use
    dispatch(listProductsDetails(match.params.id));
  }, [match, dispatch]);
  return (
    <>
      <Link className="btn btn-light" to="/">
        Go Back
      </Link>

      {loading ? (
        <h2>Loading.....</h2>
      ) : error ? (
        <h3>{error}</h3>
      ) : (
        <Row>
          <Col md={6}>
            <Image src={product.image} alt={product.name} fluid></Image>
          </Col>
          <Col>
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <h5>{product.numReviews} reviews total</h5>
              <h5>Overall rating {product.rating}</h5>
            </ListGroup.Item>
            <ListGroup.Item>
              <h5>Price: {product.price}</h5>
            </ListGroup.Item>
            <ListGroup.Item>
              <h5>{product.description}</h5>
            </ListGroup.Item>
            <ListGroup.Item>
              <h3>
                status: {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
              </h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Button disabled={product.countInStock > 0 ? false : true}>
                Add To Cart
              </Button>
            </ListGroup.Item>
          </Col>
        </Row>
      )}
    </>
  );
};

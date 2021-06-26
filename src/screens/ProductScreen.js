import React from "react";
import { Button, Col, Image, ListGroup, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import products from "../products";

export const ProductScreen = ({ match }) => {
  // this how we get params and use
  const product = products.find((p) => p._id === match.params.id);
  return (
    <>
      <Link className="btn btn-light" to="/">
        Go Back
      </Link>
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
    </>
  );
};

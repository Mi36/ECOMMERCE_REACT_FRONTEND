import React, { useEffect, useState } from "react";
import { Button, Col, Form, Image, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { listProductsDetails } from "../actions/productActions";

const ProductScreen = ({ history, match }) => {
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  //this will make a number to an array 1->n
  // assuming product.counterStock-->n
  console.log([...Array(product.countInStock).keys()]);

  const addToCartHandler = () => {
    //props.history.push used to redirect to another page
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

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
            {product.countInStock > 0 && (
              <ListGroup.Item>
                <Row>
                  <Col>Qty</Col>
                  <Col>
                    <Form.Control
                      as="select"
                      value={qty}
                      onChange={(e) => setQty(e.target.value)}
                    >
                      {[...Array(product.countInStock).keys()].map((x) => {
                        return (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        );
                      })}
                    </Form.Control>
                  </Col>
                </Row>
              </ListGroup.Item>
            )}
            <ListGroup.Item>
              <Button
                disabled={product.countInStock > 0 ? false : true}
                onClick={addToCartHandler}
              >
                Add To Cart
              </Button>
            </ListGroup.Item>
          </Col>
        </Row>
      )}
    </>
  );
};

export default ProductScreen;

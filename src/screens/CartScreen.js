import React, { useEffect } from "react";
import {
  Button,
  Card,
  Col,
  Form,
  Image,
  ListGroup,
  Row,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, removeFromCart } from "../actions/cartActions";
import Message from "../components/Message";

const CartScreen = ({ match, location, history }) => {
  const productId = match.params.id;
  //location is an inbuilt object
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);

  const { cartItems } = cart;

  useEffect(() => {
    if (productId) dispatch(addToCart(productId, qty));
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => dispatch(removeFromCart(id));

  const checkoutHandler = () => {
    //if logged in go to shipping, otherwise not
    history.push("/login?redirect=shipping");
  };

  return (
    <Row>
      {/* 8 columns */}
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty<Link to="/">Go back</Link>
          </Message>
        ) : (
          <ListGroup>
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col>
                    {/* fluid used if image goes outer scope */}
                    <Image src={item.image} alt={item.name} fluid />
                  </Col>
                  <Col>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col>${item.price}</Col>
                  <Col>
                    <Form.Control
                      as="select"
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => {
                        return (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        );
                      })}
                    </Form.Control>
                    <Col>
                      <Button
                        type="button"
                        variant="light"
                        onClick={() => removeFromCartHandler(item.product)}
                      >
                        remove
                      </Button>
                    </Col>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={2}>
        <Card>
          <ListGroup>
            <ListGroup.Item>
              <h2>
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}
                )items
              </h2>
              $
              {cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type="button"
                className="btn-block"
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Proceed to checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
      <Col md={2}></Col>
    </Row>
  );
};

export default CartScreen;

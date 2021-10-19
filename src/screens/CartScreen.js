import React, { useEffect } from "react";
import { Form } from "react-bootstrap";
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
    <div style={{ marginBottom: 120 }}>
      <div>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty<Link to="/">Go back</Link>
          </Message>
        ) : (
          <div>
            {cartItems.map((item) => (
              <div key={item.product}>
                <div>
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: 300, height: 300 }}
                  />

                  <div>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </div>
                  <div>${item.price}</div>
                  <div>
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
                    <div>
                      <button
                        type="button"
                        onClick={() => removeFromCartHandler(item.product)}
                      >
                        remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div>
        <div>
          <h2>
            Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}
            )items
          </h2>
          $
          {cartItems
            .reduce((acc, item) => acc + item.qty * item.price, 0)
            .toFixed(2)}
        </div>
        <div>
          <button
            type="button"
            disabled={cartItems.length === 0}
            onClick={checkoutHandler}
          >
            Proceed to checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartScreen;

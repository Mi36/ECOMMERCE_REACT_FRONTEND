import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  createProductReview,
  listProductsDetails,
} from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Meta from "../components/Meta";
import Rating from "../components/Rating";
import { PRODUCTS_CREATE_REVIEW_RESET } from "../constants/productConstants";

const ProductScreen = ({ history, match }) => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;

  //this will make a number to an array 1->n
  // assuming product.counterStock-->n
  console.log([...Array(product.countInStock).keys()]);

  const addToCartHandler = () => {
    //props.history.push used to redirect to another page
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    success: successProductReview,
    loading: loadingProductReview,
    error: errorProductReview,
  } = productReviewCreate;

  const submitHandler = (e) => {
    e.preventDefault(); // this is used to submit form function to prevent page refresh
    dispatch(
      createProductReview(match.params.id, {
        rating,
        comment,
      })
    );
  };

  useEffect(() => {
    if (successProductReview) {
      alert("Review Submitted");
      setRating(0);
      setComment("");
      dispatch({ type: PRODUCTS_CREATE_REVIEW_RESET });
    }
    // this how we get params and use
    dispatch(listProductsDetails(match.params.id));
  }, [match, dispatch, successProductReview]);
  return (
    //my-3 means-> marginvertical here
    <>
      <Link className="btn btn-dark my-3" to="/">
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Meta title={product.name} />
          <div>
            <img src={product.image} alt={product.name} />

            <div>
              <div>
                <div>
                  <h3>{product.name}</h3>
                </div>

                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />

                <div>Price: ${product.price}</div>
                <div>Description: {product.description}</div>
              </div>
            </div>
            <div>
              <div>
                <div>
                  <div>
                    <div>
                      <div>Price:</div>
                      <strong>${product.price}</strong>
                    </div>
                  </div>

                  <div>
                    <div>
                      <div>Status:</div>
                      <div>
                        {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                      </div>
                    </div>
                  </div>

                  {product.countInStock > 0 && (
                    <div>
                      <div>Quantity</div>
                      <Form.Control
                        as="select"
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                      >
                        {[...Array(product.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </div>
                  )}

                  <button
                    onClick={addToCartHandler}
                    className="btn-block"
                    type="button"
                    disabled={product.countInStock === 0}
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div>
              <h2>Reviews</h2>
              {product.reviews.length === 0 && <Message>No Reviews</Message>}
              <div>
                {product.reviews.map((review) => (
                  <div key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </div>
                ))}
                <div>
                  <h2>Write a Review</h2>
                  {successProductReview && (
                    <Message variant="success">
                      Review submitted successfully
                    </Message>
                  )}
                  {loadingProductReview && <Loader />}
                  {errorProductReview && (
                    <Message variant="danger">{errorProductReview}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId="rating">
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as="select"
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value="">Select...</option>
                          <option value="1">1 - Poor</option>
                          <option value="2">2 - Fair</option>
                          <option value="3">3 - Good</option>
                          <option value="4">4 - Very Good</option>
                          <option value="5">5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId="comment">
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as="textarea"
                          row="3"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <button
                        disabled={loadingProductReview}
                        type="submit"
                        variant="primary"
                      >
                        Submit
                      </button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to="/login">sign in</Link> to write a review{" "}
                    </Message>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProductScreen;

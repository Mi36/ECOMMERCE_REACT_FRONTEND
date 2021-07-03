import axios from "axios";
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartContants";

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(
    `https://ecommerce-rest-backend.herokuapp.com/api/products/${id}`
  );

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  });

  //store to local storage same as async storage in RN
  //we have to convert to string. because only string allowed to store
  //we have to reconver when we access this using JSON.parse
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

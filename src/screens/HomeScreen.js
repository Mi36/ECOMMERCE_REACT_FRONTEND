import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Product } from "../components/Product";

const HomeScreen = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get(
        "https://ecommerce-rest-backend.herokuapp.com/api/products"
      );
      setProducts(data.products);
    };

    fetchProducts();
  }, []);

  return (
    <>
      <h1>Latest products</h1>
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
    </>
  );
};

export default HomeScreen;

import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

export const Product = ({ product }) => {
  return (
    <Card className="rounded">
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image}></Card.Img>
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title>
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text>
          <div>
            {product.rating} from {product.numReviews}
          </div>
        </Card.Text>
        <Card.Text>${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

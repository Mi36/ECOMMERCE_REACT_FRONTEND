import React from "react";
import { Card } from "react-bootstrap";

export const Product = ({ product }) => {
  return (
    <Card className="rounded">
      <a href={`/product/${product._id}`}>
        <Card.Img src={product.image}></Card.Img>
      </a>
      <Card.Body>
        <a href={`/product/${product._id}`}>
          <Card.Title>
            <strong>{product.name}</strong>
          </Card.Title>
        </a>
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

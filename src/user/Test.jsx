import React from "react";
import { useContext, useState, useEffect } from "react";
import CartContext from "./CartContext";
import "./Test.css";

function Test() {
  const { cartItems, setCartItems } = useContext(CartContext);

  const [cartSummary, setCartSummary] = useState({
    quantity: 0,
    price: 0,
  });

  useEffect(() => {
    console.log("Some modification happened in cart");
    const reducedValues = cartItems.reduce(
      (acc, currentProduct) => {
        console.log(acc.quantity, currentProduct.quantity);
        return {
          quantity: acc.quantity + currentProduct.quantity,
          price: acc.price + currentProduct.price * currentProduct.quantity,
        };
      },
      { quantity: 0, price: 0 }
    );
    setCartSummary(reducedValues);
  }, [cartItems]);

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleRemove = (index) => {
    console.log(index);
    setCartItems((state) =>
      state.filter((_, filteredIndex) => index !== filteredIndex)
    );
  };

  const quantityChangeHandler = (event, productId) => {
    console.log(event.target.value);
    console.log(productId);
    setCartItems((prevCartState) => {
      const newCartArr = prevCartState.map((item) => {
        if (item.id === productId) {
          item.quantity = +event.target.value;
        }
        return item;
      });
      return newCartArr;
    });
  };
  return (
    <>
      <div className="rest">
        <h2 className="head">My Shopping Cart</h2>
        {cartItems.length === 0 ? (
          <p>The cart is empty</p>
        ) : (
          <ul className="subtotal">
            {cartItems.map((product, index) => (
              <li key={index}>
                {product.name} <div className="minus">-</div>{" "}
                <div className="track-title">{product.title}</div>{" "}
                <div className="track-price">€{product.price}</div>{" "}
                <div className="quant">Quantity:</div>{" "}
                <select
                  className="select"
                  name="quantity"
                  value={product.quantity}
                  onChange={(event) => quantityChangeHandler(event, product.id)}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
                {/*  -Subtotal : €{product.quantity * product.price} */}
                <button className="rem" onClick={() => handleRemove(index)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
        <h4>
          Items: {cartSummary.quantity}{" "}
          <span className="tprice">Total price: €{cartSummary.price}</span>
          {cartItems.length > 0 && (
            <button className="clear" onClick={handleClearCart}>
              Clear Cart
            </button>
          )}
        </h4>
      </div>
    </>
  );
}

export default Test;

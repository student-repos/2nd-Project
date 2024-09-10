// import React from "react";
// import { useContext, useState, useEffect } from "react";
import { useContext } from "react";
import CartContext from "../controllers/CartContext";
import "./Test.css";

function CartItems() {
  const {
    products,
    cartItems,
    setQuantity,
    removeItem,
    clearCart,
    quantity,
    total
  } = useContext(CartContext);

  // const [cartSummary, setCartSummary] = useState({
  //   quantity: 0,
  //   price: 0,
  // });

  // useEffect(() => {
  //   console.log("Some modification happened in cart");
  //   const reducedValues = cartItems.reduce(
  //     (acc, currentProduct) => {
  //       console.log(acc.quantity, currentProduct.quantity);
  //       return {
  //         quantity: acc.quantity + currentProduct.quantity,
  //         price: acc.price + currentProduct.price * currentProduct.quantity,
  //       };
  //     },
  //     { quantity: 0, price: 0 }
  //   );
  //   setCartSummary(reducedValues);
  // }, [cartItems]);

  // const handleClearCart = () => {
  //   setCartItems([]);
  // };

  // const handleRemove = (index) => {
  //   console.log(index);
  //   setCartItems((state) =>
  //     state.filter((_, filteredIndex) => index !== filteredIndex)
  //   );
  // };

  // const quantityChangeHandler = (event, productId) => {
  //   console.log(event.target.value);
  //   console.log(productId);
  //   setCartItems((prevCartState) => {
  //     const newCartArr = prevCartState.map((item) => {
  //       if (item.id === productId) {
  //         item.quantity = +event.target.value;
  //       }
  //       return item;
  //     });
  //     return newCartArr;
  //   });
  // };

  const entries = Object.entries(cartItems)
  const cartList = entries.map(([id, quantity], index) => {
    id = parseInt(id)
    const product = products.find( product => product.id === id)
    const { name, title, price } = product

    return (
      <li
        key={index}
        data-id={id}
      >
        {name} <div className="minus">-</div>
        <div className="track-title">{title}</div>
        <div className="track-price">€{price}</div>
        <div className="quant">Quantity:</div>
        <select
          className="select"
          name="quantity"
          value={quantity}
          onChange={setQuantity}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        {/*  -Subtotal : €{product.quantity * product.price} */}
        <button className="rem" onClick={removeItem}>
          Remove
        </button>
      </li>
    )
  })


  const [ cart, clearButton ] = !Object.keys(cartItems).length
  ? [ <p>The cart is empty</p>, null ]
  : [ <ul className="subtotal">
        {cartList}
      </ul>,
      <button className="clear" onClick={clearCart}>
        Clear Cart
      </button>
    ]


  return (
    <div className="rest">
      <h2 className="head">My Shopping Cart</h2>
      {cart}
      <h4>
        Items: {quantity}{" "}
        <span className="tprice">Total price: €{total}</span>
        {clearButton}
      </h4>
    </div>
  );
}

export default CartItems;

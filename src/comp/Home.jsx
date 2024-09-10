import React from "react";
import "./Home.css";
import { useContext, useState } from "react";
import { useFetch } from "./useFetch";
import CartContext from "../user/CartContext";

function Home() {
  const { data } = useFetch("data.json");
  const { cartItems, setCartItems } = useContext(CartContext);

  console.log("cartItems:", cartItems);
  

  const handleAddItemToCart = ({ target }) => {
    const id = target.dataset.id
    // First thing i will look into the old Cart
    // Does that cart already contains this product or not
    const product = data.find( item => item.id == id) // 1 == "1"
    const indexOfTheProduct = cartItems.findIndex(
      (item) => item.id == id
    );
    console.log("index of the product", indexOfTheProduct);
    if (indexOfTheProduct === -1) {
      product.quantity = 1;
      setCartItems((prevCardState) => [...prevCardState, product]);
    } else {
      const updatedCartArr = cartItems.map((item) => {
        if (item.id === product.id) {
          item.quantity = item.quantity + 1;
        }
        return item;
      });
      setCartItems(updatedCartArr);
    }
  };


  const cartList = data.map((product) => (
    <li
      key={product.id}
      className="items"
    >
      {/* <div></div> */}
      <div className="text">
        {product.name} - {product.title}
        <div>€{product.price}</div>
      </div>

      <div className="btn-cards">
        <button
          className="buy"
          onClick={handleAddItemToCart}
          data-id={product.id}
        >
          Add to Cart
        </button>
        <button className="play">Add to Playlist</button>
      </div>
    </li>
  ))

  /*  
  useEffect(() => {
    fetch("https://fakestoreapi.com/carts")
      .then((response) => response.json())
      .then((data) => setTracks(data))
      .catch((err) => console.log(err));
  }, []); */
  return (
    <>
      <div className="back3"></div>

      <ul className="cards">
        {cartList}
      </ul>
    </>
  );
}

export default Home;

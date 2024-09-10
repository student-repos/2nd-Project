// import React from "react";
import "./Home.css";
// import { useContext, useState } from "react";
import { useContext } from "react";
// import { useFetch } from "../hooks/useFetch";
import CartContext from "../controllers/CartContext";
import { MusicCard } from "../components/MusicCard";

function Home() {
  // const { data } = useFetch("data.json");
  const {
    products,
    // cartItems,
    // setCartItems,
  } = useContext(CartContext);

  // console.log("products:", products, ", cartItems:", cartItems);
  

  // const handleAddItemToCart = ({ target }) => {
  //   const id = parseInt(target.dataset.id) // "1" —> 1
  //   // First thing i will look into the old Cart
  //   // Does that cart already contains this product or not
  //   const product = products.find( item => item.id === id)
  //   const indexOfTheProduct = cartItems.findIndex(
  //     (item) => item.id === id
  //   );
  //   console.log("index of the product", indexOfTheProduct);
  //   if (indexOfTheProduct === -1) {
  //     product.quantity = 1;
  //     setCartItems((prevCardState) => [...prevCardState, product]);
  //   } else {
  //     const updatedCartArr = cartItems.map((item) => {
  //       if (item.id === product.id) {
  //         item.quantity = item.quantity + 1;
  //       }
  //       return item;
  //     });
  //     setCartItems(updatedCartArr);
  //   }
  // };


  const cartList = products.map((product) => (   
    <MusicCard key={product.id} {...product} />
  ))

  /*  
  useEffect(() => {
    fetch("https://fakestoreapi.com/carts")
      .then((response) => response.json())
      .then((data) => setTracks(data))
      .catch((err) => console.log(err));
  }, []);
  */
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

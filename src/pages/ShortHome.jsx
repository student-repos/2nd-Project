import "./Home.css";
import { useContext } from "react";
import CartContext from "../controllers/CartContext";
import { MusicCard } from "../components/MusicCard";

function Home() {
  const { products } = useContext(CartContext);

  const cartList = products.map(product => (   
    <MusicCard key={product.id}  {...product} />
  ))
  
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
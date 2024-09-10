import "./App.css";
import "./user/Playlist.css";
import "./comp/Home.css";
import "./user/Register.css";
import Home from "./comp/Home";
import { Routes, Route } from "react-router-dom";
import Playlist from "./user/Playlist";
import Register from "./user/Register";
import Login from "./user/Login";
import CartItems from "./user/CartItems";
// import NavBar from "./comp/NavBar";
// import Footer from "./comp/Footer";
import { CartProvider } from "./user/CartContext";
import { Container } from "./comp/Container";

function App() {
  return (
    <CartProvider>
      <Routes>
        <Route path="/" element={<Container />}>
          <Route index element={<Home />} />
          <Route path="playlist" element={<Playlist />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="cartitems" element={<CartItems />}/>
        </Route>
      </Routes>
    </CartProvider>
  );
}

export default App;

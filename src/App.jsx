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
import NavBar from "./comp/NavBar";
import Footer from "./comp/Footer";
import { CartProvider } from "./user/CartContext";

function App() {
  return (
    <CartProvider>
      <NavBar />
      <Footer />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/playlist" element={<Playlist />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/cartitems" element={<CartItems />}></Route>
      </Routes>
    </CartProvider>
  );
}

export default App;

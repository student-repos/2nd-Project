import "./App.css";
import "./pages/Playlist.css";
import "./pages/Home.css";
import "./pages/Register.css";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import Playlist from "./pages/Playlist";
import Register from "./pages/Register";
import Login from "./pages/Login";
import CartItems from "./pages/CartItems";
// import NavBar from "./comp/NavBar";
// import Footer from "./comp/Footer";
import { CartProvider } from "./controllers/CartContext";
import { Container } from "./components/Container";

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

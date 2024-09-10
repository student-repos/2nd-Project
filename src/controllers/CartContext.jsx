import { createContext, useEffect, useReducer } from "react";
import { reducer, initialState } from "./CartReducer";
import { useFetch } from "../hooks/useFetch";

const CartContext = createContext();

function CartProvider({ children }) {
  const [ state, dispatch ] = useReducer(reducer, initialState)
  const {
    products,
    cartItems,
    playList,
    quantity,
    total
  } = state


  const { data } = useFetch("data.json"); 
  // console.log("data:", data);
  // console.log("products:", products, cartItems);

  // data is [], then an array of products when useFetch resolves
  useEffect(
    () => dispatch({
      type: "SET_PRODUCTS",
      payload: data
    }),
    [data]
  )


  const addToCart = ({ target }) => {
    const id = parseInt(target.dataset.id)

    dispatch({
      type: "ADD_ITEM",
      payload: id
    })
  }

  const setQuantity = ({ target }) => {
    const itemCount = parseInt(target.value) // from <select> 
    target = target.closest("[data-id]")
    const id = parseInt(target.dataset.id) // from <li> parent

    dispatch({
      type: "SET_QUANTITY",
      payload: { id, itemCount }
    })
  }

  const removeItem = ({ target }) => {
    target = target.closest("[data-id]")
    const id = parseInt(target.dataset.id)

    dispatch({
      type: "REMOVE_ITEM",
      payload: id
    })
  }


  const clearCart = () => {
    dispatch({
      type: "CLEAR_CART"
    })
  }


  const addToPlayList = ({ target }) => {
    target = target.closest("[data-id]")
    const id = parseInt(target.dataset.id)

    dispatch({
      type: "ADD_TO_PLAYLIST",
      payload: id
    })
  }

  return (
    <CartContext.Provider
      value={{
        products,  // will start as empty array
        cartItems, // will start as empty object
        playList,  // will start as empty array
        quantity,  // will start as 0
        total,     // will start as 0
        // functions:
        addToCart,
        setQuantity,
        removeItem,
        clearCart,
        addToPlayList
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export { CartContext as default, CartProvider };

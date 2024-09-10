/**
 * CartReducer.jsx
 * 
 * Use useReducer when:
 * + The next state depends on the previous state
 * + The state is complex
 * + You want to keep business logic:
 *   + as a pure function
 *   + in a separate module
 * + You want to be able to test easily
 */


const initialState = {
  products:  [], // set after useFetch in CartContext
  cartItems: {}, // { <product-id>: <quantity }
  quantity:  0,
  total: "0.00", // string: cost.toFixed(2) will be displayed
  playList:  [], // will contain unique product objects
}


const reducer = (state, action) => {
  const { type, payload } = action

  switch (type) {
    case "SET_PRODUCTS":
      return setProducts(state, payload)

    case "ADD_ITEM":
      return addItem(state, payload)
    case "SET_QUANTITY":
      return setQuantity(state, payload)
    case "REMOVE_ITEM":
      return removeItem(state, payload)
    case "CLEAR_CART":
      return clearCart(state)

    case "ADD_TO_PLAYLIST":
      return addToPlayList(state, payload)
      
    default:
      return {...state}
  }
}



function setProducts( state, products ) {
  return { ...state, products }
}


function addItem( state, id ) {
  let { products, cartItems, quantity } = state

  // Update quantity of product with chosen id
  // avoid undefined + 1            vvv
  const itemCount = (cartItems[id] || 0) + 1
  quantity += 1
  
  // Update cartItems object
  cartItems = { ...cartItems, [id]: itemCount }

  // Calculate total price, to two decimal places
  const total = getTotal(products, cartItems)

  return { ...state, cartItems, quantity, total }
}



function setQuantity( state, { id, itemCount } ) {
  let { products, cartItems, quantity } = state
  const currentCount = cartItems[id]

  // Update quantity of this item and total quantity
  const deltaCount = (itemCount - currentCount)
  quantity += deltaCount
  cartItems = { ...cartItems, [id]: itemCount  }

  // Calculate total price, to two decimal places
  const total = getTotal(products, cartItems)

  return { ...state, cartItems, quantity, total }
}



function removeItem( state, id ) {
  let { products, cartItems, quantity } = state
  quantity -= cartItems[id]

  delete cartItems[id]
  cartItems = { ...cartItems }

  // Calculate total price, to two decimal places
  const total = getTotal(products, cartItems)

  return { ...state, cartItems, total }
}



function clearCart( state ) {
  return { ...state, cartItems: {}, quantity: 0, total: "0.00" }
}



function addToPlayList( state, id ) {
  let { products, playList } = state

  const added = playList.findIndex( product => product.id === id )
  if (added < 0) {
    const product = products.find( product => product.id === id )
    playList = [ ...playList, product ]
  }

  return { ...state, playList }
}


// Helper function
function getTotal(products, cartItems) {
  const entries = Object.entries(cartItems)

  const total = entries.reduce((sum, [ id, quantity ]) => {
    id = parseInt(id)
    const product = products.find( product => product.id === id )
    const cost = product.price * quantity

    return sum + cost
  }, 0)

  return total.toFixed(2)
}


export { reducer, initialState }

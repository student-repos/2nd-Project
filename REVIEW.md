# Overview

I can click on an Add To Cart button, and then the Cart icon to visit /cartitems, and I find my items in the cart. I can change the quantity of any item, or remove an item, and the Total Price will update.

Your CartContext allows you to share data between the Home component and the CartItems component.

Your code works, yes, but you have not shown that you understand how React Context and Reducer should be used, which was one of the main purposes of the exercise.

Also, in your use of React-Router-Dom, you have passed over some features that would make your app more robust.

---

# Details

## 1. Non-responsive NavBar
Your NavBar is not responsive. The viewport must be over 2000px wide for the elements at the far right to become visible.

Perhaps you did this on purpose, because the Log In, Register, About, Contact and Service pages are not ready yet. But the Playback page is not working either, and you have a visible icon for it, so I'm not sure if this is the reason for moving other elements so far to the right.

As you learned in the User Interface module at the beginning of your course, most people visit web sites from their mobile phones, in portrait mode, so it is important to design first for narrow screens, and to adapt the layout to show more details as the viewport gets wider.

Working with React is not a reason to abandon this approach, even if your monitor is very wide.

## 2. Doing work inside `return`

You have this code inside the `return` statement of your `Home` component: 
```js
data.map((product) => (
  <li key={product.id} className="items">
    <div></div>
    <div className="text">
      {product.name} - {product.title}
      <div>€{product.price}</div>
    </div>

    <div className="btn-cards">
      <button
        className="buy"
        onClick={() => handleAddItemToCart(product)}
      >
        Add to Cart
      </button>
      <button className="play">Add to Playlist</button>
    </div>
  </li>
))
```

A `return` statement should _return_ a value. In JSX, it should return an HTML structure. It is not a good practice to include an JavaScript methods inside a `return` statement. You will see below how I suggest creating a `<MusicCard>` component to generate each list item, and how I prefer to create an array of such components outside the `return` statement.

## 3. Using React-Router-DOM

In your App component, you have this structure in your `return` statement:

```js
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
```

You have a similar structure in your CartItem.jsx:

```js
<>
  <NavBar />
  <Footer />
  <Test />

  <div className="back7"></div>
</>
```

It's good to write code that does not do the same thing in two different places.

React-Router-DOM provides you with a pre-defined [`<Outlet>` component](https://reactrouter.com/en/main/components/outlet) which might serve your purposes better.

If I create a `Container` component which uses `<Outlet>`, I can change your `App` component, so that it looks like this:

```js
// Some lines skipped
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
```

Here's how the Container.jsx script could look:
```js

import { Outlet } from 'react-router-dom'
import NavBar from './NavBar'
import Footer from './Footer'


export const Container = () => {
  return (
    <>
      <NavBar/>
      <Outlet/>
      <Footer/>
    </>
  )
}
```

In the App component, you have...
```js
<Route path="/" element={<Container />}>
  {/* Child routes */}
</Route>
```

For a path like `http://localhost:5173/cartitems` the component `<CartItems>` will be assigned to the `<Outlet>` in the `<Container>` component. In other words, when the URL in the address bar uses the `/cartitems` path, this...
```js
<>
  <NavBar/>
  <Outlet/>
  <Footer/>
</>
```
... will be rendered as if it were:

```js
<>
  <NavBar/>
  <CartItems/>
  <Footer/>
</>
```

Similarly, if the `/` path is used on its own, the `index` route will be used and the `<Container>` component will render...

```js
<>
  <NavBar/>
  <Home/>
  <Footer/>
</>
```

Does this concept make sense to you?

Do you see how this allows you to remove all references to the `<NavBar/>` and the `<Footer/>` from CartItems.jsx, and yet they will still appear on the page?

Indeed, you could replace the contents of CartItems.jsx with the contents of Test.jsx, and simply replace all occurrences of "Test" with "CartItems", except for `import "./Test.css";` and your app will continue to work just as well.

## 4. Folder Hierarchy

`useFetch` is a hook, but you have stored your useFetch.jsx file inside the `comp/` folder. You have Home.jsx in the `comp/` folder, along with Header.jsx and Footer.jsx, but other pages which use the `<Header>` and `<Footer>` components are in a folder named `user`.

I suggest that you should have a separate folder for each different kind of file, and keep all files of the same time in the same folder. Here's how I would organize your files inside `src/`:
```bash

├── App.css
├── App.jsx
├── assets
│   ├── 01.jpg
│   ├── 02.jpg
│   ├── 03.jpg
│   ├── 04.jpg
│   ├── 05.jpg
│   ├── Britney.jpg
│   ├── react.svg
│   └── search.png
├── components
│   ├── Container.jsx
│   ├── Footer.css
│   ├── Footer.jsx
│   ├── MusicCard.jsx
│   ├── NavBar.css
│   └── NavBar.jsx
├── controllers
│   ├── CartContext.jsx
│   └── CartReducer.jsx
├── hooks
│   └── useFetch.js
├── index.css
├── main.jsx
└── pages
    ├── CartItems.css
    ├── CartItems.jsx
    ├── Home.css
    ├── Home.jsx
    ├── Login.css
    ├── Login.jsx
    ├── Playlist.css
    ├── Playlist.jsx
    ├── Register.css
    ├── Register.jsx
    └── Test.css
```
(I'll discuss `MusicCard.jsx` and the `controllers/` folder shortly.)

## 5. Separation of Concerns

Your Home and Test components do some complex calculations, and you simply use the CartContext to share an array between them.

Do you remember learning about the [MVC design pattern](https://developer.mozilla.org/en-US/docs/Glossary/MVC)? The current values of the data in your application are the Model, the user interface provides a View of the relevant parts of that data, and also provides inputs (such as buttons) to allow the user to Control the data.

Your app contains two types of data in the Model:
1. The list of products that are available (read from `data.json`)
2. A list of products selected by the user (stored in `cartItems`)

The Home and CartItems components create a user interface. Their task is to show the user a simple _view_ of the part of the _model_, and to provide inputs for the _controller_ to update the model.

In other words, you can make the Home and CartItems components very simple. They have one task: to provide a view with some inputs. The _control_ aspect can be handled by the Context. Even better, the Context can make use of a Reducer that will handle changes to the Model using pure functions.

I have reworked your app to benefit from all the power that React Context and Reducer provide.

### A. CartReducer

I have added a CartReducer.jsx file.

#### The `state` object

The CartReducer script manages a `state` object with this structure:
```js
const initialState = {
  products:  [],
  cartItems: {},
  quantity:  0,
  total:    "0.00",
  playList:  []
}
```

1. `products` starts empty. It will be populated later, after the `data.json` objects has been read in.
2. `cartItems` is an object which will contain product `id`s as its keys, and the quantity of that product that the user has chosen. This means that the objects in the `products` will remain unchanged. No `quantity` property will be added to any object in `products`.
3. `quantity` will be the total number of items the user chooses
4. `total` will be the total cost of those items, stored as a string, so that it can shown two decimal places (for cents)
5. `playList` will contain pointers to objects in the `products` list, but only one of each.


As you can see, the quantity and the total cost will be calculated by the `reducer` function, and stored in the `state` object. In other words, the entire shopping experience is _modelled_ by the `state` object.

(To be honest, CartContext may not be the best name for an object that also contains a `playList` which may not be part of a purchase, but I'll ignore that for now.)

#### The `reducer` function

The `reducer()` function contains a `switch` statement to deal with six different action types:

1. "SET_PRODUCTS" is used to populate the `products` array
2. "ADD_ITEM" is triggered when the user clicks on an Add To Cart button in the Home page
3. "ADD_TO_PLAYLIST" is triggered when the user clicks on an Add To Playlist button in the Home page
4. "SET_QUANTITY" is triggered when the user selects a different quantity in the `<select>` element on the CartItems page
5. "REMOVE_ITEM" is triggered when the user clicks on the red Remove button on the CartItems page
6. "CLEAR_CART" is triggered when the user clicks on the Clear Cart button on the CartItems page

As you can see, all the work of managing the various properties of the `state` variable are carried out in the CartReducer script. The `reducer` function neither knows nor cares what is triggering these different actions. It simply updates the `state` (Model) and returns the updated version.

### B. CartContext

The calls to the `reducer` function are passed to the CartReducer script by the CartContext.

It is the CartContext which calls `useFetch` in order to obtain data about the products in the shop. It reads the `reducer` and `initialState` from the CartReducer script, and uses these values to initialize its `state` and `dispatch` variables. Then it deconstructs the `state` variable, to have direct access to its properties and their values:

```js
  const [ state, dispatch ] = useReducer(reducer, initialState)
  const {
    products,
    cartItems,
    playList,
    quantity,
    total
  } = state
```

Initially, `products` will be an empty array (`[]`). However, as soon as `useFetch()` resolves with a non-empty array of product objects, it calls...
```js
dispatch({
  type: "SET_PRODUCTS",
  payload: data
})
```
... with this new data. Immediately afterwards, React will call the `CartProvider` function again and read the updated version of `state` from the CartReducer script; this update `state` will contain a full `products` array.

The CartProvider provides the individual values read from `state` to all its children. It also provides a number of functions to allow its children to trigger `dispatch` calls to the CartReducer. For example:
```js
const addToCart = ({ target }) => {
  const id = parseInt(target.dataset.id)

  dispatch({
    type: "ADD_ITEM",
    payload: id
  })
}
```

The `addToCart()` function will receive a `click` event from an Add To Cart button on the Home page. It obtains the `id` of the product associated with that button (I'll explain how in a moment), and sends a `dispatch` call to the `reducer` function with this `id` as the payload.

Here are all the members of the `value` object that the `CartProvider` provides to its children:
```js
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
```

So you see that the CartContext is acting as a go-between for the components that are visible in the user interface (the View) and the code in CardReducer that updates the Model.

### C. The Home View

I have greatly simplified the Home.jsx script. Now, it simply reads `products` from the `CartContext` and uses this to create an array of `<MusicCard>` components.

In the `review` branch, I have left in all the lines that I have commented out, so that you can see how much I have cut. Here's a short version, without any commented-out lines:

```js
import { useContext } from "react";
import CartContext from "../controllers/CartContext";
import { MusicCard } from "../components/MusicCard";
import "./Home.css";

function Home() {
  const { products } = useContext(CartContext);

  const cartList = products.map(product => (
    <MusicCard key={product.id} {...product} />
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
```

Do you see how simple the `return` statement is? That is because I have moved the creation of each separate card to the MusicCard.jsx script. I've used the spread operator with ` {...product}` as a shorthand to pass the entire contents of the `product` object as props to the `<MusicCard>` component.

### D. MusicCard

Your Home.jsx script contains a huge `return` statement with a separate listener function for each `onClick` attribute. By creating a separate `<MusicCard>` component, I have managed to reduce it to something very simple.

The `<MusicCard>` component receives all the data for one product as `props`. It also reads the generic `addToCart` and `addToPlayList` function from `CartContext`. I deconstruct the `props` parameter so that I can use the specific property names directly in the `return` statement.

Instead of using a specific listener like `() => addToCart(product.id)`, I use the generic function provided by `CartContent`. This means that the `addToCart` function in `CartContent` will receive a `click` event, with the buy button as its target. Somehow, I need to tell the function in `CartContext` which product is associated with the card on which the button was clicked. For this I create a ]_data attribute_](https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes): `data-id`.
```js
<button
  className="buy"
  onClick={addToCart}
  data-id={id}
>
  Add to Cart
</button>
```

As you saw earlier, the `addToCart()` function in `CartContext` can read this using the `.dataset` property of the button target:

```js
const addToCart = ({ target }) => {
  const id = parseInt(target.dataset.id)

  dispatch({
    type: "ADD_ITEM",
    payload: id
  })
}
```

The value of `data-id` will be stored in HTML as a string, so I need to convert it to a number using `parseInt()`, so that it will have the same type as the product.`id` stored in `data.json`.

### E. MVC

You can see now how the components that appear in your user interface can contain the strict minimum to create a View with the ability to interact with the Controller functions in the Context and Reducer scripts.

The Context passes pure data to the Reducer, and the functions called by `reducer` manage how the Model data is updated. Let me end by reviewing the `addItem` function in the CartReducer script.
```js
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
```
This does several things:
1. It increments the `quantity` property of the `state` object, because each time Add To Cart is clicked, there is one more item in the cart.
2. It updates the value associated with the `id` of the product the user selected in `cartItems`.
3. It calls an helper function to recalculate the total cost of the items in the cart.

The `cartItems` object starts empty, as `{}`. If you click on a product with the `id` "5", `cartItems` will be updated to `{ 5: 1 }`, because you have chosen 1 copy of product 5. If you click on the same item again, `cartItems` will be updated to `{ 5: 2 }`.

The `getTotal()` helper function is called for several cases:
* When an item is added
* When the quantity of a given item is changed
* When an item is removed.

Having one function that can be called in each of these cases ensures that there is only one place that needs to be edited if a fix is required or a new feature is to be added.


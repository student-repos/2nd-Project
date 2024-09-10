## 1. Non-responsive NavBar
Your NavBar is not responsive. The viewport must be over 2000px wide for the elements at the far right to become visible.

As you learned in the User Interface module at the beginning of your course, most people visit web sites from their mobile phones, in portrait mode, so it is important to design first for narrow screens, and to adapt the layout to show more details as the viewport gets wider.

Working with React is not a reason to abandon this approach, even if your monitor is very wide.

 ## 2. Using React-Router-DOM
 
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

## 3. 
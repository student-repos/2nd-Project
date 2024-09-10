/**
 * src/components/MusicCard.jsx
 */


import { useContext } from 'react'
import CartContext from '../controllers/CartContext'


export const MusicCard = (props) => {
  const { addToCart, addToPlayList } = useContext(CartContext)
  const { id, name, title, price} = props

  return (
    <li className="items">
      <div className="text">
        {name} - {title}
        <div>€{price}</div>
      </div>

      <div className="btn-cards">
        <button
          className="buy"
          onClick={addToCart}
          data-id={id}
        >
          Add to Cart
        </button>
        <button
          className="play"
          onClick={addToPlayList}
          data-id={id}
        >
          Add to Playlist
        </button>
      </div>
    </li>
  )
}
import { useContext, useState } from 'react';

import Modal from '../UI/Modal';
import CartItem from './CartItem';
import classes from './Cart.module.css';
import CartContext from '../../store/cart-context';
import LoadingSpinner from '../UI/LoadingSpinner';

const Cart = (props) => {
  const [orderLoading, setOrderLoading] = useState(false);
  const [error, setError] = useState(false);

  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem(item);
  };

  const orderHandler = async () => {
    // Call API to place order
    setOrderLoading(true);

    try {
      const response = await fetch('https://react-custom-hooks-pract-d5cc1-default-rtdb.europe-west1.firebasedatabase.app/orders.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ items: cartCtx.items, displayedAmount: cartCtx.totalAmount })
      });

      if (response.ok) {
        // Clear Cart
        cartCtx.clearCart();
        // Close cart
        props.onClose();
        setError(false);
      } else {
        throw Error('There was an error');
      }
    } catch (error) {
      setError(true);
    } finally {
      setOrderLoading(false);
    }
  };

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {orderLoading && <LoadingSpinner />}
      <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onClose}>
          Close
        </button>
        {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
      </div>
      {error && <p>There was an error, please try order again.</p>}
    </Modal>
  );
};

export default Cart;

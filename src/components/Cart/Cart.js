import { useContext } from 'react';

import Modal from '../UI/Modal';
import CartItem from './CartItem';
import classes from './Cart.module.css';
import CartContext from '../../store/cart-context';
import LoadingSpinner from '../UI/LoadingSpinner';
import useHttp from '../../hooks/use-http';
import CheckoutForm from './CheckoutForm';

const Cart = (props) => {
  const { isLoading, error, httpRequest: postOrder } = useHttp();

  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem(item);
  };

  const orderSuccess = () => {
    // Clear Cart
    cartCtx.clearCart();
    // Close cart
    props.onClose();
  }

  const sendOrderHandler = async () => {

    const requestConfig = {
      url: 'https://react-custom-hooks-pract-d5cc1-default-rtdb.europe-west1.firebasedatabase.app/orders.json',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: { items: cartCtx.items, displayedAmount: cartCtx.totalAmount }
    }

    await postOrder(requestConfig, orderSuccess);
  };

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={() => { cartItemRemoveHandler(item.id) }}
          onAdd={() => { cartItemAddHandler(item) }}
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
      {isLoading && <LoadingSpinner loadingMessage='Placing your order...' />}
      <div className={classes.actions}>
        {/* <button className={classes['button--alt']} onClick={props.onClose}>
          Close
        </button> */}
      </div>
      {hasItems && <CheckoutForm sendOrderHandler={sendOrderHandler} />}
      {error && <p>There was an error, please try order again.</p>}
    </Modal>
  );
};

export default Cart;

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Helper function to convert cost string (e.g., "$15.00" or "15.00") to a number
  const parseCost = (cost) => {
    if (typeof cost === 'number') return cost;
    return parseFloat(cost.replace(/[^0-9.-]+/g, '')) || 0;
  };

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => {
      const unitPrice = parseCost(item.cost);
      return total + unitPrice * item.quantity;
    }, 0).toFixed(2);
  };

  // Return to the product listing page
  const handleContinueShopping = (e) => {
    if (onContinueShopping) {
      onContinueShopping(e);
    }
  };

  // Handle Checkout click
  const handleCheckoutShopping = (e) => {
    alert('Functionality to be added for future reference');
  };

  // Increment item quantity
  const handleIncrement = (item) => {
    dispatch(updateQuantity({
      name: item.name,
      quantity: item.quantity + 1
    }));
  };

  // Decrement item quantity or remove if quantity reaches 0
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({
        name: item.name,
        quantity: item.quantity - 1
      }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  // Remove plant from cart
  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  // Calculate total cost for a single item (subtotal)
  const calculateTotalCost = (item) => {
    const unitPrice = parseCost(item.cost);
    return (unitPrice * item.quantity).toFixed(2);
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1" onClick={(e) => handleCheckoutShopping(e)}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;
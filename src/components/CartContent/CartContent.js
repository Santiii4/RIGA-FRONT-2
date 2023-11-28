import { useContext } from "react";
import { dataContext } from "../Context/DataContext";

import CartElements from "./CartElements.js";
import CartTotal from "./CartTotal.js";
import Navbar from "../Navbar/Navbar";

import "./CartContent.css";

const CartContent = () => {
  const { cart, products } = useContext(dataContext);

  return (
    <>
      <Navbar />
      {cart.length > 0 ? (
        <>
          <CartElements products={products} />
          <CartTotal />
        </>
      ) : (
        <h2 className='cart-message-center'>Your cart is empty</h2>
      )}
    </>
  );
};

export default CartContent;

import React, { useState, createContext, useEffect } from "react";
import { Navigate } from "react-router";
// import { pizzaProducts } from "../fakeData/pizzas";
import ordering from "../pizzaordering/ordering";
import axios from "axios";
import Api from "../Api";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [pizzaProducts,setPizzaProducts] = useState([]);
  useEffect(function(){
    Api().get("/pizzas").then((pizzas) => {
      const data = pizzas.data.map((item) => {
        return { ...item, id: item._id };
      });
      setPizzaProducts(data);
    });
  },[])
  const [cartItems, setCartItems] = useState([]);
  const addToCart = (id, quantity, selectedPizzaSize) => {
    let newPizzaArray = ordering.addPizzaToCart(id, quantity, selectedPizzaSize, cartItems, pizzaProducts);
    setCartItems(newPizzaArray);
  };

  const removeFromCart = (id, selectedPizzaSize) => {
    let newPizzaArray = ordering.removePizzaFromCart(id, selectedPizzaSize, cartItems);
    setCartItems(newPizzaArray);
  };

  const emptyCart = () => {
    setCartItems([])
  }

  // removeFromCart()
  // order

  // order(){
  //   // console.log()
  //   axios.post('bekendURL', {
  //     data: {
  //       cartItems
  //     }
  //   })

  //   setCartItems([])
  // }

  const handleOrder = () => {
    const email = prompt("Please enter e-mail", "")
    const address = prompt("Please enter address", "")
    Api().post("/orders",{cartItems, email, address})
      .then(()=>{
        emptyCart();
        alert("Thannks for buying");
      })
      .catch((e) => console.error(e))
  }

  const value = { pizzaProducts, setPizzaProducts, cartItems, addToCart, removeFromCart, emptyCart, handleOrder };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export { CartContext, CartProvider };
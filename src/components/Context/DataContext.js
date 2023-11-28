import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const dataContext = createContext();

const DataProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);

  const buyProducts = (product) => {
    const productrepeat = cart.find((item) => item.id === product.id);

    if (productrepeat) {
      setCart(cart.map((item) => (item.id === product.id ? { ...product, quanty: productrepeat.quanty + 1 } : item)));
    } else {
      setCart([...cart, product]);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    };

    fetchProducts();
  }, []); // Ejecutar solo al montar el componente

  return (
    <dataContext.Provider value={{ cart, setCart, buyProducts, products }}>
      {children}
    </dataContext.Provider>
  );
};

export default DataProvider;
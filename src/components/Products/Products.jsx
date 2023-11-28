import { useContext, useState, useEffect } from "react";
import { dataContext } from "../Context/DataContext";
import axios from "axios";
import "./Products.css";

const Products = () => {
  const { data, cart, setCart } = useContext(dataContext);

  useEffect(() => {
    // Realizar la solicitud GET para obtener los productos desde la API
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/products");
        const productsFromApi = response.data;
        // Actualizar el estado con los productos obtenidos
        // Puedes ajustar esto según la estructura real de tus datos
        setCart(productsFromApi);
      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    };

    fetchProducts();
  }, []); // El array vacío asegura que este efecto solo se ejecute una vez al montar el componente

  const buyProducts = (product) => {
    console.log(product);
    setCart([...cart, product]);
  };

  return cart.map((product) => {
    return (
      <div className="card" key={product.id}>
        <img className="Imagen" src={product.img} alt="img-product-card" />
        <h3>{product.name}</h3>
        <h4>{product.price}$</h4>
        <button onClick={() => buyProducts(product)}>Buy</button>
      </div>
    );
  });
};

export default Products;
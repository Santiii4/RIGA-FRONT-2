import React, { useState } from 'react';
import axios from 'axios';
import './LogIn.css';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    usernameOrEmail: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = async () => {
    try {
      // Realiza una solicitud para iniciar sesión
      const response = await axios.post('http://localhost:8080/api/login', formData);

      // Verifica si el inicio de sesión es exitoso (adaptar según la estructura real de la respuesta)
      if (response.data && response.data.token) {
        console.log('Inicio de sesión exitoso:', response.data);
        // Muestra una alerta de inicio de sesión exitoso
        alert('Inicio de sesión exitoso');
      } else {
        console.log('Credenciales incorrectas');
        // Muestra una alerta de credenciales incorrectas
        alert('No se pudo iniciar sesión: Credenciales incorrectas');
      }

    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      // Muestra una alerta de error si lo deseas
      alert('Error al iniciar sesión');
    }
  };

  return (
    <div className="login-form-container">
      <h2 className="titulo">Iniciar Sesión</h2>
      <form>
        <div className="grupo-formulario">
          <label className="etiqueta" htmlFor="usernameOrEmail">Nombre de Usuario o Email:</label>
          <input
            className="entrada"
            type="text"
            id="usernameOrEmail"
            name="usernameOrEmail"
            value={formData.usernameOrEmail}
            onChange={handleChange}
            required
          />
        </div>
        <div className="grupo-formulario">
          <label className="etiqueta" htmlFor="password">Contraseña:</label>
          <input
            className="entrada"
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button className="boton" type="button" onClick={handleLogin}>
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
};

export default LoginForm;


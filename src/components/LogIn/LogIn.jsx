// En tu componente de React
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
      const response = await axios.get('http://localhost:8080/api/users', {
        params: formData, // Enviar datos como parámetros de consulta
      });

      // Verifica si el usuario existe en la base de datos
      if (response.data && response.data.length > 0) {
        console.log('Inicio de sesión exitoso:', response.data);
        // Muestra una alerta de inicio de sesión exitoso
        alert('Inicio de sesión exitoso');
      } else {
        console.log('Usuario no encontrado en la base de datos');
        // Muestra una alerta de usuario no encontrado
        alert('No se pudo iniciar sesión: Usuario no encontrado');
      }

    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      // Muestra una alerta de error si lo deseas
      alert('Error al iniciar sesión');
    }
  };

  return (
    <div className="login-form-container">
      <h2>Iniciar Sesión</h2>
      <form>
        <div className="form-group">
          <label htmlFor="usernameOrEmail">Nombre de Usuario o Email:</label>
          <input
            type="text"
            id="usernameOrEmail"
            name="usernameOrEmail"
            value={formData.usernameOrEmail}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="button" onClick={handleLogin}>
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
};

export default LoginForm;

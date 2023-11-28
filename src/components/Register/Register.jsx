import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "./Register.css";
import riga from "../../multimedia/riga.png";

export default function Register() {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    repeatPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Realizar la acción de registro utilizando axios u otra librería
      const response = await axios.post('/api/register', formData);
      console.log('Registro exitoso:', response.data);
      // Aquí podrías redirigir al usuario a la página de inicio o hacer otras acciones necesarias
    } catch (error) {
      console.error('Error en el registro:', error);
      // Manejar el error de registro, mostrar un mensaje, etc.
    }
  };

  return (
    <body>
      <div className="container1">
        <div className="wrapper">
          <div className="title"><span>Register</span></div>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <i className="fas fa-user"></i>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="row">
              <i className="fas fa-user"></i>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="row">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="row">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                name="repeatPassword"
                placeholder="Repeat Password"
                value={formData.repeatPassword}
                onChange={handleChange}
                required
              />
            </div>
            <div className="row button">
              <input type="submit" value="Register" />
            </div>
            <div className="signup-link">Already a member? <Link to='/Login'>Signin now</Link></div>
          </form>
        </div>
      </div>
    </body>
  );
}

import React, { useState } from "react";
import "./Register.css";
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Register() {
  const [firstname, nombre] = useState("");
  const [Password, contraseña] = useState("");
  const [Email, correoElectronico] = useState("");
  const [repeatPassword, repetirContraseña] = useState("");

  const registro = async (e) => {
    e.preventDefault();

    // Verificar que el correo electrónico contenga un símbolo "@"
    if (!Email.includes('@')) {
      alert("El correo electrónico debe contener un símbolo '@'.");
      return;
    }

    // Continuar con la validación de contraseñas
    if (Password === repeatPassword) {
      try {
        await axios.post("http://localhost:8080/api/users", { Email, Password, firstname });
        alert("Cuenta creada exitosamente");
      } catch (error) {
        alert("No se pudo crear la cuenta");
      }
    } else {
      alert("Las contraseñas no son iguales");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" action="#" method="post">
        <h2>Cree su cuenta</h2>
        <div className="input-container">
          <label htmlFor="nombre">Nombre</label>
          <input type="text" id="nombre" name="nombre" value={firstname} onChange={(e) => nombre(e.target.value)} required />
        </div>
        <div className="input-container">
          <label htmlFor="email">Correo Electrónico</label>
          <input type="email" id="email" name="email" value={Email} onChange={(e) => correoElectronico(e.target.value)} required />
        </div>
        <div className="input-container">
          <label htmlFor="contrasena">Contraseña</label>
          <input type="password" id="contrasena" name="contrasena" value={Password} onChange={(e) => contraseña(e.target.value)} required />
        </div>
        <div className="input-container">
          <label htmlFor="repetir-contrasena">Repetir Contraseña</label>
          <input
            type="password"
            id="repetir-contrasena"
            name="repetir-contrasena"
            value={repeatPassword}
            onChange={(e) => repetirContraseña(e.target.value)}
            required
          />
        </div>

        <div className="botoneslogin">
          <Link>
            <button type="submit" onClick={registro}>Crear cuenta </button>
          </Link>
        </div>
      </form>
    </div>
  );
}

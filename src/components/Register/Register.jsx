// JavaScript (JSX) - Register.js

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
    <div className="rregister-container">
      <form className="rregister-form" action="#" method="post">
        <h2>Registrarse</h2>
        <div className="rinput-container">
          <label htmlFor="rnombre">Nombre: </label>
          <input type="text" id="rnombre" name="rnombre" value={firstname} onChange={(e) => nombre(e.target.value)} required />
        </div>
        <div className="rinput-container">
          <label htmlFor="remail">Correo Electrónico: </label>
          <input type="email" id="remail" name="remail" value={Email} onChange={(e) => correoElectronico(e.target.value)} required />
        </div>
        <div className="rinput-container">
          <label htmlFor="rcontrasena">Contraseña: </label>
          <input type="password" id="rcontrasena" name="rcontrasena" value={Password} onChange={(e) => contraseña(e.target.value)} required />
        </div>
        <div className="rinput-container">
          <label htmlFor="rrepetir-contrasena">Repetir Contraseña: </label>
          <input
            type="password"
            id="rrepetir-contrasena"
            name="rrepetir-contrasena"
            value={repeatPassword}
            onChange={(e) => repetirContraseña(e.target.value)}
            required
          />
        </div>

        <div className="rbotoneslogin">
          <Link>
            <button type="submit" onClick={registro}>Crear cuenta </button>
          </Link>
        </div>
      </form>
    </div>
  );
}


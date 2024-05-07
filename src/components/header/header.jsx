import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, IconButton, InputBase, Badge } from '@mui/material';
import { ShoppingCart, Search } from '@mui/icons-material';
import { Autocomplete } from '@mui/material';
import logoImage from "../../multimedia/riga.png";
import carritoImage from "../../multimedia/carro-de-la-compra.png";
import "./header.css"; // Importa los estilos CSS aquí
import { configurar } from "../../TF/TF";

const productOptions = [
    { title: 'Product 1' },
    { title: 'Product 2' },
    { title: 'Product 3' },
];

export default function Header() {

    useEffect(() => {
        configurar()
    }, [])

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Link to='/' style={{ textDecoration: 'none'}}>
                        <img className="logo" src={logoImage} alt="R.I.G.A" />
                    </Link>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}></Typography>
                    <Autocomplete
                        id="filled-basic"
                        options={productOptions}
                        getOptionLabel={(option) => option.title}
                        style={{ width: 300, marginRight: '2rem' }}
                        renderInput={(params) => (
                            <InputBase
                                {...params}
                                placeholder="Search for products..."
                                sx={{
                                    background: '#1b5e20',
                                    fontFamily: 'Roboto Slab, serif',
                                    padding: '0.5rem',
                                    borderRadius: '4px',
                                    '& input': {
                                        color: '#FAF1E4',
                                    },
                                }}
                            />
                        )}
                    />
                    <div>
                        <ul className="barraNav">
                            <li className="liNav">
                                <Link to='/Products' className="linkInfo">Products</Link>
                            </li>
                            <li className="liNav">
                                <Link to='/Register' className="linkInfo">Register</Link>
                            </li>
                            <li className="liNav">
                                <Link to='/Login' className="linkInfo">Login</Link>
                            </li>
                            <li className="liNav">
                                <Link to='/Carrito'>
                                    <IconButton aria-label="show cart items" color="inherit">
                                        <Badge badgeContent={4} color="error">
                                            <ShoppingCart />
                                        </Badge>
                                    </IconButton>
                                </Link>
                            </li>
                            <li className="liNav">
                                <span id="etiquetas_predichas"></span> {/* Añadido el span con el ID 'etiquetas_predichas' */}
                            </li>
                        </ul>
                    </div>
                </Toolbar>
            </AppBar>
            <input type="text" id="entrada-texto" style={{display: 'none'}} /> {/* Añadido el input con el ID 'entrada-texto' */}
        </div>
    )
}


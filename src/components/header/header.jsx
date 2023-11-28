import "./header.css"
import riga from "../../multimedia/riga.png";
import {Link} from 'react-router-dom'
import Carrito from "../../multimedia/carro-de-la-compra.png";

export default function Header () {
    return(
        <div>
            <body class="body"> 
                <section class="sectionMain">
                    <div class="divLogoTitulo">     
                        <Link to= '/'><img class="logo" src={riga}alt="R.I.G.A" /></Link>
                    </div>
                    <div>
                        <ul class="BarraNav">
                            <li class="liNav">
                                <Link to= '/Products' class="linkInfo">Products</Link>
                            </li>
                            <li class="liNav">
                                <Link to = '/Register' class="linkInfo">Register</Link>
                            </li>
                            <li class="liNav">
                                <Link to = '/Login' class="linkInfo">Login</Link>
                            </li>
                            <div class="divLogoTitulo">     
                                <Link to= '/Carrito'><img class="Carrito" src={Carrito}alt="Carrito" /></Link>
                            </div>
                        </ul>
                    </div>
                </section>
            </body>
        </div>
    )
}
import './App.css';
import Header from './components/header/header'
import Footer from './components/footer/footer'
import Home from './components/body/Home'
import LogIn from './components/LogIn/LogIn'
import Products from "../src//components/Products/Products"
import Register from './components/Register/Register'
import Carrito from './components/CartContent/CartContent'
import {BrowserRouter as Router, Route, Routes, BrowserRouter} from 'react-router-dom';
import DataProvider from './components/Context/DataContext';


function App() {
  return (
    <DataProvider>
      <div className="App">
          <Router>
            <Routes>
              <Route path = '/' element= {<>
                <Header />
                <Footer />
                <Home />
                </>
              } />
              <Route path = '/Products' element= {<>
                <Header />
                <Footer />
                <Products />
                </>
              } />
              <Route path = '/+INFO' element= {<>
                <Header />
                <Footer />
                </>
              } />
              <Route path = '/Login' element= {<>
                <Header />
                <Footer />
                <LogIn />
                </>
              } />
              <Route path = '/Register' element= {<>
                <Header />
                <Footer />
                <Register />
                </>
              } />
              <Route path = '/Products' element= {<>
                <Header />
                <Footer />
                <Products />
                </>
              } />
              <Route path = '/Carrito' element= {<>
                <Header />
                <Footer />
                <Carrito />
                </>
              } />
            </Routes>
          </Router>
      </div>
  </DataProvider>
  );
}

export default App;

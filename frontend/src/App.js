import './App.css';
import Footer from './components/pages/Footer';
import Navbar from './components/pages/Navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import About from './components/pages/About';
import Contact from './components/pages/Contact';
import Home from './components/pages/Home';
import Products from './components/layout/products/Products';
import ProductDetails from './components/layout/products/ProductDetails';
import SearchResult from './components/layout/products/SearchResult'
import Auth from './components/layout/auth/Auth';
import Register from './components/layout/auth/Register';
import { loadingUserRequest } from './store/auth'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react';
import Cart from './components/layout/cart/Cart'
import ProtectedRoute from './components/layout/routes/ProtectedRoute';
import Profile from './components/layout/cart/Profile';

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadingUserRequest())
  }, [dispatch])

  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/about' component={About} />
        <Route exact path='/contact' component={Contact} />
        <Route exact path='/products' component={Products} />
        <ProtectedRoute exact path='/cart' component={Cart} />
        <ProtectedRoute exact path='/me' component={Profile} />
        <Route exact path='/search/:keyword' component={SearchResult} />
        <Route exact path='/product/:id' component={ProductDetails} />
        <Route exact path='/auth' component={Auth} />
        <Route exact path='/register' component={Register} />
      </Switch>
      <Footer />
    </Router>
  );
}


export default App;

import './App.css';
import Footer from './components/pages/Footer';
import Navbar from './components/pages/Navbar';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import About from './components/pages/About';
import Contact from './components/pages/Contact';
import Home from './components/pages/Home';
import Products from './components/layout/products/Products';
import ProductDetails from './components/layout/products/ProductDetails';
import SearchResult from './components/layout/products/SearchResult'
import Auth from './components/layout/auth/Auth';
import Register from './components/layout/auth/Register';
import { loadingUserRequest } from './store/auth'
import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect } from 'react';
import Cart from './components/layout/cart/Cart'
import ProtectedRoute from './components/layout/routes/ProtectedRoute';
import Profile from './components/layout/cart/Profile';
import UpdatingProfile from './components/layout/auth/UpdatingProfile';
import Shipping from './components/layout/cart/Shipping';
import ConfirmOrder from './components/layout/cart/ConfirmOrder';
import { stripeKeyRequesting } from './store/payment'
import Payment from './components/layout/cart/Payment';

import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"


function App() {

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadingUserRequest())
    dispatch(stripeKeyRequesting())
  }, [dispatch])

  const { res, isAuthenticated } = useSelector(state => state.auth.login)
  const stripeKey = useSelector(state => state.payment.stripeApiKey)
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
        <Route
          path='/update-profile'
          render={props => {
            if (!res || !isAuthenticated) return <Redirect to={{
              pathname: "/auth",
              state: { from: props.location }
            }} />
            return <UpdatingProfile {...props} />
          }}
        />
        <Route exact path='/search/:keyword' component={SearchResult} />
        <Route exact path='/product/:id' component={ProductDetails} />
        <Route exact path='/auth' component={Auth} />
        <ProtectedRoute exact path='/shipping' component={Shipping} />
        <ProtectedRoute exact path='/confirm/order' component={ConfirmOrder} />
        {stripeKey &&
          <Elements stripe={loadStripe(stripeKey)}>
            <ProtectedRoute exact path="/payment" component={Payment} />
          </Elements>
        }
        <Route exact path='/register' component={Register} />
      </Switch>
      <Footer />
    </Router>
  );
}


export default App;

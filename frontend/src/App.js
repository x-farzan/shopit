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
import PaymentSuccess from './components/layout/cart/PaymentSuccess';
import ListOrders from './components/layout/order/ListOrders';
import OrderAction from './components/layout/order/OrderAction';

import Dashboard from './components/layout/admin/Dashboard';
import ProductsList from './components/layout/admin/ProductsList';
import NewProduct from './components/layout/admin/NewProduct';
import UpdateProduct from './components/layout/admin/UpdateProduct';
import Orders from './components/layout/admin/Orders';
import OrderStatus from './components/layout/admin/OrderStatus';
import Users from './components/layout/admin/Users';


function App() {

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadingUserRequest())
    dispatch(stripeKeyRequesting())
  }, [dispatch])

  const { res, isAuthenticated } = useSelector(state => state.auth.login)
  const stripeKey = useSelector(state => state.payment.stripeKey.stripeApiKey)
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
        <ProtectedRoute exact path='/success' component={PaymentSuccess} />
        <ProtectedRoute exact path='/order/:id' component={OrderAction} />
        <ProtectedRoute exact path='/orders/me' component={ListOrders} />


        <Route exact path='/register' component={Register} />
        <ProtectedRoute exact isAdmin={true} path="/dashboard" component={Dashboard} />
        <ProtectedRoute exact isAdmin={true} path="/admin/products" component={ProductsList} />
        <ProtectedRoute exact isAdmin={true} path="/admin/product/new" component={NewProduct} />
        <ProtectedRoute exact isAdmin={true} path="/admin/product/update/:id" component={UpdateProduct} />
        <ProtectedRoute exact isAdmin={true} path="/admin/orders" component={Orders} />
        <ProtectedRoute exact isAdmin={true} path="/admin/order/:id" component={OrderStatus} />
        <ProtectedRoute exact isAdmin={true} path="/admin/users" component={Users} />

        {stripeKey &&
          <Elements stripe={loadStripe(stripeKey)}>
            <ProtectedRoute exact path="/payment" component={Payment} />
          </Elements>
        }
      </Switch>
      <Footer />
    </Router>
  );
}


export default App;

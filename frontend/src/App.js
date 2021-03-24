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

function App() {

  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/about' component={About} />
        <Route exact path='/contact' component={Contact} />
        <Route exact path='/products' component={Products} />
        <Route exact path='/search/:keyword' component={SearchResult} />
        <Route exact path='/product/:id' component={ProductDetails} />
        <Route exact path='/auth' component={Auth} />
      </Switch>
      <Footer />
    </Router>
  );
}


export default App;

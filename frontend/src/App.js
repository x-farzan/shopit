import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './components/shopIT/Home';
import About from './components/pages/About'
import Products from './components/shopIT/Products';
import './App.css'
import ProductDetail from './components/shopIT/ProductDetail';

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/about' component={About} />
        <Route exact path='/products' component={Products} />
        <Route exact path='/product/:id' component={ProductDetail} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;

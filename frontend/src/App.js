import './App.css';
import Footer from './components/pages/Footer';
import Navbar from './components/pages/Navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import About from './components/pages/About';
import Contact from './components/pages/Contact';
import NotFound from './components/pages/NotFound';
import Home from './components/pages/Home';
import Products from './components/layout/Products';

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/about' component={About} />
        <Route exact path='/contact' component={Contact} />
        <Route exact path='/products' component={Products} />
        <Route component={NotFound} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;

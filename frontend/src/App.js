import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './components/shopIT/Home';

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path='/' component={Home} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;

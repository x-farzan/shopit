import './App.css';
import { BrowserRouter as Router, Switch } from "react-router-dom"
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

function App() {
  return (
    <Router>
      <Header />
      <Switch>

      </Switch>
      <Footer />
    </Router>
  );
}

export default App;

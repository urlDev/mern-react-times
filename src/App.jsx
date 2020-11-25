import { Route, Switch } from 'react-router-dom';

import Home from './components/home/Home';
import Nav from './components/nav/Nav';

import './App.css';

const App = () => {
  return (
    <div className="App">
      <Nav />
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </div>
  );
};

export default App;

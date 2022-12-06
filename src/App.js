import './App.css';
import NavigationBar from './component/NavigationBar';
import { BrowserRouter, Switch, Route} from "react-router-dom";
import Home from './pages/Home';
import Edit from './pages/Edit'
function App() {
  return (
    <div>
      <NavigationBar/>
      <BrowserRouter>
      <main>
        <Switch>
          <Route path="/" component={Home} exact/>
          <Route path="/edit/:id" component={Edit} exact/>
          </Switch>
          </main>
          </BrowserRouter>
    </div>
  );
}

export default App;

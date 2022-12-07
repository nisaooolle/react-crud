import './App.css';
import NavigationBar from './component/NavigationBar';
import { BrowserRouter, Switch, Route} from "react-router-dom";
import Home from './pages/Home';
import Edit from './pages/Edit'
import Login from './pages/Login';
function App() {
  return (
    <div>
      <NavigationBar/>
      <BrowserRouter> {/* untuk menjaga UI tetap sinkron dengan URL. */}
      <main>
        <Switch> {/* switch untuk merender rute secara eksklusif */}
          <Route path="/" component={Home} exact/>  {/* route untuk pengalihan sisi server */}
          <Route path="/edit/:id" component={Edit} exact/>
          <Route path="/login" component={Login} exact/>
          </Switch>
          </main>
          </BrowserRouter>
    </div>
  );
}

export default App;

import './App.css';
import  {Home}  from './views/home/Home';
import {Landing} from './views/landing/Landing';
import {Details} from './views/details/Details';
import {Favorites} from './views/favorites/Favorites'
import{NewUser} from './views/newUser/NewUser'
import {Route, Switch} from 'react-router-dom';
import{ NewDog} from './views/NewDog/NewDog';


function App() {
  return (
    <div className='container'>
      <Switch>
      <Route exact path="/" ><Landing /></Route>
      <Route path="/home"><Home /></Route>
      <Route path="/details/:id"><Details /></Route>
      <Route path="/favorites"><Favorites /></Route>
      <Route path="/newuser"><NewUser /></Route>
      <Route path="/newdog"><NewDog /></Route>
      </Switch>
    </div>
  );
}

export default App;

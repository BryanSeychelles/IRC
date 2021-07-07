import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faBars, faCheck, faComments, faTimes, faWrench } from '@fortawesome/free-solid-svg-icons'

import {Chat} from './Component/Chat'
import {Menu} from './Component/navbar'
import {PageHome} from './Component/Home'

library.add(fab, faBars, faTimes, faWrench, faComments,faCheck)

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path='/chatroom'>
            <Menu/>
            <Chat/>
          </Route>
          <Route exact path='/'>
            <PageHome/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

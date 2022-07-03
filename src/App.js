import './App.css';
import Home from './Components/Home/Home';
import { UserProvider } from './Contexts/UserContext';
import UserPool from './UserPool';

function App() {
  return (
    <UserProvider>
      <Home/>
    </UserProvider>
  );
}

export default App;


import './App.css';
import {ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import Mainroute from './Components/Mainroute';
import UserProfile from './pages/userProfile';





function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Mainroute/> 
      
      
    </div>
  );
}

export default App;

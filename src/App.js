
import './App.css';
import {ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import './index.css'
import Mainroute from './Components/Mainroute';
import axios from 'axios';






function App() {
  

  return (
    <div className="App">
      <ToastContainer />
      <Mainroute/> 
      
      
    </div>
  );
}

export default App;

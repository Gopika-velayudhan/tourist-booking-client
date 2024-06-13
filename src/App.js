
import './App.css';
import {ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import './index.css'
import Mainroute from './Components/Mainroute';







function App() {
  

  return (
    <div className="App">
      <ToastContainer autoClose={1000} />
      <Mainroute/> 
      
      
    </div>
  );
}

export default App;

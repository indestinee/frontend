import {Route, Routes} from 'react-router-dom';
import Navigation from './components/navigation';
import Home from './pages/home';
import Paste from './pages/paste';
import Wifi from './pages/wifi';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div>
      <Navigation/>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/wifi" element={<Wifi />}/>
        <Route path="/paste" element={<Paste />}/>
      </Routes>
    </div>
  );
}

export default App;

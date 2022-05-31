import {Route, Routes} from 'react-router-dom';
import Home from './pages/home';
import Paste from './pages/paste';
import Wifi from './pages/wifi';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/wifi" element={<Wifi />}/>
        <Route path="/paste" element={<Paste />}/>
      </Routes>
    </div>
  );
}

export default App;

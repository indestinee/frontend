import {Route, Routes} from 'react-router-dom';
import Navigation from './components/navigation';
import Home from './pages/home';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import ToolBox from './pages/toolbox';
import Paste from './pages/paste';
import Wifi from './pages/wifi';
import {Branch, currentBranch} from './utils/branch/currentBranch';

function App() {
  return (
    <div>
      <Navigation/>
      <div className="app-container container">
        <div style={{marginTop: '1rem'}}></div>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/toolbox" element={<ToolBox/>}/>
          {
            currentBranch == Branch.ROUTER &&
            <>
              <Route path="/wifi" element={<Wifi />}/>
              <Route path="/paste" element={<Paste />}/>
            </>
          }
        </Routes>
      </div>
    </div>
  );
}

export default App;

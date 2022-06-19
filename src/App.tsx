import {Route, Routes} from 'react-router-dom';
import Navigation from './components/navigation';
import Home from './pages/home';
import Paste from './pages/paste';
import Wifi from './pages/wifi';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import ToolBox from './pages/toolbox';
import {Branch, currentBranch} from './utils/branch/currentBranch';
import Announcement from './components/announcement';
import {Spacing} from './components/spacing';

function App() {
  return (
    <div>
      <Navigation/>
      <div className="app-container container">
        <Announcement />
        <Spacing marginTop='1rem' />
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

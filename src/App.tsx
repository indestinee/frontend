import {Route, Routes} from 'react-router-dom';
import Navigation from './components/navigation';
import Home from './pages/home';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import ToolBox from './pages/toolbox';

function App() {
  return (
    <div>
      <Navigation/>
      <div className="app-container container">
        <div style={{marginTop: '1rem'}}></div>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/toolbox" element={<ToolBox/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;

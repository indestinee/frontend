import {Route, Routes} from 'react-router-dom';
import Navigation from './components/navigation';
import Home from './pages/home';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <div>
      <Navigation/>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;

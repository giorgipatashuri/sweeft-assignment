import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DetailsPage from './pages/DetailsPage/DetailsPage';

import Home from './pages/Home/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/user/:id' element={<DetailsPage />} />
      </Routes>
    </Router>
  );
}

export default App;

import {Routes, Route, BrowserRouter as Router} from 'react-router-dom'
import Main from './Pages/MainPage';
import Unauthorized from './Pages/Unauthorized';
import ProtectedRoute from './Context/Protected';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';


// https://stackoverflow.com/questions/70743498/role-based-react-router
function App() {
  return (
    
      <Router>
        <Routes>

          <Route exact path="/" element={<Main />} />
          
          <Route exact path="/login" element={<ProtectedRoute />}>
            <Route exact path="/login" element={<LoginPage />} />
          </Route>
          
          
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </Router>
    
  );
}

export default App;

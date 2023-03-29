import {Routes, Route, BrowserRouter as Router} from 'react-router-dom'
import Main from './Pages/MainPage';
import Unauthorized from './Pages/Unauthorized';
import ProtectedLogin from './Context/ProtectedLogin';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import CreateReservation from './Pages/CreateReservation';
import EditProfile from './Pages/EditProfile';
import ProtectedCustomer from './Context/ProtectedCustomer';
import MyReservations from './Pages/MyReservations';

// https://stackoverflow.com/questions/70743498/role-based-react-router
function App() {
  return (
    
      <Router>
        <Routes>
          
          <Route exact path="/" element={<Main />} />
          <Route exact path="/createreservation" element={<CreateReservation />} />
          
          <Route exact path="/editprofile" element={<ProtectedCustomer />}>
            <Route exact path="/editprofile" element={<EditProfile />} />
          </Route>

          <Route exact path="/myreservations" element={<ProtectedCustomer />}>
            <Route exact path="/myreservations" element={<MyReservations />} />
          </Route>

          <Route exact path="/login" element={<ProtectedLogin />}>
            <Route exact path="/login" element={<LoginPage />} />
          </Route>
          
          <Route exact path="/register" element={<ProtectedLogin />}>
            <Route path="/register" element={<RegisterPage />} />
          </Route>
        </Routes>
      </Router>
    
  );
}

export default App;

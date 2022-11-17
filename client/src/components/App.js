import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';
import Layout from './Layout';
import Details from './pages/Details';
import Employee from './pages/Employee';
import Error from './pages/Error';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import './styles/App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Layout>
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route path='/signup' element={<Signup />} />
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/employee' element={<Employee />} />
            <Route exact path='/details/:id' element={<Details />} />
            <Route path="*" element={<Error />}></Route>
          </Routes>
        </Layout>
      </AuthProvider>
    </Router>
  );
}

export default App;

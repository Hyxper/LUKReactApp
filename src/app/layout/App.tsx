import './styles.css'
import Head from './Helmet';
import NavBar from './Navbar';
import SideMenu from './Sidemenu';
import DriverSearch from './Driversearch';
import HoldingPage from '../../pages/Holding';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const Home = () => <HoldingPage message="Home Page"/>;
const Vehicles = () => <HoldingPage message="Vehicles Page" />;
const About = () => <HoldingPage message="About Page" />;

const App = () => {
  return (
    <Router>
      <Head />
      <NavBar />
      <div className="app-container">
        <div className="side-menu-container">
          <SideMenu />
        </div>
        <div className="main-content">
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/vehicles" element={<Vehicles />} />
            <Route path="/about" element={<About />} />
            <Route path="/drivers" element={<DriverSearch />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ListTechnicians from './ListTechnicians';
import TechnicianForm from './TechnicianForm';
import AppointmentFrom from './CreateServiceAppointment';
import ListAppointments from './ListAppointments';
import ServiceHistory from './ServiceHistory';
import ListManufacturers from './ListManufacturers';
import CreateManufacturerForm from './CreateManufacturerFrom';


function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/technicians" element={<ListTechnicians />} />
          <Route path="/technicians/new" element={<TechnicianForm />}/>
          <Route path="/appointments/" element={<ListAppointments />}/>
          <Route path="/appointments/new" element={<AppointmentFrom />}/>
          <Route path="/appointments/history" element={<ServiceHistory />}/>
          <Route path="/manufacturers" element={<ListManufacturers />}/>
          <Route path="/manufacturers/new" element={<CreateManufacturerForm />}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

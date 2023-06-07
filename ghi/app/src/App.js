import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";
import Nav from "./Nav";
import ListTechnicians from "./ListTechnicians";
import TechnicianForm from "./TechnicianForm";
import AppointmentFrom from "./CreateServiceAppointment";
import ListAppointments from "./ListAppointments";
import ServiceHistory from "./ServiceHistory";
import ListManufacturers from "./ListManufacturers";
import CreateManufacturerForm from "./CreateManufacturerFrom";
import SalespeopleList from "./SalespeopleList";
import CreateSalespersonForm from "./CreateSalespersonForm";
import CustomersList from "./CustomersList";
import CreateCustomerForm from "./CreateCustomerForm";
import SalesList from "./SalesList";
import CreateSaleForm from "./CreateSaleForm";
import SalespersonHistory from "./SalesPersonHistory";
import ModelsList from "./ModelsList";
import CreateModelForm from "./CreateModelForm";

function App() {
	return (
		<BrowserRouter>
			<Nav />
			<div className="container">
				<Routes>
					<Route path="/" element={<MainPage />} />
					<Route path="/technicians" element={<ListTechnicians />} />
					<Route path="/technicians/new" element={<TechnicianForm />} />
					<Route path="/appointments/" element={<ListAppointments />} />
					<Route path="/appointments/new" element={<AppointmentFrom />} />
					<Route path="/appointments/history" element={<ServiceHistory />} />
					<Route path="/manufacturers" element={<ListManufacturers />} />
					<Route
						path="/manufacturers/new"
						element={<CreateManufacturerForm />}
					/>
					<Route path="salespeople">
						<Route index element={<SalespeopleList />} />
						<Route path="create" element={<CreateSalespersonForm />} />
					</Route>
					<Route path="customers">
						<Route index element={<CustomersList />} />
						<Route path="add" element={<CreateCustomerForm />} />
					</Route>
					<Route path="sales">
						<Route index element={<SalesList />} />
						<Route path="create" element={<CreateSaleForm />} />
						<Route path="history" element={<SalespersonHistory />} />
					</Route>
					<Route path="models">
						<Route index element={<ModelsList />} />
						<Route path="create" element={<CreateModelForm />} />
					</Route>
				</Routes>
			</div>
		</BrowserRouter>
	);
}
export default App;

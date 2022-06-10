import "./App.css";
import { Routes, Route, Navigate } from "react-router";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Pizza from "./components/Pizza/Pizza";
import Cart from "./components/Cart/Cart";
import AdminPage from "./pages/Admin/AdminPage";
import Orders from "./pages/Orders/OrdersPage";
import TagManagerPage from "./pages/TagManager/TagManager";
import EditPizza from "./pages/EditPizza/EditPizza";
import Dashboard from "./pages/Dashboard/Dashboard";


function App() {
  return (
    <div className="App">
       <Cart />
       <Header />
      <Navbar />
      <Routes>
        {/* user routes */}
        <Route path="pizza" element={<Home />}></Route>
        <Route path="pizza/:pizzaName" element={<Pizza />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        {/* admin routes */}
        <Route path="edit/:id" element={<EditPizza/>}></Route>
        <Route path="edit"  element={<Home admin="true"/>}></Route>
        <Route path="admin" element={<AdminPage/>} />
        <Route path="tag-manager" element={<TagManagerPage/>} />
        <Route path="orders" element={<Orders/>} />

        <Route path="dashboard" element={<Dashboard/>} />

        {/* default route */}
        <Route path="*" element={<Navigate to="/pizza" replace />} />

      </Routes>
      <Footer />
    </div>
  );
}

export default App;

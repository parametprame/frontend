import Navbar from "./components/Navbar";
import { LoginPage } from "./pages/Login";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { PartyList } from "./pages/PartyList";
import { Register } from "./pages/Register";
import { CreateParty } from "./pages/CreateParty"
import { DetailParty } from "./pages/DetailParty";
import { MyParties } from "./pages/Myparties";
import { EditParty } from "./pages/EditParty";

function App() {

  const token = localStorage.getItem('token');

  return (
    <>
      {!token ? null : <Navbar/>}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PartyList />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/create" element={<CreateParty />} />
          <Route path="/party/:id" element={<DetailParty />} />
          <Route path="/myparty" element={<MyParties />} />
          <Route path="/edit/:id" element={<EditParty />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

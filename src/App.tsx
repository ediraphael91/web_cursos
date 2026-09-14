import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Body from "./components/Body";
import CursoForm from "./pages/CursoForm";
import CrearCursos from "./components/CrearCursos";
import CrearUsuarios from "./components/CrearUsuarios";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Body />} />
          <Route path="/cursos/nuevo" element={<CursoForm />} />          
          <Route path="/cursos/crear" element={<CrearCursos/>} />
          <Route path="/usuarios" element={<CrearUsuarios/>} />
        </Route>
      </Routes>
      <Toaster position="top-right" reverseOrder={false} />
    </BrowserRouter>
  );
}
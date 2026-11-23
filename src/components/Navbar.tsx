import React, {useState} from "react";
import { Link} from "react-router-dom";
import logo from "../assets/lideex.png";

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);
  
  return (
    <nav className="fixed top-0 w-full bg-gradient-to-r from-emerald-900 to-emerald-900 text-white shadow-md z-50">
      <div className="container mx-auto flex justify-between items-center px-6 py-3">
        
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img src={logo} alt="Logo LIDEEX" className="h-10 w-auto" />
          <span className="text-xl font-bold tracking-wide"></span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="hover:text-yellow-300">Inicio</Link>
          <Link to="/cursos/crear" className="hover:text-yellow-300">Crear Cursos</Link>
          <Link to="/usuarios" className="hover:text-yellow-300">Crear Usuarios</Link>
        {/* Botón de Iniciar Sesión */}
          <Link
            to="/login" className=" border border-white  font-medium rounded-xl px-4 py-1.5 hover:border-yellow-400 hover:text-yellow-400  transition-colors duration-300"
            >Iniciar sesión
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      {/* Mobile links */}
      {open && (
        <div className="md:hidden bg-emerald-800 px-6 py-4 space-y-2">
          <Link to="/" className="block hover:text-yellow-300">Inicio</Link>
          <Link to="/cursos/crear" className="block hover:text-yellow-300">Crear Cursos</Link>
          <Link to="/usuarios" className="block hover:text-yellow-300">Crear Usuarios</Link>
          <Link
            to="/login" className="border-2 border-white  font-medium rounded-xl px-1 py-1 hover:border-yellow-400 hover:text-yellow-400  transition-colors duration-300"
            >Iniciar sesión
          </Link>
        </div>
      )}     
    </nav>
  );
};

export default Navbar;
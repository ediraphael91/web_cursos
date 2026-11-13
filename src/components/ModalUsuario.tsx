import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { type Usuario } from "../types/Usuario";

interface ModalUsuarioProps {
  onClose: () => void;
  onCreated: () => void;
  usuario?: Usuario | null; // si viene, el modal entra en modo edición
}

const ModalUsuario: React.FC<ModalUsuarioProps> = ({ onClose, onCreated, usuario }) => {
  const esEdicion = !!usuario;

  const [nombre, setNombre] = useState(usuario?.nombre ?? "");
  const [apellido, setApellido] = useState(usuario?.apellido ?? "");
  const [profesion, setProfesion] = useState(usuario?.profesion ?? "");
  const [correo, setCorreo] = useState(usuario?.correo ?? "");
  const [contacto, setContacto] = useState(usuario?.contacto ?? "");
  const [fechaCumpleano, setFechaCumpleano] = useState(
    usuario?.fechaCumpleano ? usuario.fechaCumpleano.substring(0, 10) : ""
  );
  const [rol, setRol] = useState(usuario?.rol ?? "");
  const [clave, setClave] = useState(""); // nunca se precarga, ni en edición
  const [estado, setEstado] = useState(usuario?.estado ?? true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const body: Record<string, unknown> = {
      nombre,
      apellido,
      profesion,
      correo,
      contacto,
      fechaCumpleano,
      estado,
    };

    // Solo se envía la clave si el usuario escribió una nueva
    if (clave.trim() !== "") {
      body.clave = clave;
    }

    const url = esEdicion
      ? `http://localhost:8080/usuarios/actualizar/${usuario!.idUsuario}`
      : "http://localhost:8080/usuarios/crear";
    const method = esEdicion ? "PUT" : "POST";

    await toast.promise(
      fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }).then(async (res) => {
        if (!res.ok) throw new Error("Error al guardar usuario");
        return res.json();
      }),
      {
        loading: esEdicion ? "Actualizando usuario..." : "Guardando usuario...",
        success: <b>{esEdicion ? "Usuario actualizado con éxito" : "Usuario creado con éxito"}</b>,
        error: <b>{esEdicion ? "No se pudo actualizar el usuario" : "No se pudo crear el usuario"}</b>,
      }
    );

    onCreated();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto space-y-5"
      >
        <h2 className="text-2xl font-bold text-emerald-800 mb-2">
          {esEdicion ? "Editar Usuario" : "Crear Usuario"}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
            <input
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Nombre"
              className="w-full border rounded-lg px-3 py-2 border-gray-300 focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Apellido</label>
            <input
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
              placeholder="Apellido"
              className="w-full border rounded-lg px-3 py-2 border-gray-300 focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700 outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Profesión</label>
            <input
              value={profesion}
              onChange={(e) => setProfesion(e.target.value)}
              placeholder="Profesión"
              className="w-full border rounded-lg px-3 py-2 border-gray-300 focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Correo</label>
            <input
              type="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              placeholder="correo@ejemplo.com"
              className="w-full border rounded-lg px-3 py-2 border-gray-300 focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700 outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Contacto</label>
            <input
              value={contacto}
              onChange={(e) => setContacto(e.target.value)}
              placeholder="Teléfono"
              className="w-full border rounded-lg px-3 py-2 border-gray-300 focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de nacimiento</label>
            <input
              type="date"
              value={fechaCumpleano}
              onChange={(e) => setFechaCumpleano(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 border-gray-300 focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700 outline-none"
            />
          </div>           
        </div>
         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Rol</label>
            <select
              value={rol}
              onChange={(e) => setRol(e.target.value)}             
              className="w-full border rounded-lg px-3 py-2 border-gray-300 focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700 outline-none" 
              >
                <option value="" disabled>
                Selecciona un rol
                </option>              
              <option value="admin">Administrador</option>
              <option value="usuario">Usuario</option>
              <option value="invitado">Invitado</option>
              </select>
          </div>                     
        </div>

        {/* Clave: ancho completo, nunca precargada */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Clave {esEdicion && <span className="text-gray-400 font-normal">(dejar vacío para no cambiarla)</span>}
          </label>
          <input
            type="password"
            value={clave}
            onChange={(e) => setClave(e.target.value)}
            placeholder={esEdicion ? "••••••••" : "Clave"}
            className="w-full border rounded-lg px-3 py-2 border-gray-300 focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700 outline-none"
          />
        </div>

        <div className="flex items-center justify-between border-t pt-4">
          <label htmlFor="estado" className="font-medium text-gray-700">Estado</label>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              id="estado"
              checked={estado}
              onChange={(e) => setEstado(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-emerald-600 transition"></div>
            <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow peer-checked:translate-x-5 transition"></div>
          </label>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button type="button" onClick={onClose} className="px-5 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition">
            Cancelar
          </button>
          <button type="submit" className="px-5 py-2 bg-emerald-800 text-white rounded-lg hover:bg-emerald-900 transition">
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
};

export default ModalUsuario;
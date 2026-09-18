import React, { useState } from "react";
import { type Usuario } from "../types/Usuario";
import ModalUsuario from "../components/ModalUsuario";
import Paginador from "../components/Paginador";
import SelectorTamanoPagina from "../components/SelectorTamanoPagina";
import { usePaginacion } from "../hooks/usePaginacion";
import { formatShortDate } from "../utils/date";
import { TrashIcon, PencilSquareIcon, UserPlusIcon } from '@heroicons/react/24/solid';
import Swal from "sweetalert2";

const ListaUsuarios: React.FC = () => {
  const {
    items: usuarios,
    paginaActual,
    setPaginaActual,
    tamanoPagina,
    cambiarTamanoPagina,
    totalPaginas,
    totalElementos,
    error,
    recargar: cargarUsuarios,
  } = usePaginacion<Usuario>("http://localhost:8080/usuarios/listar/paginado", 5);

  const [showModal, setShowModal] = useState(false);
  const [usuarioEditar, setUsuarioEditar] = useState<Usuario | null>(null);

  const abrirCrear = () => {
    setUsuarioEditar(null);
    setShowModal(true);
  };

  const abrirEditar = (usuario: Usuario) => {
    setUsuarioEditar(usuario);
    setShowModal(true);
  };

  const cerrarModal = () => {
    setShowModal(false);
    setUsuarioEditar(null);
  };

  const eliminarUsuario = async (id: number) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Este usuario será eliminado",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar"
    });

    if (!result.isConfirmed) return;

    try {
      const response = await fetch(`http://localhost:8080/usuarios/eliminar/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
      });

      if (response.status === 204 || response.ok) {
        await Swal.fire("Eliminado", "El usuario ha sido eliminado", "success");

        if (usuarios.length === 1 && paginaActual > 1) {
          setPaginaActual((p) => p - 1);
        } else {
          cargarUsuarios(paginaActual, tamanoPagina);
        }
        return;
      }

      const errorText = await response.text();
      throw new Error(`Error al eliminar usuario: ${response.status} - ${errorText}`);
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "No se pudo eliminar el usuario", "error");
    }
  };

  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="flex justify-end mb-6">
        <button title="Crear Nuevo Usuario"
          onClick={abrirCrear}
          className="text-emerald-500 hover:text-emerald-800 p-2 rounded-md hover:bg-emerald-50 transition-colors"
        >Crear
          <UserPlusIcon className="h-10 w-10 inline-block mr-6" />
        </button>
      </div>

      {showModal && (
        <ModalUsuario
          key={usuarioEditar?.idUsuario ?? "nuevo"}
          onClose={cerrarModal}
          onCreated={() => cargarUsuarios(paginaActual, tamanoPagina)}
          usuario={usuarioEditar}
        />
      )}

      {usuarios.length === 0 ? (
        <p className="text-gray-500">No hay usuarios disponibles.</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl shadow-md">
          <div className="flex justify-between items-center px-6 py-3">
            <span className="text-sm text-gray-500">
              {totalElementos} usuario{totalElementos !== 1 ? "s" : ""} en total
            </span>
            <SelectorTamanoPagina
              tamanoPagina={tamanoPagina}
              onCambiar={cambiarTamanoPagina}
            />
          </div>

          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-taupe-500 text-white">
                <th className="px-6 py-3 text-left">Nombre</th>
                <th className="px-6 py-3 text-left">Apellido</th>
                <th className="px-6 py-3 text-left">Profesión</th>
                <th className="px-6 py-3 text-left">Correo</th>
                <th className="px-6 py-3 text-left">Contacto</th>
                <th className="px-6 py-3 text-left">F. Nacimiento</th>
                <th className="px-6 py-3 text-left">Estado</th>
                <th className="px-6 py-3 text-left">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((usuario, index) => (
                <tr key={usuario.idUsuario} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                  <td className="px-6 py-4">{usuario.nombre}</td>
                  <td className="px-6 py-4">{usuario.apellido}</td>
                  <td className="px-6 py-4">{usuario.profesion}</td>
                  <td className="px-6 py-4">{usuario.correo}</td>
                  <td className="px-6 py-4">{usuario.contacto}</td>
                  <td className="px-6 py-4">{formatShortDate(usuario.fechaCumpleano)}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        usuario.estado ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                      }`}
                    >
                      {usuario.estado ? "Activo" : "Inactivo"}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex gap-3">
                    <button
                      onClick={() => abrirEditar(usuario)}
                      className="text-amber-600 hover:text-amber-800"
                      title="Editar Usuario">
                      <PencilSquareIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => eliminarUsuario(usuario.idUsuario)}
                      className="text-red-600 hover:text-red-800 p-1 rounded-md hover:bg-red-50 transition-colors"
                      title="Eliminar Usuario">
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <Paginador
            paginaActual={paginaActual}
            totalPaginas={totalPaginas}
            onCambiarPagina={setPaginaActual}
          />
        </div>
      )}
    </div>
  );
};

export default ListaUsuarios;
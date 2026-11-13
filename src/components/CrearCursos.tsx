import React, { useState } from "react";
import { type Curso } from "../types/Curso";
import ModalCurso from "../components/ModalCurso";
import Paginador from "../components/Paginador";
import SelectorTamanoPagina from "../components/SelectorTamanoPagina";
import { usePaginacion } from "../hooks/usePaginacion";
import { formatShortDate } from "../utils/date";
import { TrashIcon, PencilSquareIcon, DocumentArrowUpIcon } from '@heroicons/react/24/solid';
import Swal from "sweetalert2";

const CrearCursos: React.FC = () => {
  const {
    items: cursos,
    paginaActual,
    setPaginaActual,
    tamanoPagina,
    cambiarTamanoPagina,
    totalPaginas,
    totalElementos,
    error,
    recargar: cargarCursos,
  } = usePaginacion<Curso>("http://localhost:8080/cursos/listar/paginado", 5);

  const [showModal, setShowModal] = useState(false);
  const [cursoEditar, setCursoEditar] = useState<Curso | null>(null);

  const abrirCrear = () => {
    setCursoEditar(null);
    setShowModal(true);
  };

  const abrirEditar = (curso: Curso) => {
    setCursoEditar(curso);
    setShowModal(true);
  };

  const cerrarModal = () => {
    setShowModal(false);
    setCursoEditar(null);
  };

  // Borrado lógico desde la API
  const eliminarCurso = async (id: number) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Este curso será eliminado",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar"
    });

    if (!result.isConfirmed) return;

    try {
      const response = await fetch(`http://localhost:8080/cursos/eliminar/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (response.status === 204) {
        await Swal.fire("Eliminado", "El curso ha sido eliminado", "success");

        // Si era el único curso de la página (y no es la primera), retrocede una página
        if (cursos.length === 1 && paginaActual > 1) {
          setPaginaActual((p) => p - 1);
        } else {
          cargarCursos(paginaActual, tamanoPagina);
        }
        return;
      }

      const errorText = await response.text();
      throw new Error(`Error al eliminar curso: ${response.status} - ${errorText}`);
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "No se pudo eliminar el curso", "error");
    }
  };

  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="flex justify-end mb-6">
        <button title="Crear Nuevo Curso"
          onClick={abrirCrear}
          className="text-emerald-500 hover:text-emerald-800 p-2 rounded-md hover:bg-emerald-50 transition-colors"
        >Crear
          <DocumentArrowUpIcon className="h-10 w-10 inline-block mr-6" />
        </button>
      </div>

      {showModal && (
        <ModalCurso
          key={cursoEditar?.idCurso ?? "nuevo"}
          onClose={cerrarModal}
          onCreated={() => cargarCursos(paginaActual, tamanoPagina)}
          curso={cursoEditar}
        />
      )}

      {cursos.length === 0 ? (
        <p className="text-gray-500">No hay cursos disponibles.</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl shadow-md">
          <div className="flex justify-between items-center px-6 py-3">
            <span className="text-sm text-gray-500">
              {totalElementos} curso{totalElementos !== 1 ? "s" : ""} en total
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
                <th className="px-6 py-3 text-left">Categoría</th>
                <th className="px-6 py-3 text-left">Modalidad</th>
                <th className="px-6 py-3 text-left">Inicio</th>
                <th className="px-6 py-3 text-left">Fin</th>
                <th className="px-6 py-3 text-left">Precio</th>
                <th className="px-6 py-3 text-left">Estado</th>
                <th className="px-6 py-3 text-left">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {cursos.map((curso, index) => (
                <tr key={curso.idCurso} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                  <td className="px-6 py-4">{curso.nombre}</td>
                  <td className="px-6 py-4">{curso.categoria}</td>
                  <td className="px-6 py-4">{curso.modalidad}</td>
                  <td className="px-6 py-4">{formatShortDate(curso.fechaInicio)}</td>
                  <td className="px-6 py-4">{formatShortDate(curso.fechaFin)}</td>
                  <td className="px-6 py-4">${curso.precio.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        curso.estado ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                      }`}
                    >
                      {curso.estado ? "Activo" : "Inactivo"}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex gap-3">
                    <button
                      onClick={() => abrirEditar(curso)}
                      className="text-amber-600 hover:text-amber-800"
                      title="Editar Curso">
                      <PencilSquareIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => eliminarCurso(curso.idCurso)}
                      className="text-red-600 hover:text-red-800 p-1 rounded-md hover:bg-red-50 transition-colors"
                      title="Eliminar Curso">
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

export default CrearCursos;
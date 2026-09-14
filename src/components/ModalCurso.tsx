import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { type Curso } from "../types/Curso";

interface ModalCursoProps {
  onClose: () => void;
  onCreated: () => void; // callback para refrescar lista
  curso?: Curso | null;   // si viene, el modal entra en modo edición
}

const ModalCurso: React.FC<ModalCursoProps> = ({ onClose, onCreated, curso }) => {
  const esEdicion = !!curso;

  const [nombre, setNombre] = useState(curso?.nombre ?? "");
  const [categoria, setCategoria] = useState(curso?.categoria ?? "");
  const [descripcion, setDescripcion] = useState(curso?.descripcion ?? "");
  const [modalidad, setModalidad] = useState(curso?.modalidad ?? "");
  const [precio, setPrecio] = useState(curso?.precio ?? 0);
  const [fechaInicio, setFechaInicio] = useState(
    curso?.fechaInicio ? curso.fechaInicio.substring(0, 10) : ""
  );
  const [fechaFin, setFechaFin] = useState(
    curso?.fechaFin ? curso.fechaFin.substring(0, 10) : ""
  );
  const [imagen, setImagen] = useState<File | null>(null);
  const [estado, setEstado] = useState(curso?.estado ?? true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("categoria", categoria);
    formData.append("descripcion", descripcion);
    formData.append("modalidad", modalidad);
    formData.append("fechaInicio", fechaInicio);
    formData.append("fechaFin", fechaFin);
    formData.append("precio", precio.toString());
    formData.append("estado", estado ? "true" : "false");
    if (imagen) formData.append("imagen", imagen);

    const url = esEdicion
      ? `http://localhost:8080/cursos/actualizar/${curso!.idCurso}`
      : "http://localhost:8080/cursos/crear";
    const method = esEdicion ? "PUT" : "POST";

    await toast.promise(
      fetch(url, {
        method,
        body: formData,
      }).then(async (res) => {
        if (!res.ok) throw new Error("Error al guardar curso");
        return res.json();
      }),
      {
        loading: esEdicion ? "Actualizando curso..." : "Guardando curso...",
        success: <b>{esEdicion ? "Curso actualizado con éxito" : "Curso creado con éxito"}</b>,
        error: <b>{esEdicion ? "No se pudo actualizar el curso" : "No se pudo crear el curso"}</b>,
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
          {esEdicion ? "Editar Curso" : "Crear Curso"}
        </h2>

        {/* Fila 1: Nombre / Categoría */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
            <input
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Nombre del curso"
              className="w-full border rounded-lg px-3 py-2 border-gray-300 focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
            <input
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              placeholder="Categoría"
              className="w-full border rounded-lg px-3 py-2 border-gray-300 focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700 outline-none"
            />
          </div>
        </div>

        {/* Fila 2: Modalidad / Precio */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Modalidad</label>
            <input
              value={modalidad}
              onChange={(e) => setModalidad(e.target.value)}
              placeholder="Modalidad"
              className="w-full border rounded-lg px-3 py-2 border-gray-300 focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Precio</label>
            <input
              type="number"
              value={precio}
              onChange={(e) => setPrecio(Number(e.target.value))}
              placeholder="Precio"
              className="w-full border rounded-lg px-3 py-2 border-gray-300 focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700 outline-none"
            />
          </div>
        </div>

        {/* Fila 3: Fecha inicio / Fecha fin */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Fecha inicio</label>
            <input
              type="date"
              name="fechaInicio"
              value={fechaInicio}
              onChange={(e) => setFechaInicio(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 border-gray-300 focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Fecha fin</label>
            <input
              type="date"
              name="fechaFin"
              value={fechaFin}
              onChange={(e) => setFechaFin(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 border-gray-300 focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700 outline-none"
            />
          </div>
        </div>

        {/* Descripción: ancho completo */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            placeholder="Descripción del curso"
            rows={3}
            className="w-full border rounded-lg px-3 py-2 border-gray-300 focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700 outline-none resize-none"
          />
        </div>

        {/* Imagen: ancho completo */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Imagen</label>
          {esEdicion && curso?.imagen && !imagen && (
            <p className="text-xs text-gray-500 mb-1">
              Imagen actual asignada. Selecciona una nueva solo si deseas reemplazarla.
            </p>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImagen(e.target.files?.[0] || null)}
            className="w-full border rounded-lg px-3 py-2 border-gray-300 file:mr-3 file:py-1 file:px-3 file:rounded-md file:border-0 file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
          />
        </div>

        {/* Estado */}
        <div className="flex items-center justify-between border-t pt-4">
          <label htmlFor="estado" className="font-medium text-gray-700">
            Estado
          </label>
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

        {/* Botones */}
        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-5 py-2 bg-emerald-800 text-white rounded-lg hover:bg-emerald-900 transition"
          >
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
};

export default ModalCurso;
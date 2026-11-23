import type { Curso } from "../types/Curso";
import { formatShortDate } from "../utils/date";
import { formatPrecio } from "../utils/currency";

interface Props {
  curso: Curso;
}

export default function CursoCard({ curso }: Props) {
  const { nombre, descripcion, precio, categoria, modalidad, fechaInicio, fechaFin, imagen, estado } = curso;

  return (
    <article className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow max-w-xs mx-auto">
      <img src={imagen} alt={nombre} className="w-full h-80 object-contain bg-gray-100" />

      <div className="p-4 space-y-2">
        <h3 className="text-lg font-bold text-yellow-600">{nombre}</h3>
        <p className="text-gray-600 text-sm">{descripcion}</p>

        <div className="flex justify-between items-center mt-2">
          <span className="bg-green-200 text-green-800 px-2 py-1 rounded-full text-xs font-semibold">
            {formatPrecio(precio)}
          </span>
          <span
            className={`px-2 py-1 rounded-full text-xs font-semibold ${
              estado ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
            }`}
          >
            {estado ? "Activo" : "Inactivo"}
          </span>
        </div>

        <div className="text-sm text-gray-500 mt-2 space-y-1">
          <p>🎓 {categoria}</p>
          <p>📂 {modalidad}</p>
          <p>📅 Inicio: {formatShortDate(fechaInicio)}</p>
          <p>📅 Fin: {formatShortDate(fechaFin)}</p>
        </div>
      </div>
    </article>
  );
}
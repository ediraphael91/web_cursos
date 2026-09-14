import { useEffect, useState } from "react";

interface Curso {
  idCurso: number;
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: string;
  modalidad: string;
  fechaInicio: string;
  fechaFin: string;
  imagen: string;
  estado: boolean;
}

function CursosList() {
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:8080/cursos/listar")
      .then((res) => {
        if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);
        return res.json();
      })
      .then((data: Curso[]) => {
        console.log("Cursos recibidos:", data);
        setCursos(data);
      })
      .catch((err) => {
        console.error("Error cargando cursos:", err);
        setError("No se pudieron cargar los cursos");
      });
  }, []);

  if (error) {
    return <p className="text-red-600">{error}</p>;
  }

  if (cursos.length === 0) {
    return <p className="text-gray-500">No hay cursos disponibles</p>;
  }
  
//DISEÑO DE LA LISTA DE CURSOS
  return (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
    {cursos.map((c) => (
      <div
        key={c.idCurso}
        className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow max-w-xs mx-auto"
      >
        {/* Imagen */}
        <img
          src={c.imagen}
          alt={c.nombre}
          className="w-full h-80 object-contain bg-gray-100"
        />

        {/* Contenido DENTRO de la card */}
        <div className="p-4 space-y-2">

          <h3 className="text-lg font-bold text-yellow-600">
            {c.nombre}
          </h3>

          <p className="text-gray-600 text-sm">
            {c.descripcion}
          </p>

          <div className="flex justify-between items-center mt-2">
            <span className="bg-green-200 text-green-800 px-2 py-1 rounded-full text-xs font-semibold">
              💲 {c.precio}
            </span>

            <span
              className={`px-2 py-1 rounded-full text-xs font-semibold ${
                c.estado
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {c.estado ? "Activo" : "Inactivo"}
            </span>
          </div>

          <div className="text-sm text-gray-500 mt-2 space-y-1">
            <p>🎓 {c.categoria}</p>
            <p>📂 {c.modalidad}</p>

            <p>
              📅 Inicio:{" "}
              {new Date(c.fechaInicio).toLocaleDateString()}
            </p>

            <p>
              📅 Fin:{" "}
              {new Date(c.fechaFin).toLocaleDateString()}
            </p>
          </div>

        </div>
      </div>
    ))}
  </div>
);
}

export default CursosList;

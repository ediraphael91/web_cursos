import { useCursos } from "../hooks/useCursos";
import CursoCard from "./CursoCard";

export default function CursosList() {
  const { cursos, loading, error } = useCursos();

  if (loading) return <p className="text-gray-500">Cargando cursos...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (cursos.length === 0) return <p className="text-gray-500">No hay cursos disponibles</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cursos.map((curso) => (
        <CursoCard key={curso.idCurso} curso={curso} />
      ))}
    </div>
  );
}
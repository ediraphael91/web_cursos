import { useEffect, useState } from "react";
import type { Curso } from "../types/Curso";
import { listarCursos } from "../services/cursosService";

export function useCursos() {
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    listarCursos(controller.signal)
      .then(setCursos)
      .catch((err: unknown) => {
        if (err instanceof DOMException && err.name === "AbortError") return;
        console.error("Error cargando cursos:", err);
        setError("No se pudieron cargar los cursos");
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, []);

  return { cursos, loading, error };
}
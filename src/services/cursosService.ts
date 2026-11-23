import type { Curso } from "../types/Curso";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8080";

export async function listarCursos(signal?: AbortSignal): Promise<Curso[]> {
  const res = await fetch(`${API_URL}/cursos/listar`, { signal });
  if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);
  return res.json();
}
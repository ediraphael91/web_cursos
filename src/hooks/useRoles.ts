import { useEffect, useState } from "react";
import type { Rol } from "../types/Rol";
import { toast } from "react-hot-toast";

export function useRoles() {
  const [roles, setRoles] = useState<Rol[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    fetch("http://localhost:8080/roles", { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json() as Promise<Rol[]>;
      })
      .then((data) => setRoles(data.filter((r) => r.estado)))
      .catch((e) => {
        if (e.name !== "AbortError") toast.error("No se pudieron cargar los roles");
      })
      .finally(() => setCargando(false));

    return () => controller.abort();
  }, []);

  return { roles, cargando };
}
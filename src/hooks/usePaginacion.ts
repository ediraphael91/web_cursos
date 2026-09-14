import {useState, useEffect, useCallback} from "react";

interface PaginaResponse<T> {
    contenido: T[];
    totalElementos: number;
    totalPaginas: number;
    paginaActual: number;
    tamanoPagina: number;
}

export function usePaginacion<T>(urlBase: string, tamanoPaginaInicial: number = 5) {
    const [items, setItems] = useState<T[]>([]);
    const [paginaActual, setPaginaActual] = useState(1);
    const [tamanoPagina, setTamanoPagina] = useState(tamanoPaginaInicial);
    const [totalPaginas, setTotalPaginas] = useState(1);
    const [totalElementos, setTotalElementos] = useState(0);
    const [error, setError] = useState<string | null>(null);

    const cargar = useCallback((pagina: number = paginaActual, size: number = tamanoPagina) => {
        fetch(`${urlBase}?page=${pagina - 1}&size=${size}`)
        .then((res) => {
            if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);
            return res.json();
        })
        .then((data: PaginaResponse<T>) => {
            setItems(data.contenido);
            setTotalPaginas(data.totalPaginas || 1);
            setTotalElementos(data.totalElementos || 0);
            setError(null);
        })
        .catch(() => setError("No se pudo cargar la lista."));
     }, [urlBase]);

     useEffect(() => {
        cargar(paginaActual, tamanoPagina);
     }, [paginaActual, tamanoPagina]);

     const cambiarTamanoPagina = (nuevoTamano: number) => {
        setTamanoPagina(nuevoTamano);
        setPaginaActual(1);
     };

     return {
        items,
        paginaActual,
        setPaginaActual,
        tamanoPagina,
        cambiarTamanoPagina,
        totalPaginas,
        totalElementos,
        error,
        recargar: cargar,
     };
}
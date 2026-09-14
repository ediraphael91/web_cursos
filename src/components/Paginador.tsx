import React from "react";

interface PaginadorProps {
    paginaActual: number;
    totalPaginas: number;
    onCambiarPagina: (pagina: number) => void;
}
 const Paginador: React.FC<PaginadorProps> = ({paginaActual, totalPaginas, onCambiarPagina}) => {
    if (totalPaginas <= 1) return null; //No mostrará los controles si solo hay 1 página

    return (
        <div className="flex justify-center items-center gap-4 py-4">
            <button
                onClick={() => onCambiarPagina(Math.max(paginaActual -1, 1))}
                disabled={paginaActual === 1}
                className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
            >
                Anterior
            </button>

            <span>Página {paginaActual} de {totalPaginas}</span>

            <button
                onClick={() => onCambiarPagina(Math.min(paginaActual + 1, totalPaginas))}
                disabled={paginaActual >= totalPaginas}
                className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
            >
                Siguiente
            </button>
        </div>
    );
 };

 export default Paginador;
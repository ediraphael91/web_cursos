// src/components/SelectorTamanoPagina.tsx
import React from "react";

interface SelectorTamanoPaginaProps {
  tamanoPagina: number;
  onCambiar: (tamano: number) => void;
  opciones?: number[];
}

const SelectorTamanoPagina: React.FC<SelectorTamanoPaginaProps> = ({
  tamanoPagina,
  onCambiar,
  opciones = [5, 10, 20],
}) => {
  return (
    <div className="flex items-center gap-2">
      <label htmlFor="tamanoPagina" className="text-sm text-gray-600">
        Mostrar:
      </label>
      <select
        id="tamanoPagina"
        value={tamanoPagina}
        onChange={(e) => onCambiar(Number(e.target.value))}
        className="border rounded px-2 py-1 text-sm border-emerald-800"
      >
        {opciones.map((op) => (
          <option key={op} value={op}>
            {op}
          </option>
        ))}
      </select>
      <span className="text-sm text-gray-600">por página</span>
    </div>
  );
};

export default SelectorTamanoPagina;
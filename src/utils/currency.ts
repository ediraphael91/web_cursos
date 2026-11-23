// src/utils/currency.ts
export const formatPrecio = (precio?: number | null) =>
  precio == null
    ? "—"
    : new Intl.NumberFormat("es-EC", { style: "currency", currency: "USD" }).format(precio);
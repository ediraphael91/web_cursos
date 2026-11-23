// src/utils/date.ts
const LOCALE = "es-EC";
const PLACEHOLDER = "—";

const DATE_ONLY = /^\d{4}-\d{2}-\d{2}$/;

function formatWith(
  dateStr: string | null | undefined,
  options: Intl.DateTimeFormatOptions
): string {
  if (!dateStr) return PLACEHOLDER;

  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return PLACEHOLDER;

  return new Intl.DateTimeFormat(LOCALE, {
    ...options,
    // Fechas sin hora ("2026-12-01") se parsean como UTC: se formatean en UTC
    // para que no se muestre el día anterior en zonas con offset negativo.
    ...(DATE_ONLY.test(dateStr) && { timeZone: "UTC" }),
  }).format(date);
}

export const formatDate = (dateStr?: string | null) =>
  formatWith(dateStr, { day: "numeric", month: "long", year: "numeric" });

export const formatShortDate = (dateStr?: string | null) =>
  formatWith(dateStr, { day: "2-digit", month: "2-digit", year: "numeric" });
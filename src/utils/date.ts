// src/utils/date.ts
export const formatDate = (dateStr: string): string => {
  if (!dateStr) return "—"; // defensivo si viene null o vacío
  return new Intl.DateTimeFormat("es-EC", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(dateStr));
};

export const formatShortDate = (dateStr: string): string => {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("es-EC");
};

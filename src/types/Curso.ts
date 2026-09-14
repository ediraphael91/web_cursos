export interface Curso {
  
  idCurso: number;
  categoria: string;
  descripcion: string;
  estado: boolean;
  fechaFin: string;       // puedes usar Date si lo parseas
  fechaInicio: string;
  imagen: string;
  modalidad: string;
  nombre: string;
  precio: number;
  
}
export interface Usuario {
  
  idUsuario: number;
  nombre: string;
  apellido: string;
  profesion: string;
  correo: string;
  contacto: string;
  fechaCumpleano: string;
  rol: string;       // nombre del rol, solo para mostrar
  idRol?: number;    // ← nuevo: id del rol, para el select del modal 
  clave: string;
  estado: boolean;  
  
}
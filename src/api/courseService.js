import quarkusClient from "./quarkusClient";
export const getCursos = () => quarkusClient.get("/cursos/listar")
import axios from "axios";

const quarkusClient = axios.create({
    baseURL: "http://localhost:8080/cursos/listar",
    headers: {"Content-Type": "application/json"

    }
});
export default quarkusClient;
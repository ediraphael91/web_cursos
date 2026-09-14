import { useState } from "react";

function CursoForm() {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState(0);
  const [imagen, setImagen] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("descripcion", descripcion);
    formData.append("precio", precio.toString());
    if (imagen) {
      formData.append("imagen", imagen); // archivo
    }

    fetch("http://localhost:8080/cursos/crear", {
      method: "POST",
      body: formData, // importante: multipart/form-data
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error al crear el curso");
        return res.json();
      })
      .then((data) => {
        console.log("Curso creado:", data);
        alert("Curso creado con éxito");
      })
      .catch((err) => console.error(err));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-lg rounded-lg p-6 max-w-lg mx-auto space-y-4"
    >
      <h2 className="text-2xl font-bold text-blue-700 mb-4">Crear Curso hoy</h2>

      <input
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        placeholder="Nombre"
        className="w-full border rounded px-3 py-2"
      />

      <textarea
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        placeholder="Descripción"
        className="w-full border rounded px-3 py-2"
      />

      <input
        type="number"
        value={precio}
        onChange={(e) => setPrecio(Number(e.target.value))}
        placeholder="Precio"
        className="w-full border rounded px-3 py-2"
      />

      {/* Campo para subir imagen */}
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImagen(e.target.files?.[0] || null)}
        className="w-full border rounded px-3 py-2"
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700"
      >
        Crear Curs
      </button>
    </form>
  );
}

export default CursoForm;

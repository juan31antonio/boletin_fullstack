"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";

export default function AddLibro({ params }) {
  const [libro, setLibro] = useState({
    titulo: "",
    autor: ""
  });

  async function agregarLibro() {
    const response = await fetch("/api/libros", {
      method: "POST",
      headers: { "Content-Type": "application-json" },
      body: JSON.stringify(libro),
    });
  }

  function onChange(e) {
    setLibro({ ...libro, [e.target.name]: e.target.value });
  }

  function addLibro() {
    if (libro.titulo && libro.autor) {
        agregarLibro();
    }
  }

  return (
    <div>
      <h1>Formulario de Libros</h1>
      <form onSubmit={addLibro}>
        <label>
          Nombre:
          <input
            type="text"
            name="titulo"
            onChange={(e) => onChange(e)}
            value={libro.titulo}
            required
          />
        </label>
        <br />
        <label>
          Descripción:
          <input
            type="text"
            name="autor"
            onChange={(e) => onChange(e)}
            value={libro.autor}
          />
        </label>
        <button type="submit">Agregar</button>
      </form>
      <p>
        <Link href={"/Ejercicio-3/libros"}>
          <button>Volver Atrás</button>
        </Link>
      </p>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Users({ params }) {
  const [libros, setLibros] = useState([]);

  async function fetchLibros() {
    const url = "/api/libros";
    const response = await fetch(url);
    const books = await response.json();
    setLibros(books);
  }

  useEffect(() => {
    fetchLibros();
  }, []);


  async function updateLibro(id) {
    setLibros((prevLibros) =>
        prevLibros.map((libro) =>
          libro.id === id ? { ...libro, leido: !libro.leido } : libro
        )
    );
    const libro = libros.find((libro) => libro.id === id);
    const response = await fetch("/api/libros?id="+id, {
      method: "PUT",
      headers: { "Content-Type": "application-json" },
      body: JSON.stringify(libro),
    });
  }

  function deleteLibro(id){
    if(window.confirm('Estas seguro que quieres borrar este libro?')){
        removeLibro(id)
    }
  } 

  async function removeLibro(idEliminar){
    const response = await fetch("/api/libros", {
        method: "DELETE",
        headers: {"Content-Type": "application-json"},
        body: JSON.stringify({id: idEliminar})
    })
    fetchLibros();
  }

  return (
    <div>
        {
            <ul>
            {libros.map((libro) => (
            <li key={libro.id}>
                {libro.titulo}
                {libro.autor}
                <input type="checkbox" onChange={() => updateLibro(libro.id)}></input>
                <button onClick={e => deleteLibro(libro.id)}>Eliminar Libro</button>
            </li>
            ))}
        </ul>
        }
        <Link href={"/Ejercicio-3/addLibro"}>
            <button>Agregar Libros</button>
        </Link>     
    </div>
  );
}

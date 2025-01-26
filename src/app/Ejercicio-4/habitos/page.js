"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Habitos({ params }) {
  const [habitos, setHabitos] = useState([]);

  async function fetchHabitos() {
    const response = await fetch("/api/habitos");
    const habitos = await response.json();
    setHabitos(habitos);
  }

  useEffect(() => {
    fetchHabitos();
  }, []);

  async function marcarCompletado(id) {
    const updatedHabitos = habitos.map((habito) =>
      habito.id === id ? { ...habito, completado: !habito.completado } : habito
    );
    setHabitos(updatedHabitos);

    const habito = updatedHabitos.find((habito) => habito.id === id);
    await fetch("/api/habitos?id=" + id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(habito),
    });
  }

  function eliminarCompletados() {
    const habitosCompletados = habitos.filter((habito) => habito.completado);
    habitosCompletados.forEach(async (habito) => {
      await fetch("/api/habitos", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: habito.id }),
      });
    });
    fetchHabitos();
  }

  return (
    <div>
      <h1>Seguimiento de Habitos</h1>
      <button onClick={eliminarCompletados}>Eliminar Completados</button>
      <ul>
        {habitos.map((habito) => (
          <li key={habito.id}>
            {habito.nombre} - {habito.descripcion} - {habito.fecha}
            <input
              type="checkbox"
              checked={habito.completado}
              onChange={() => marcarCompletado(habito.id)}
            />
          </li>
        ))}
      </ul>
      <Link href={"/Ejercicio-4/addHabito"}>
        <button>Agregar Habitos</button>
      </Link>     
    </div>
  );
}

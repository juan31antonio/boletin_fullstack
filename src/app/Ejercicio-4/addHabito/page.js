"use client";

import { useState } from "react";
import Link from "next/link";

export default function AddHabito() {
  const [habito, setHabito] = useState({
    nombre: "",
    descripcion: "",
    fecha: new Date().toISOString().split('T')[0], 
  });

  function onChange(e) {
    setHabito({ ...habito, [e.target.name]: e.target.value });
  }

  async function agregarHabito() {
    const response = await fetch("/api/habitos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(habito),
    });
  }

  function addHabito() {
    if (habito.nombre && habito.fecha) {
      agregarHabito();
    }
  }

  return (
    <div>
      <h1>Formulario de Habitos</h1>
      <form onSubmit={addHabito}>
        <label>
          Nombre:
          <input
            type="text"
            name="nombre"
            onChange={(e) => onChange(e)}
            value={habito.nombre}
            required
          />
        </label>
        <br />
        <label>
          Descripcion:
          <input
            type="text"
            name="descripcion"
            onChange={(e) => onChange(e)}
            value={habito.descripcion}
          />
        </label>
        <br />
        <label>
          Fecha:
          <input
            type="date"
            name="fecha"
            onChange={(e) => onChange(e)}
            value={habito.fecha}
            required
          />
        </label>
        <button type="submit">Agregar Habito</button>
      </form>
      <p>
        <Link href={"/Ejercicio-4/habitos"}>
          <button>Volver Atras</button>
        </Link>
      </p>
    </div>
  );
}

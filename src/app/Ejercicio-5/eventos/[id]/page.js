"use client"

import { useEffect, useState, use } from "react";
import Link from "next/link";

export default function Evento({params}) {

    const { id } = use(params);
    const [evento, setEvento] = useState(null)


    async function fetchEvento(){
      const url = "/api/eventos/evento?id=" + id
      const response = await fetch(url);
      const event = await response.json()
      setEvento(event)
  }

    
    useEffect( () => {fetchEvento()}, [])


    if (!evento) {
        return <h1>Ese evento no se ha encontrado</h1>;
    }

    async function addAsistente() {
      const updatedAsistentes = evento.asistentes + 1;
      const updatedEvento = { ...evento, asistentes: updatedAsistentes };

      const response = await fetch("/api/eventos/evento?id=" + id, {
        method: "PUT",
        headers: { "Content-Type": "application-json" },
        body: JSON.stringify(updatedEvento),
      });

    setEvento(updatedEvento);
    }

    return (
      <div>
        <h3>Evento: </h3>
        <p><strong>Titulo: {evento.titulo}</strong></p>
        <p><strong>Descripcion: {evento.descripcion}</strong></p>
        <p><strong>Fecha: {evento.fecha}</strong></p>
        <p><strong>Ubicacion: {evento.ubicacion}</strong></p>
        <p><strong>Asistentes: {evento.asistentes}</strong></p>
        <button onClick={addAsistente}>Add asistente</button>
        <Link href={"/Ejercicio-5/eventos"}><h3>Volver Atras</h3></Link>
      </div>  
    )
}

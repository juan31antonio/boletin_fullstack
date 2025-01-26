"use client"

import { useEffect, useState, use } from "react";
import Link from "next/link";

export default function Eventos({params}) {

    const { id } = use(params);
    const [eventos, setEventos] = useState([])


  async function fetchEventos(){
    const url = "/api/eventos"
    const response = await fetch(url);
    const event = await response.json()
    setEventos(event)
  }

  
  useEffect( () => {fetchEventos()}, [])


  if (!eventos) {
    return <h1>La lista de eventos esta vacia</h1>;
  }

  async function deleteEvento(idEliminar) {
    const response = await fetch("/api/eventos", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: idEliminar })
    });
  
    fetchEventos();
  }
  

  return (
    <div>
      <h3>Eventos: </h3>
      {
        <ul>
          {eventos.map((evento) => (
            <li key={evento.id}>
              <Link href={"eventos/" + evento.id}>{evento.titulo}</Link>
              <br/>
              {new Date(evento.fecha) < new Date() ? (
                <button onClick={(e) => deleteEvento(evento.id)}>Eliminar Evento</button>
              ) : null}
            </li>
          ))}
        </ul>
      }
      <Link href={"addEvento"}><h3>Add Nuevo Evento</h3></Link>
    </div>  
  )
  
}



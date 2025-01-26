"use client"

import { useState } from "react";
import Link from "next/link";

export default function AddEvento() {

    const [evento, setEvento] = useState({
        titulo: "",
        descripcion: "",
        fecha: "",
        ubicacion: "",
        asistentes: 0
    });
    const [error, setError] = useState("");

    async function agregarEvento(){
        const response = await fetch("/api/eventos", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(evento)
        });
    }

    function onChange(e) {
        setEvento({...evento, [e.target.name]: e.target.value});
    }

    function addEvento(e){
        e.preventDefault();
        
        const fechaEvento = new Date(evento.fecha);
        const fechaActual = new Date();

        if (!evento.titulo || !evento.fecha || !evento.ubicacion) {
            setError("Rellena campos obligatorios");
            return;
        }

        if (fechaEvento <= fechaActual) {
            setError("La fecha de be ser mas tardre");
            return;
        }

        setError("");
        agregarEvento();
        setEvento({
          titulo: "",
          descripcion: "",
          fecha: "",
          ubicacion: "",
          asistentes: 0
        });
    }

    return (
        <div>
            <h1>Agregar Evento</h1>
            {error}
            <form onSubmit={addEvento}>
                <label>Titulo:
                    <input type="text" name="titulo" onChange={onChange} value={evento.titulo} required/>
                </label><br/>
                <label>Descripción:
                    <input type="text" name="descripcion" onChange={onChange} value={evento.descripcion} />
                </label><br/>
                <label>Fecha:
                    <input type="date" name="fecha" onChange={onChange} value={evento.fecha} required/>
                </label><br/>
                <label>Ubicación:
                    <input type="text" name="ubicacion" onChange={onChange} value={evento.ubicacion} required/>
                </label><br/>
                <button type="submit">Agregar Evento</button>
            </form>
            <p>
                <Link href={"eventos"}><button>Volver Atras</button></Link>
            </p>
        </div>
    );
}

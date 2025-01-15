"use client"

import { useEffect, useState, use } from "react";
import Link from "next/link";

export default function AddArticulo() {

    const [articulo, setArticulo] = useState({
        titulo: "",
        contenido: "",
        autor: ""
    })


  async function agregarArticulo(){
        const response = await fetch("/api/articulos", {
            method: "POST",
            headers: {"Content-Type": "application-json"},
            body: JSON.stringify(articulo)
        })
    }

    function onChange(e) {
        setArticulo({...articulo,[e.target.name]:e.target.value})
    }

    function addArticulo(){
      if(articulo.titulo && articulo.contenido){
        if(String(articulo.contenido).length < 150){
            agregarArticulo()
        }          
      }
    }

  return (
        <div>
          <h1>Add Article</h1>
          <form onSubmit={addArticulo}>
            <label>Titulo:
                <input type="text" name="titulo" onChange={e => onChange(e)} value={articulo.titulo} required/>
            </label><br/>
            <label>Contenido:
                <input type="text" name="contenido" onChange={e => onChange(e)} value={articulo.contenido} required/>
            </label><br/>
            <label>Autor:
                <input type="text" name="autor" onChange={e => onChange(e)} value={articulo.autor} />
            </label><br/>
            <button type="submit">Agregar Articulo</button>
          </form>
          {JSON.stringify(articulo)}
          <p>
          <Link href={"/articulos"}><button>Volver Atras</button></Link>
          </p>
        </div>
    )
}



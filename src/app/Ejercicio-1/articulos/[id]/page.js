"use client"

import { useEffect, useState, use } from "react";
import Link from "next/link";

export default function Articulo({params}) {

    const { id } = use(params);
    const [articulo, setArticulo] = useState(null)


    async function fetchArticulo(){
        const url = "/api/articulos/articulo?id=" + id
        const response = await fetch(url);
        const article = await response.json()
        setArticulo(article)
    }

    
    useEffect( () => {fetchArticulo()}, [])


    if (!articulo) {
        return <h1>Ese articulo no se ha encontrado</h1>;
    }


    return (
      <div>
        <h3>Articulo: </h3>
        <p><strong>Titulo: {articulo.titulo}</strong></p>
        <p><strong>Contenido: {articulo.contenido}</strong></p>
        <p><strong>Autor: {articulo.autor}</strong></p>
        <p><strong>Fecha de Publicacion: {articulo.fecha_publicacion}</strong></p>
        <Link href={"articulos"}><h3>Volver Atras</h3></Link>
      </div>  
    )
}
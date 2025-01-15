"use client"

import { useEffect, useState, use } from "react";
import Link from "next/link";

export default function Articulos({params}) {

    const { id } = use(params);
    const [articulos, setArticulos] = useState([])


  async function fetchArticulos(){
    const url = "/api/articulos"
    const response = await fetch(url);
    const article = await response.json()
    setArticulos(article)
  }

  
  useEffect( () => {fetchArticulos()}, [])


  if (!articulos) {
    return <h1>La lista de articulos esta vacia</h1>;
  }

  function deleteArticulo(id){
    if(window.confirm('Estas seguro que quieres borrar este articulo?')){
        removeUser(id)
    }
  } 

  async function removeUser(idEliminar){
    const response = await fetch("/api/articulos", {
        method: "DELETE",
        headers: {"Content-Type": "application-json"},
        body: JSON.stringify({id: idEliminar})
    })

    fetchArticulos();
  }

    return (
      <div>
        <h3>Articulos: </h3>
        {
            <ul>
                {articulos.map((articulo) => (
                <li key={articulo.id}>
                    <Link href={"/articulos/"+ articulo.id}>{articulo.titulo}</Link><br/>
                    <button onClick={e => deleteArticulo(articulo.id)}>Eliminar Articulo</button>
                </li>
                ))}
            </ul>
        }
        <Link href={"/addArticulo"}><h3>Add New Articulo</h3></Link>
      </div>  
    )
}



"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";

export default function AddProduct({ params }) {
  const [producto, setProducto] = useState({
    nombre: "",
    descripcion: "",
    precio: 0,
    stock: 0,
  });

  async function agregarProducto() {
    const response = await fetch("/api/productos", {
      method: "POST",
      headers: { "Content-Type": "application-json" },
      body: JSON.stringify(producto),
    });
  }

  function onChange(e) {
    setProducto({ ...producto, [e.target.name]: e.target.value });
  }

  function addProduct() {
    if (producto.nombre && producto.stock) {
      if (producto.precio >= 0) {
        agregarProducto();
      }
    }
  }

  return (
    <div>
      <h1>Formulario de Productos</h1>
      <form onSubmit={addProduct}>
        <label>
          Nombre:
          <input
            type="text"
            name="nombre"
            onChange={(e) => onChange(e)}
            value={producto.nombre}
            required
          />
        </label>
        <br />
        <label>
          Descripción:
          <input
            type="text"
            name="descripcion"
            onChange={(e) => onChange(e)}
            value={producto.descripcion}
          />
        </label>
        <br />
        <label>
          Precio:
          <input
            type="number"
            name="precio"
            onChange={(e) => onChange(e)}
            value={producto.precio}
          />
        </label>
        <br />
        <label>
          Stock:
          <input
            type="number"
            name="stock"
            onChange={(e) => onChange(e)}
            value={producto.stock}
            required
          />
        </label>
        <br />
        <button type="submit">Agregar</button>
      </form>
      <p>
        <Link href={"/Ejercicio-2/productos"}>
          <button>Volver Atrás</button>
        </Link>
      </p>
    </div>
  );
}

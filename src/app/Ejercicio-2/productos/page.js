"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Users({ params }) {
  const [productos, setProductos] = useState([]);
  const [isEditing, setIsEditing] = useState(null);

  async function fetchProducts() {
    const url = "/api/productos";
    const response = await fetch(url);
    const products = await response.json();
    setProductos(products);
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  function editarStock(id, newStock) {
    if(newStock < 0){
      newStock = 0
    }
    setProductos((prevProductos) =>
      prevProductos.map((producto) =>
        producto.id === id ? { ...producto, stock: parseInt(newStock, 10) } : producto
      )
    );
  }

  async function updateProduct(id) {
    const producto = productos.find((producto) => producto.id === id);
    const response = await fetch("/api/productos?id="+id, {
      method: "PUT",
      headers: { "Content-Type": "application-json" },
      body: JSON.stringify(producto),
    });
    setIsEditing(null);
  }

  function toggleEditing(id) {
    if (isEditing === id) {
      updateProduct(id);
    } 
    else {
      setIsEditing(id);
    }
  }

  if (!productos.length) {
    return <h1>La lista de productos está vacía</h1>;
  }

  return (
    <div>
      <table border={"1"}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripcion</th>
            <th>Precio</th>
            <th>Stock</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto.id}>
              <td>{producto.nombre}</td>
              <td>{producto.descripcion}</td>
              <td>{producto.precio}</td>
              <td>
                 {isEditing === producto.id ? (
                  <input
                    type="number"
                    value={producto.stock}
                    onChange={(e) =>
                      editarStock(producto.id, e.target.value)
                    }
                  />
                ) : (
                  producto.stock == 0 ? (<span style={{color: "red"}}>{producto.stock}</span>):(producto.stock)
                )}
              </td>
              <td>
                <button onClick={() => toggleEditing(producto.id)}>
                  {isEditing === producto.id ? "Guardar" : "Editar"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>
        <Link href={"/Ejercicio-2/addProductos"}>
          <button>Agregar Producto</button>
        </Link>
      </p>
    </div>
  );
}

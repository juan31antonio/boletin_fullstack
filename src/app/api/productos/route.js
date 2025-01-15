import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://clrcsbqaujtejsyetrzu.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNscmNzYnFhdWp0ZWpzeWV0cnp1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY3NjIxNzAsImV4cCI6MjA1MjMzODE3MH0.xHx0seddBDHFJxzRfjM9kQPGpiqx-qjUcD2gMdz6hd8'
const supabase = createClient(supabaseUrl, supabaseKey)

export async function GET(){
    const {data: productos, error} = await supabase.from("productos").select("id, nombre, precio, stock")

    if(error){
        return new Response(
            JSON.stringify({
                message: "Ha ocurrido un error al obtener los productos",
                error: error
            }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" } 
            }
        )
    }

    return new Response(
        JSON.stringify(productos),
        { status: 200, headers: { "Content-Type": "application/json" } }
    )
}

export async function POST(request) {
    const body = await request.json();

    if(body.nombre && body.precio){
        if(body.stock >= 0){
            const {data, error} = await supabase.from("productos").insert(body)

            if(error){
                return new Response(
                    JSON.stringify({message: error}),
                    { 
                        headers: { "Content-Type": "application/json" },
                        status: 500                                    
                    }
                );
            }

            return new Response(
                JSON.stringify({message: "Producto añadido correctamente"}),
                { headers: { "Content-Type": "application/json" },
                  status:200 }
            );
        }
    }

    return new Response(
        JSON.stringify({message: "El producto no se ha podido agregar"}),
        { 
            headers: { "Content-Type": "application/json" },
            status: 501                                    
        }
    );
}

export async function PUT(request) {
    const {searchParams} = new URL(request.url)
    const idBuscado = searchParams.get("id")
    const body = await request.json();
        
    const {data, error} = await supabase.from("productos").update(body).eq("id", idBuscado)

    if(error){
        return new Response(
            JSON.stringify({message: error}),
            { 
                headers: { "Content-Type": "application/json" },
                status: 500                                    
            }
        );
    }

    return new Response(
        JSON.stringify({message: "Stock actualizado correctamente correctamente"}),
        { headers: { "Content-Type": "application/json" },
            status:200 }
    );
}
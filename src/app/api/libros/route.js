import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://clrcsbqaujtejsyetrzu.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNscmNzYnFhdWp0ZWpzeWV0cnp1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY3NjIxNzAsImV4cCI6MjA1MjMzODE3MH0.xHx0seddBDHFJxzRfjM9kQPGpiqx-qjUcD2gMdz6hd8'
const supabase = createClient(supabaseUrl, supabaseKey)

export async function GET(request) {
    const {searchParams} = new URL(request.url)
    const filter = searchParams.get("filter")

    let query = supabase.from("libros").select("*")

    if (filter === "leido") {
        query = query.eq("leido", true);
    } 
    else if (filter === "no-leido") {
        query = query.eq("leido", false);
    }

    const { data: libros, error } = await query;

    if (error) {
        return new Response(
            JSON.stringify({ error: error.message }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }

    return new Response(
        JSON.stringify(libros),
        { status: 200, headers: { "Content-Type": "application/json" } }
    );
}



export async function POST(request){
    const body = await request.json();

    if(body.titulo && body.autor){
        const {data, error} = await supabase.from("libros").insert(body)

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
        
    const {data, error} = await supabase.from("libros").update(body).eq("id", idBuscado)

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

export async function DELETE(request){
    const body = await request.json();

    const { data, error } = await supabase
    .from("libros")
    .delete()
    .eq("id", body.id);

    if(error){
        return new Response(
            JSON.stringify(error),
            { headers: { "Content-Type": "application/json" },
             status:500 }
        );
    }

    return new Response(
        JSON.stringify({message: "Articulo eliminado correctamente"}),
        { headers: { "Content-Type": "application/json" } }
    );
}
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://clrcsbqaujtejsyetrzu.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNscmNzYnFhdWp0ZWpzeWV0cnp1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY3NjIxNzAsImV4cCI6MjA1MjMzODE3MH0.xHx0seddBDHFJxzRfjM9kQPGpiqx-qjUcD2gMdz6hd8'
const supabase = createClient(supabaseUrl, supabaseKey)


export async function GET() {
    const { data: articulos, error } = await supabase.from("articulos").select("id,titulo, autor, fecha_publicacion")

    return new Response(
        JSON.stringify(articulos),
        { status: 200, headers: { "Content-Type": "application/json" } }
    );
}

export async function POST(request) {
    const body = await request.json();

    if(body.titulo && body.contenido){
        if(String(body.contenido).length < 150){
            const { data, error } = await supabase
            .from("articulos")
            .insert(body);

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
                JSON.stringify({message: "Articulo añadido correctamente"}),
                { headers: { "Content-Type": "application/json" },
                  status:200 }
            );
        }
    }


    return new Response(
        JSON.stringify({message: "El usuario no se ha podido agregar"}),
        { 
            headers: { "Content-Type": "application/json" },
            status: 501                                    
        }
    );
}

export async function DELETE(request) {
    const body = await request.json();

    const { data, error } = await supabase
    .from("articulos")
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
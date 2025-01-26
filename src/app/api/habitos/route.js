import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://clrcsbqaujtejsyetrzu.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNscmNzYnFhdWp0ZWpzeWV0cnp1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY3NjIxNzAsImV4cCI6MjA1MjMzODE3MH0.xHx0seddBDHFJxzRfjM9kQPGpiqx-qjUcD2gMdz6hd8'
const supabase = createClient(supabaseUrl, supabaseKey)

export async function GET(request) {
    const diaActual = new Date().toISOString().split('T')[0];

    const { data: habitos, error } = await supabase.from("habitos").select("*").eq("fecha", diaActual);

    if (error) {
        return new Response(
            JSON.stringify({ error: error.message }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }

    return new Response(
        JSON.stringify(habitos),
        { status: 200, headers: { "Content-Type": "application/json" } }
    );
}



export async function POST(request){
    const body = await request.json();

    const diaActual = new Date().toISOString().split('T')[0];
    const fecha = new Date(body.fecha);
    if (fecha < diaActual) {
        return new Response(
            JSON.stringify({ message: "Es fecha ya ha pasado" }),
            { 
                headers: { "Content-Type": "application/json" },
                status: 400                                    
            }
        );
    }

    const { data, error } = await supabase.from("habitos").insert(body);

    if (error) {
        return new Response(
            JSON.stringify({ message: error.message }),
            { 
                headers: { "Content-Type": "application/json" },
                status: 500                                    
            }
        );
    }

    return new Response(
        JSON.stringify({ message: "Habito agregado correctamentre" }),
        { headers: { "Content-Type": "application/json" },
          status: 200 }
    );
}


export async function PUT(request) {
    const {searchParams} = new URL(request.url)
    const idBuscado = searchParams.get("id")
    const body = await request.json();

    const { data, error } = await supabase.from("habitos").update(body).eq("id", idBuscado);

    if (error) {
        return new Response(
            JSON.stringify({ message: error.message }),
            { 
                headers: { "Content-Type": "application/json" },
                status: 500                                    
            }
        );
    }

    return new Response(
        JSON.stringify({ message: "Habito actualizado correctamente" }),
        { headers: { "Content-Type": "application/json" },
          status: 200 }
    );
}

export async function DELETE(request) {
    const body = await request.json();

    const { data, error } = await supabase.from("habitos").delete().eq("id", body.id).eq("completado", true);

    if (error) {
        return new Response(
            JSON.stringify({ message: error.message }),
            { headers: { "Content-Type": "application/json" },
             status: 500 }
        );
    }

    return new Response(
        JSON.stringify({ message: "Habito eliminado correctamente" }),
        { headers: { "Content-Type": "application/json" } }
    );
}

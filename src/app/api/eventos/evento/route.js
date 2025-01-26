import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://clrcsbqaujtejsyetrzu.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNscmNzYnFhdWp0ZWpzeWV0cnp1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY3NjIxNzAsImV4cCI6MjA1MjMzODE3MH0.xHx0seddBDHFJxzRfjM9kQPGpiqx-qjUcD2gMdz6hd8'
const supabase = createClient(supabaseUrl, supabaseKey)



export async function GET(request) {

    const {searchParams} = new URL(request.url)
    const idBuscado = searchParams.get("id")

    const { data: evento, error } = await supabase.from("eventos").select("*").eq("id", idBuscado).single();
    
    if(evento) {
        return new Response(JSON.stringify(evento), {status:200})
    }
    else{
        return new Response(JSON.stringify({error: "No existe"}), {status: 404})
    }
}


export async function PUT(request) {
    const {searchParams} = new URL(request.url)
    const idBuscado = searchParams.get("id")
    const body = await request.json();

    const { data, error } = await supabase.from("eventos").update(body).eq("id", idBuscado);

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
        JSON.stringify({ message: "Evento actualizado correctamente" }),
        { headers: { "Content-Type": "application/json" },
          status: 200 }
    );
}
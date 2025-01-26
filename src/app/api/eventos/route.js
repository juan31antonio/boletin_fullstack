import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://clrcsbqaujtejsyetrzu.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNscmNzYnFhdWp0ZWpzeWV0cnp1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY3NjIxNzAsImV4cCI6MjA1MjMzODE3MH0.xHx0seddBDHFJxzRfjM9kQPGpiqx-qjUcD2gMdz6hd8'
const supabase = createClient(supabaseUrl, supabaseKey)


export async function GET() {
    const { data: eventos, error } = await supabase.from("eventos").select("id, titulo, descripcion, fecha, ubicacion, asistentes").order("fecha", { ascending: true })

    if (error) {
        return new Response(
            JSON.stringify({ message: error.message }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }

    return new Response(
        JSON.stringify(eventos),
        { status: 200, headers: { "Content-Type": "application/json" } }
    );
}

export async function POST(request) {
    const body = await request.json();

    const diaActual = new Date().toISOString().split('T')[0];
    const fecha = new Date(body.fecha);

    if(body.titulo && body.fecha && body.ubicacion){
        if (fecha.toISOString().split('T')[0] > diaActual) {
            const { data, error } = await supabase.from("eventos").insert(body);

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
                JSON.stringify({message: "Evento agregado correctamente"}),
                { headers: { "Content-Type": "application/json" },
                  status:200 }
            );
        }
    }


    return new Response(
        JSON.stringify({message: "El evento no se ha podido agregar"}),
        { 
            headers: { "Content-Type": "application/json" },
            status: 501                                    
        }
    );
}

export async function DELETE(request) {
    const body = await request.json();
  
    const { data, error } = await supabase.from("eventos").delete().eq("id", body.id);
  
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
      JSON.stringify({ message: "Evento eliminado correctamente" }),
      { headers: { "Content-Type": "application/json" },
        status: 200 }
    );
  }
  
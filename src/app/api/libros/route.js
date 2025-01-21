import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://clrcsbqaujtejsyetrzu.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNscmNzYnFhdWp0ZWpzeWV0cnp1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY3NjIxNzAsImV4cCI6MjA1MjMzODE3MH0.xHx0seddBDHFJxzRfjM9kQPGpiqx-qjUcD2gMdz6hd8'
const supabase = createClient(supabaseUrl, supabaseKey)

export async function GET(params) {
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

export async function POST(params) {
    
}

export async function PUT(params){

}

export async function DELETE(params){

}
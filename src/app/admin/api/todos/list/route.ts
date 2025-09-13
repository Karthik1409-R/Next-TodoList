import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)


export async function GET() {
    try {
        console.log('Fetching todos with profiles...')
        const { data, error, status } = await supabase
          .from("todos")
          .select(`
            id, 
            text, 
            completed, 
            user_id, 
            profiles (
              full_name
            )
          `)
          .order("id", { ascending: true })
    
        console.log('Query status:', status)
        console.log('Query error:', error)
        console.log('Query data:', data)
        
        if (error) {
            console.error('Supabase query error:', error)
            throw error
        }
        
        return NextResponse.json(Array.isArray(data) ? data : [])
    } catch (err: any) {
        console.error('Error in GET /api/todos/list:', err)
        return NextResponse.json(
            { error: err.message || 'Failed to fetch todos' }, 
            { status: 500 }
        )
    } 
}

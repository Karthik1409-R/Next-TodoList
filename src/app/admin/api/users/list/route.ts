import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET() {
    try {
        const { data, error } = await supabase.auth.admin.listUsers()
        if (error) return NextResponse.json({ error: error.message }, { status: 400 })
    
        const users = data.users.map((u) => ({
          id: u.id, 
          email: u.email,
          full_name: u.user_metadata?.full_name || '',  
        }))
    
        console.log("Processed users:", users) 
        return NextResponse.json(users)
      } catch (err) {
        console.error("Error in GET /api/users/list:", err)
        return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 })
      }
}

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! 
)

export async function POST(req: Request) {
    try {
        const { email, password, full_name } = await req.json()
    
        const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
          email,
          password,
          user_metadata: { full_name },
        })
    
        if (authError) throw authError
        const { error: dbError } = await supabase
          .from("users")
          .insert([{ id: authUser.user.id, email, full_name }])
    
        if (dbError) throw dbError
    
        return NextResponse.json({ message: "User created successfully" })
      } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 })
      }
}

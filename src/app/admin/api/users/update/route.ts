import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function PUT(req: Request) {
  try {
    const { id, email, full_name } = await req.json()
    
    const { data: authUser, error: authError } = await supabase.auth.admin.updateUserById(id, {
      email,
      user_metadata: { full_name },
    })

    if (authError) {
      console.error("Auth update error:", authError)
      throw authError
    }

    const { error: dbError } = await supabase
      .from("users")
      .update({ email, full_name })
      .eq("id", id)

    if (dbError) {
      console.error("DB update error:", dbError)
      throw dbError
    }

    return NextResponse.json({ 
      message: "User updated successfully",
      user: {
        id: authUser.user.id,
        email: authUser.user.email,
        full_name: full_name
      }
    })
  } catch (err: any) {
    console.error("Update error:", err)
    return NextResponse.json(
      { error: err.message || "Failed to update user" }, 
      { status: 500 }
    )
  }
}
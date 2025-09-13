"use client"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  import { Button } from "@/components/ui/button"
  import { useRouter } from "next/navigation"
  
  export function AlertDialogDemo() {
    const router = useRouter()
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline" className="bg-violet-500 text-white hover:bg-violet-600 px-4 py-2 rounded-lg text-sm sm:text-base cursor-pointer">Sign Out</Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="bg-white text-black px-4 py-2 rounded-lg text-sm sm:text-base cursor-pointer">
          <AlertDialogHeader className="bg-white text-black px-4 py-2 rounded-lg text-sm sm:text-base cursor-pointer">
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              You are about to sign out. Are you sure you want to do this?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-violet-500 text-white hover:bg-violet-600 px-4 py-2 rounded-lg text-sm sm:text-base cursor-pointer">Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-violet-500 text-white hover:bg-violet-600 px-4 py-2 rounded-lg text-sm sm:text-base cursor-pointer" onClick={() => router.push('/')}>Sign Out</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
  
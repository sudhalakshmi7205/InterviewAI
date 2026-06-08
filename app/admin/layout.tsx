import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await currentUser()
  
  // SECURE ROUTE: Only allow the specific admin email
  const isAdmin = user?.emailAddresses[0]?.emailAddress === 'sudharajsekar2005@gmail.com'
  
  if (!isAdmin) {
    redirect('/') // Kick them out to the homepage
  }
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-slate-900 text-white flex flex-col hidden md:flex">
        <div className="p-6 border-b border-slate-800">
          <h1 className="text-xl font-extrabold tracking-tight">InterviewAI<span className="text-blue-500">.Admin</span></h1>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 bg-blue-600 rounded-xl text-sm font-bold text-white shadow-sm transition-colors hover:bg-blue-500">
            📊 Overview
          </Link>
          <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-slate-300 hover:text-white hover:bg-slate-800 transition-colors">
            ⬅️ Back to App
          </Link>
        </nav>
      </div>
      
      {/* Mobile Header */}
      <div className="md:hidden bg-slate-900 text-white p-4 flex justify-between items-center">
        <h1 className="text-lg font-extrabold">InterviewAI<span className="text-blue-500">.Admin</span></h1>
        <Link href="/dashboard" className="text-sm text-slate-300 font-bold hover:text-white">Exit &rarr;</Link>
      </div>
      
      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto">
        {children}
      </div>
    </div>
  )
}

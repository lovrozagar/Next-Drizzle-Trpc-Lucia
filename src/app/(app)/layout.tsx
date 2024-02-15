import { Navbar } from '@/components/navbar'
import { ProtectedRoute } from '@/components/routes/protected-route'
import { Sidebar } from '@/components/sidebar'

function AppLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <ProtectedRoute>
      <main>
        <div className='flex h-screen'>
          <Sidebar />
          <main className='flex-1 overflow-y-auto p-8 pt-2 md:p-8'>
            <Navbar />
            {children}
          </main>
        </div>
      </main>
    </ProtectedRoute>
  )
}

export default AppLayout

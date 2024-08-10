import { Footer } from './_components/footer'
import { Navbar } from './_components/navbar'

const MarketingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className='flex flex-col min-h-screen bg-slate-100'>
        {/* Navbar */}
        <Navbar />
        <main className='flex-grow mt-10'>{children}</main>
        {/* Footer */}
        <Footer/>
      </div>
    </>
  )
}

export default MarketingLayout

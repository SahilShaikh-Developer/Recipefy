import React from 'react'
import Mainroutes from './routes/Mainroutes'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

const App = () => {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Mainroutes />
      </main>
      <Footer />
    </>
  )
}

export default App

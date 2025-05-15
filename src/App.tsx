import { Routes, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { Inicio } from './pages/Inicio'
import { About } from './pages/About'
import { Tienda } from './pages/Tienda'
import { NavBar } from './components/Navbar'
import { ShoppingCartProvider } from './context/ShoppingCartContext'

function App() {
  return (
    <>
    <ShoppingCartProvider>
    <NavBar />
      <Container className='mb-4'>
      <Routes>
        <Route path="/" element={<Inicio/>} />
        <Route path="/tienda" element={<Tienda/>} />
        <Route path="/about" element={<About/>} />
      </Routes>
    </Container>
    </ShoppingCartProvider>

    </> 
  )
}

export default App

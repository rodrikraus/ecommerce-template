import { Routes, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { Inicio } from './pages/Inicio'
import { About } from './pages/About'
import { Tienda } from './pages/Tienda'
import { NavBar } from './components/Navbar'
import { ShoppingCartProvider } from './context/ShoppingCartContext'
import { Footer } from './components/Footer';
import { TopBar } from './components/TopBar';

function App() {
  return (
    <ShoppingCartProvider>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <TopBar /> 
        <NavBar />
        <Container className='mb-4' style={{ flex: '1 0 auto' }}>
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/tienda" element={<Tienda />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </Container>
        <Footer />
      </div>
    </ShoppingCartProvider>
  );
}

export default App

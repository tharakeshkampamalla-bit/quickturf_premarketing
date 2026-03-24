import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import Home from './pages/Home'
import Join from './pages/Join'
import Admin from './pages/Admin'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

function CustomCursor() {
  const cursorRef = useRef(null)
  const ringRef  = useRef(null)
  const pos = useRef({ x: 0, y: 0 })
  const ringPos = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const move = e => { pos.current = { x: e.clientX, y: e.clientY } }
    window.addEventListener('mousemove', move)
    let raf
    const loop = () => {
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.15
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.15
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${pos.current.x - 4}px, ${pos.current.y - 4}px)`
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPos.current.x - 16}px, ${ringPos.current.y - 16}px)`
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => { window.removeEventListener('mousemove', move); cancelAnimationFrame(raf) }
  }, [])

  return (
    <>
      <div id="cursor" ref={cursorRef} />
      <div id="cursor-ring" ref={ringRef} />
    </>
  )
}

export default function App() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])

  return (
    <div style={{ background: 'var(--c-bg)', color: 'var(--c-text)', minHeight: '100vh' }}>
      <CustomCursor />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/join" element={<Join />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
      <Footer />
    </div>
  )
}

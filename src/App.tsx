import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import { PasswordGate } from '@/components/PasswordGate'
import Home from '@/pages/Home'

export default function App() {
  return (
    <PasswordGate>
      <Router basename={import.meta.env.BASE_URL}>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </PasswordGate>
  )
}

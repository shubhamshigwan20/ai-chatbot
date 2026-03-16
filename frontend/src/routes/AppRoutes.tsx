import Home from "@/views/home/Home"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  )
}

export default AppRoutes

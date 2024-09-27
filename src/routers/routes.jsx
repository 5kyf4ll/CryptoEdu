import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home";
import { CifradoCesar } from "../pages/Cifrado Cesar";
import { CifradoPlayfair } from "../pages/Cifrado Playfair";
import {Diagramas} from "../pages/Diagramas";
import {Reportes} from "../pages/Reportes";
export function MyRoutes() {
  return (
   
     
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cifrado playfair" element={<CifradoPlayfair />} />
        <Route path="/cifrado cesar" element={<CifradoCesar />} />
        <Route path="/diagramas" element={<Diagramas />} />
        <Route path="/reportes" element={<Reportes />} />
      </Routes>
    
  );
}
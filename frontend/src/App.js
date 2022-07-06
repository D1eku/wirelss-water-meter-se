import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Menu } from "./components/Menu/Menu";

import { Login, WaterMedition } from "./views";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/menu" element={<Menu/>}>
          <Route path="waterMedition" element={<WaterMedition />} />
        </Route>
        <Route path="*" element={<Navigate to={"/"} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

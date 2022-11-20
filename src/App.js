import Header from "./components/Header/Header";
import { Route, Routes } from "react-router-dom";
import CityList from "./components/City/CityList";
import CityDetail from "./components/City/CityDetail";
import './style/main.scss';

function App() {
  return (
    <>
      <Header/>
      <Routes>
        <Route path="/" element={<CityList/>}/>
        <Route path="/city/:id" element={<CityDetail/>}/>
      </Routes>
    </>
  );
}

export default App;

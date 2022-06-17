import "./App.css";

import { useState } from "react";

import NavigationBar from "./components/Home/NavigationBar";
import RoutesMain from "./Routes/RoutesMain";

function App() {
  const [dataSource, setDataSource] = useState([]);

  return (
    <>
      <NavigationBar />
      <RoutesMain dataSource={dataSource} setDataSource={setDataSource} />
    </>
  );
}

export default App;

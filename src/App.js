import "./App.css";

import { useState } from "react";

import FormComp from "./components/FormComp/FormComp";
import TableComp from "./components/TableComp/TableComp";
function App() {
  const [dataSource, setDataSource] = useState([]);

  return (
    <>
      <FormComp setDataSource={setDataSource} />
      <TableComp dataSource={dataSource} setDataSource={setDataSource}></TableComp>
    </>
  );
}

export default App;

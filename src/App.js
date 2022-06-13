import "./App.css";

import { useState } from "react";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import FormComp from "./components/FormComp/FormComp";
import TableComp from "./components/TableComp/TableComp";
import SignUp from "./components/SignUp/SignUp";
import SignIn from "./components/SignIn/SignIn";

function App() {
  const [dataSource, setDataSource] = useState([]);

  return (
    <>
      {/* <SignUp /> */}
      <SignIn />
      {/* <ErrorPage /> */}
      {/* <FormComp setDataSource={setDataSource} /> */}
      {/* <TableComp dataSource={dataSource} setDataSource={setDataSource}></TableComp> */}
    </>
  );
}

export default App;

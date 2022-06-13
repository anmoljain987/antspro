import "./App.css";

import { useState } from "react";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import FormComp from "./components/FormComp/FormComp";
import TableComp from "./components/TableComp/TableComp";
import SignUp from "./components/SignUp/SignUp";
import NavigationBar from "./components/Home/NavigationBar";
import SignIn from "./components/SignIn/SignIn";
import { Routes, Route } from "react-router-dom";

function Todolist({ dataSource, setDataSource }) {
  return (
    <>
      <FormComp setDataSource={setDataSource} />
      <TableComp dataSource={dataSource} setDataSource={setDataSource}></TableComp>
    </>
  );
}
function App() {
  const [dataSource, setDataSource] = useState([]);

  return (
    <>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        <Route
          path="/todolist/:id"
          element={<Todolist dataSource={dataSource} setDataSource={setDataSource} />}
        />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      {/* <SignUp /> */}
    </>
  );
}

export default App;

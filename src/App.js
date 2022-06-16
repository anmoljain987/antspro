import "./App.css";

import { useState } from "react";

import NavigationBar from "./components/Home/NavigationBar";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./utils/fire";
import RoutesMain from "./Routes/RoutesMain";

function App() {
  const [user] = useAuthState(auth);
  const [dataSource, setDataSource] = useState([]);

  return (
    <>
      <NavigationBar />
      <RoutesMain dataSource={dataSource} setDataSource={setDataSource} />
    </>
  );
}

export default App;

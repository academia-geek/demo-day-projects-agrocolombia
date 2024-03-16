import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { app } from "../Config/FireBase/fireBaseConfig";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PublicRouter from "./PublicRoutes";
import Login from "../Containers/Public/Login";
import Register from "../Containers/Public/Register";
import PrivateRouter from "./PrivateRoutes";
import Dashboard from "./Dashboard";
import Landing from "../Containers/Public/Landing";

function App() {

  const [user, setuser] = useState(false);

  useEffect(() => {
    const auth = getAuth(app);
    onAuthStateChanged(auth, (userAuth) => {
      if (userAuth?.uid) {
        setuser(true);
      } else setuser(false);
    });
  }, [setuser]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<PublicRouter isAutentication={user}><Login /></PublicRouter>} />
        <Route path="/register" element={<PublicRouter isAutentication={user}><Register /></PublicRouter>} />
        <Route path="/*" element={<PrivateRouter isAutentication={user}><Dashboard/></PrivateRouter>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

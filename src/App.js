import { useEffect, useState } from "react";
import Movies from "./components/ui/Movies";
import { auth } from "./config/firebase";
import Home from "./pages/Home";
import { CircularProgress } from "@mui/material";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  setTimeout(() => {
    setUser(auth?.currentUser?.email);
    setLoading(false);
},1000)

  return <>
    {loading ? <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100vh" }}><CircularProgress /></div> : user ? <Movies setUser={setUser}/> : <Home setUser={setUser} />}
  </>;
}

export default App;

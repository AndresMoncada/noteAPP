import './App.css';
import { Route, Routes } from "react-router-dom";
import ArchivedNotes from "./pages/archivedNotes/ArchivedNotes";
import ActiveNotes from "./pages/activeNotes/ActiveNotes";
import Error from "./pages/error/Error";
export const REACT_APP_BASE_URL = "https://noteapp-api.onrender.com/";

function App() {
  return (
    <Routes>
      <Route path="archived" element={<ArchivedNotes />}></Route>
      <Route path="/" element={<ActiveNotes />}></Route>
      <Route path="*" element={<Error />}></Route>
    </Routes>
  );
}

export default App;

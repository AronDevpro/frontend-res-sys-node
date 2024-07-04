import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {useMemo} from "react";
import RouterBuilder from "./utils/route.jsx";

function App() {
  const routes = useMemo(() => RouterBuilder(), []);

  return <RouterProvider router={createBrowserRouter(routes)} />
}

export default App

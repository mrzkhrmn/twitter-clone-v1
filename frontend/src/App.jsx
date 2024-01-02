import { Outlet } from "react-router";
import { Navigation } from "./components/Navigation";
import { Trends } from "./components/Trends";

function App() {
  return (
    <div>
      <Outlet />
    </div>
  );
  // className="flex max-w-6xl mx-auto justify-between py-10
}

export default App;

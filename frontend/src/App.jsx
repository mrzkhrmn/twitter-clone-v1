import { Outlet } from "react-router";
import { HomePage } from "./pages/Homepage";

function App() {
  return (
    <>
      <HomePage />
      <main className="py-3">
        <Outlet />
      </main>
    </>
  );
}

export default App;

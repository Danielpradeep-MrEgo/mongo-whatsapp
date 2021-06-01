import "./App.css";
import HomeBack from "./HomeBack";
import Login from "./Login";
import { useStateValue } from "./StateProvider";

function App() {
  const [{ user }] = useStateValue();

  return <div className="app">{!user ? <Login /> : <HomeBack />}</div>;
}

export default App;

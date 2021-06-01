import Chat from "./Chat";
import "./HomeBack.css";
import Sidebar from "./Sidebar";
import SidebarHeader from "./SidebarHeader";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AddContact from "./AddContact";

function HomeBack() {
  return (
    <div className="homeback">
      <Router>
        <Switch>
          <div className="homeback__main">
            <div className="sidebar">
              <SidebarHeader />
              <Sidebar />
            </div>

            <Route path="/" exact>
              <div className="chat">
                <Chat />
              </div>
            </Route>

            <Route path="/users/:gmail">
              <Chat />
            </Route>

            <Route path="/addContact" exact>
              <div className="chat">
                <AddContact />
              </div>
            </Route>
          </div>
        </Switch>
      </Router>
    </div>
  );
}

export default HomeBack;

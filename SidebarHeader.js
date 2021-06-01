import React, { useState } from "react";
import "./SidebarHeader.css";
import { Avatar, IconButton } from "@material-ui/core";
import MessageIcon from "@material-ui/icons/Message";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { useHistory } from "react-router";
import SearchIcon from "@material-ui/icons/Search";
import { auth } from "./firebase";

function SidebarHeader() {
  const [input, setInput] = useState("");

  const history = useHistory();
  const CreateChat = () => {
    history.push("/addContact");
  };

  const signOut = () => {
    auth.signOut();
  };

  return (
    <div className="sidebar-header">
      <div className="sidebarHeader__icons">
        <Avatar onClick={signOut} />
        <div className="sidebarHeader__right">
          <IconButton>
            <MessageIcon onClick={CreateChat} />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>

      <div className="sidebarHeader__input">
        <SearchIcon />
        <input
          type="text"
          placeholder="Search or Start new chat"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>
    </div>
  );
}

export default SidebarHeader;

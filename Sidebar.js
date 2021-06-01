import React, { useEffect, useState } from "react";
import SidebarChat from "./SidebarChat";
import "./Sidebar.css";
import axios from "axios";
import { useStateValue } from "./StateProvider";

function Sidebar() {
  const [contacts, setContacts] = useState([]);
  const [{ user }] = useStateValue();

  useEffect(async () => {
    const fetchChats = async () => {
      await axios.get("/messages/chats/" + user.email).then((response) => {
        setContacts(response.data);
      });
    };

    fetchChats();
  }, [axios, user]);


  return (
    <div className="sidebar">
      {contacts?.map((contact) => (
        <SidebarChat
          key={contact}
          id={contact._id}
          name={contact.username}
          gmail={contact}
        />
      ))}
    </div>
  );
}

export default Sidebar;

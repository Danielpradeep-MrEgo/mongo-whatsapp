import React, { useEffect, useState } from "react";
import "./SidebarChat.css";
import { Avatar } from "@material-ui/core";
import { Link } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { useStateValue } from "./StateProvider";

function SidebarChat({ id, name, gmail }) {
  const [{ user }] = useStateValue();
  const [receiverMail, setReceiverMail] = useState();

  useEffect(() => {
    const receiverId = gmail.users.find((receiver) => receiver !== user.email);
    setReceiverMail(receiverId);
  }, [receiverMail, gmail]);

  return (
    <div className="sidebarChat">
      <div className="sidebarChat__info">
        <Link to={`/users/${receiverMail}`}>
          <div className="sidebarChat__main">
            <Avatar />
            <div className="sidebarChat__mainInfo">
              <h4>{name}</h4>
              <p>{receiverMail}</p>
            </div>
            {/* <p>5:00 pm</p> */}
          </div>
        </Link>
      </div>
    </div>
  );
}

export default SidebarChat;

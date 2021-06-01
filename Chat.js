import React, { useState, useEffect, useRef } from "react";
import "./Chat.css";
import { Avatar } from "@material-ui/core";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import MicIcon from "@material-ui/icons/Mic";
import { useStateValue } from "./StateProvider";
import { useParams } from "react-router-dom";
import axios from "axios";
import { format } from "timeago.js";
import { io } from "socket.io-client";

function Chat() {
  const [input, setInput] = useState("");
  const [Id, setId] = useState("");
  const [{ user }] = useStateValue();
  const { gmail } = useParams();
  const time = Date.now();
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState();
  const [socketMessages, setSocketMessage] = useState([]);

  const token1 = user.email + gmail;
  const token2 = gmail + user.email;

  const userId = user.email;

  useEffect(() => {
    const socket = io("ws://localhost:8000", {
      query: { userId: user.email },
    });

    setSocket(socket);
  }, [user]);

  useEffect(() => {
    socket?.on("getMessage", (data) => {
      console.log(data);
      setSocketMessage({
        input: data.input,
        sender: data.userId,
      });
    });
  }, [messages]);

  const send = async (e) => {
    e.preventDefault();
    await axios.post("/messages/new", {
      username: user.displayName,
      userEmail: user.email,
      receiverId: gmail,
      users: [token1, token2],
      message: input,
      timestamp: new Date(time).toLocaleString(),
    });

    socket?.emit("sendMessage", {
      userId: userId,
      receiverId: gmail,
      input: input,
    });
    setInput("");
  };

  useEffect(async () => {
    const fetchMessages = async () => {
      await axios.get("/messages/new/" + token1).then((response) => {
        setMessages(response.data);
      });
    };

    fetchMessages();
  }, [gmail, user, axios]);

  return (
    <div className="chat">
      <div className="chat__main">
        <div className="chat__avatar">
          <Avatar />
          <div className="chat__info">
            <h4>{Id}</h4>
            <p>{gmail}</p>
          </div>
        </div>
        <div className="chat__icons">
          <AttachFileIcon className="attchFile" />
          <MoreVertIcon />
        </div>
      </div>

      <div className="chat__body">
        {messages.map((message) => (
          <p
            key={message._id}
            className={
              message.userEmail === user?.email
                ? "chat__receiver"
                : "chat__message"
            }
          >
            <span className="chat__name">{message.userEmail}</span>
            {message.message}
            <span className="chat__timestamp">{format(message.timestamp)}</span>
          </p>
        ))}
      </div>

      <div className="chat__footer">
        <EmojiEmotionsIcon />
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message"
            type="text"
          />
          <button onClick={send} type="submit">
            send a message
          </button>
          <MicIcon />
        </form>
      </div>
    </div>
  );
}

export default Chat;

import { Button } from "@material-ui/core";
import React, { useState } from "react";
import "./AddContact.css";
import axios from "axios";
import { useStateValue } from "./StateProvider";

function AddContact() {
  const [input, setInput] = useState("");
  const [gmail, setGmail] = useState("");
  const [{ user }] = useStateValue();

  const addContact = async () => {
    if (!input || !gmail) {
      alert("please enter valid Details");
    } else {
      try {
        await axios.post("/messages/chats/" + user.email, {
          users: [user.email, gmail],
          username: input,
        });
      } catch (err) {
        alert("chat already exist");
      }
      setInput("");
      setGmail("");
    }
  };
  return (
    <div className="addContact">
      <form onSubmit={addContact} className="addContact__form">
        <input
          type="text"
          placeholder="enter Contact"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <input
          type="text"
          placeholder="enter Gmail"
          value={gmail}
          onChange={(e) => setGmail(e.target.value)}
        />
        <Button onClick={addContact}>Add Contact</Button>
      </form>
    </div>
  );
}

export default AddContact;

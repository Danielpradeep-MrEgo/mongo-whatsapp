import React, { useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { useStateValue } from "./StateProvider";

const SocketContext = React.createContext();

export function useSocket() {
  return useContext(SocketContext);
}

export function SocketProvider({ children }) {
  const [socket, setSocket] = useState();
  const [{ user }, dispatch] = useStateValue();
  const [id, setId] = useState();

  useEffect(() => {
    if (user) {
      setId(user.email);
    }
  }, [user, socket]);

  useEffect(() => {
    const newSocket = io("ws://localhost:5000", {
      transports: ["websocket"],
      query: { id },
    });
    setSocket(newSocket);

    return () => newSocket.close();
  }, [id]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}

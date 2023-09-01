"use client";
import { useState, useEffect, useContext } from "react";
// import { pusher } from "../lib/pusher";
import Peer from "peerjs";
import PeerContext from "../context/PeerContext";

export default function Chat() {
  // const [peer, setPeer] = useState(new Peer());
  const [peerId, setPeerId] = useState("");
  const { peer, setPeer, reset } = useContext(PeerContext);
  const values = useContext(PeerContext);

  const triggerMessage = async () => {
    try {
      await fetch("/api/message");
    } catch (error) {
      console.log("error", error);
    }
    console.log("ok");
  };

  const initPeer = () => {
    const peer = new Peer();
    peer.on("open", (id) => {
      setPeer(peer);
      console.log("My peer ID is: " + id);
    });

    peer.on("connection", (conn) => {
      console.log("a peer connection to me", conn);
      conn.on("data", (data) => {
        console.log("Received", data);
      });
    });
  };

  const connectToPeer = (e) => {
    e.preventDefault();

    const conn = peer.connect(peerId);

    console.log("my connection", conn);

    conn.on("open", () => {
      console.log("open");
      // Receive messages
      conn.on("data", (data) => {
        console.log("Received", data);
      });

      // Send messages
      conn.send("Hello!");
    });
  };

  useEffect(() => {
    // const channel = pusher.subscribe("chat");

    // // updates chats
    // channel.bind("message", (data) => {
    //   console.log("This is your chat message", data);
    // });

    // triggerMessage()
    initPeer();

    // return () => {
    //   pusher.unsubscribe("chat");
    // };
  }, []);
  return (
    <div className="m-2">
      <form className="border" onSubmit={connectToPeer}>
        <input
          className="border"
          type="text"
          placeholder="Enter peer ID to connect"
          onChange={(e) => setPeerId(e.target.value)}
        />
        <button className="border" type="submit">
          Connect
        </button>
      </form>
    </div>
  );
}

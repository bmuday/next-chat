"use client";
import { useState, useEffect } from "react";
import { pusher } from "../lib/pusher";

export default function Chat() {
  useEffect(() => {
    const channel = pusher.subscribe("chat");

    // updates chats
    channel.bind("message", (data) => {
      alert("This is your chat message", data);
    });

    const triggerMessage = async () => {
      try {
        await fetch("/api/message");
      } catch (error) {
        console.log("error", error);
      }
      console.log("ok");
    };
    triggerMessage();

    return () => {
      pusher.unsubscribe("chat");
    };
  }, []);
  return <div>Chat</div>;
}

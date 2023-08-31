import Pusher from "pusher-js";

// Enable pusher logging - don't include this in production
Pusher.logToConsole = true;

console.log("key", process.env.NEXT_PUBLIC_KEY);
console.log("cluster", process.env.NEXT_PUBLIC_CLUSTER);

export const pusher = new Pusher(process.env.NEXT_PUBLIC_KEY, {
  cluster: process.env.NEXT_PUBLIC_CLUSTER,
});

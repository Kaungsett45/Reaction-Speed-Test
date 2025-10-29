
import React, { useState, useRef } from "react";
import { postScore } from "../lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

export default function ReactionTest({ onFinish }) {
  const [status, setStatus] = useState("idle"); // idle | waiting | ready | clicked
  const [message, setMessage] = useState("Click 'Start' to begin!");
  const [reactionTime, setReactionTime] = useState(null);
  const [name, setName] = useState("");
  const [image] = useState(`https://api.dicebear.com/9.x/thumbs/svg?seed=${Math.random()}`);
  const startTime = useRef(null);
  const timeout = useRef(null);

  
  let userId = localStorage.getItem("userId");
  if (!userId) {
    userId = crypto.randomUUID();
    localStorage.setItem("userId", userId);
  }

  const startTest = () => {
    setStatus("waiting");
    setMessage("Wait for green...");
    timeout.current = setTimeout(() => {
      setStatus("ready");
      setMessage("GO!");
      startTime.current = new Date().getTime();
    }, Math.random() * 3000 + 2000); // random 2–5s
  };

  const handleClick = async () => {
    if (status === "waiting") {
      clearTimeout(timeout.current);
      setMessage("Too soon! Click Start again.");
      setStatus("idle");
    } else if (status === "ready") {
      const endTime = new Date().getTime();
      const reaction = endTime - startTime.current;
      setReactionTime(reaction);
      setStatus("clicked");
      setMessage(`Your reaction time: ${reaction} ms`);
      
      const result = await postScore({ id: userId, name: name || "Guest", time: reaction, image });
      if (result && !result.success) {
        console.log('Score saved locally only - backend unavailable');
      }
      
      onFinish(); // Just refresh leaderboard data, don't redirect
    }
  };

  return (
    <Card className="max-w-md mx-auto mt-10 p-6 text-center shadow-lg">
      <CardContent>
        <Avatar className="mx-auto mb-3">
          <AvatarImage src={image} alt="avatar" />
        </Avatar>
        <Input
          placeholder="Enter your name (optional)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mb-3"
        />
        <div
          className={` p-20  rounded-2xl text-xl font-semibold cursor-pointer transition-all duration-200 ${
            status === "ready"
              ? "bg-green-500 text-white"
              : status === "waiting"
              ? "bg-red-500 text-white"
              : "bg-gray-200 text-black"
          }`}
          onClick={handleClick}
        >
          {message}
        </div>
        <Button
          onClick={startTest}
          disabled={status === "waiting"}
          className="w-full mt-6 "
        >
          Start
        </Button>
        {reactionTime && (
          <p className="mt-3 text-gray-700">
            Last Reaction Time: <b>{reactionTime} ms</b>
          </p>
        )}
      </CardContent>
    </Card>
  );
}
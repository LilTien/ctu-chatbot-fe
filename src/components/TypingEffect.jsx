import React from "react";
import { useState, useEffect } from "react";

export default function TypingEffect({ text, speed = 30 }) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    setDisplayed("");
    let i = 1;

    // Show first character immediately
    setDisplayed(text.charAt(0));
    i = 1;

    const interval = setInterval(() => {
      setDisplayed((prev) => prev + text.charAt(i));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return <span>{displayed}</span>;
}


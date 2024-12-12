"use client";

import { useEffect, useState } from "react";

export default function History() {
  const [hours, setHous] = useState(Number);
  const [minutes, setMinutes] = useState(Number);
  const [seconds, setSeconds] = useState(Number);

  useEffect(() => {
    const cookieTime = document.cookie.split("; ").find((row) => row.startsWith("time="))?.split("=")[1];
    let time = 0;
    if (cookieTime) {
      time = Number(cookieTime) / 1000;
    }

    setHous(Math.floor(time / 3600));
    setMinutes(Math.floor((time % 3600) / 60));
    setSeconds(Math.floor((time % 3600) % 60));
  }, []);

  return (
    <>
      <div>
        <h1>合計集中時間</h1>
        <h2>
          {hours.toString().padStart(3, "0")}時間{" "}
          {minutes.toString().padStart(2, "0")}分{" "}
          {seconds.toString().padStart(2, "0")}秒
        </h2>
      </div>
    </>
  );
}

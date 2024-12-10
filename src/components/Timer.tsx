"use client";

import styles from "@/components/Timer.module.css";
import { useRef, useState } from "react";

export function Timer() {
  const [timeStart, setTimeStart] = useState(false);
  const [minutes, setMinutes] = useState(Number);
  const [seconds, setSeconds] = useState(Number);
  const timerInterval = useRef<NodeJS.Timeout | null>(null);
  const [currentTime, setCurrentTime] = useState(Number);
  const [stop, setStop] = useState(false);
  const [lastTime, setLastTime] = useState(Number);
  const [first, setFirst] = useState(true);
  let sum = 0;

  function click(time: number) {
    if (timeStart) {
      return;
    }
    setFirst(false);
    setTimeStart(true);
    let initialTime = time * 1000 * 60;
    // console.log("initialTime" + initialTime);
    setCurrentTime(initialTime);
    setLastTime(initialTime);
    setMinutes(Math.floor(initialTime / 60000));
    setSeconds((initialTime % 60000) / 1000);
    const buttons = Array.from(document.getElementsByClassName(styles.button));
    buttons.forEach((button) => {
      (button as HTMLElement).style.backgroundColor = "#DBCBB6";
      (button as HTMLElement).style.cursor = "not-allowed";
    });

    timerInterval.current = setInterval(function timer() {
      initialTime -= 1000;
      setMinutes(Math.floor(initialTime / 60000));
      setSeconds((initialTime % 60000) / 1000);
      setLastTime(initialTime);
      const storageTime = localStorage.getItem("time");
      sum = Number(storageTime) + 1000;
      localStorage.setItem("time", String(sum));
      if (initialTime < 0) {
        setTimeStart(false);
        reset();
      }
    }, 1000);
  }

  function stopRestart() {
    if (first) {
      return;
    }

    let currentStopTime = currentTime;
    if (lastTime != 0) {
      currentStopTime = lastTime;
    }

    // console.log("initialTime" + currentTime);
    // console.log("currentStopTime" + currentStopTime);
    if (!stop) {
      if (timerInterval.current) {
        clearInterval(timerInterval.current);
      }
      const stops = Array.from(document.getElementsByClassName(styles.stop));
      stops.forEach((stop) => {
        stop.innerHTML = "再開";
      });
      setStop(true);
    } else {
      timerInterval.current = setInterval(function timer() {
        setMinutes(Math.floor(currentStopTime / 60000));
        setSeconds((currentStopTime % 60000) / 1000);
        currentStopTime -= 1000;
        setLastTime(currentStopTime);
        const storageTime = localStorage.getItem("time");
        sum = Number(storageTime) + 1000;
        localStorage.setItem("time", String(sum));
        if (currentStopTime < 0) {
          setTimeStart(false);
          reset();
        }
      }, 1000);
      const stops = Array.from(document.getElementsByClassName(styles.stop));
      stops.forEach((stop) => {
        stop.innerHTML = "一時停止";
      });
      setStop(false);
    }
  }

  function reset() {
    if (first) {
      return;
    }
    if (timerInterval.current) {
      clearInterval(timerInterval.current);
      timerInterval.current = null;
    }
    setLastTime(currentTime);
    setTimeStart(false);
    setMinutes(0);
    setSeconds(0);

    const buttons = Array.from(document.getElementsByClassName(styles.button));
    buttons.forEach((button) => {
      (button as HTMLElement).style.backgroundColor = "#f5f5f5";
      (button as HTMLElement).style.cursor = "pointer";
    });

    const stops = Array.from(document.getElementsByClassName(styles.stop));
    stops.forEach((stop) => {
      stop.innerHTML = "一時停止";
    });
    setStop(false);
    setFirst(true);
  }

  return (
    <>
      <section className={styles.count}>
        <h1 className={styles.h1}>集中時間</h1>
        <p className={styles.time}>
          {minutes.toString().padStart(2, "0")}:
          {seconds.toString().padStart(2, "0")}
        </p>
        <div className={styles.buttons}>
          <button onClick={() => stopRestart()} className={styles.stop}>
            一時停止
          </button>
          <button onClick={() => reset()} className={styles.clear}>
            リセット
          </button>
        </div>
      </section>
      <section className={styles.buttons}>
        <button onClick={() => click(10)} className={styles.button}>
          10m
        </button>
        <button onClick={() => click(30)} className={styles.button}>
          30m
        </button>
        <button onClick={() => click(60)} className={styles.button}>
          60m
        </button>
      </section>
    </>
  );
}

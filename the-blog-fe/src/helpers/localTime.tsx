"use client";
import dateFormat from "dateformat";

export default function LocalTime({ time }: { time: string }) {
  return (
    <span>
      <span>{dateFormat(time, "d mmm yyyy")}, </span>
      <span>{dateFormat(time, "HH:MM")} </span>
    </span>
  );
}

import { preferences } from "user-settings";
import { clockText } from "./elements";

const padNumber = (input: number): string => {
  let inputStr = String(input);

  if (inputStr.length === 1) {
    inputStr = `0${inputStr}`;
  }

  return inputStr;
};

const wrap12Hours = (hours: number) => {
  if (hours > 12) {
    return hours % 12 || 12;
  }

  return hours || 12;
};

export const updateClock = (now: Date) => {
  const use12HourClock = preferences.clockDisplay === "12h";

  const hours = use12HourClock
    ? wrap12Hours(now.getHours())
    : padNumber(now.getHours());

  const minutes = padNumber(now.getMinutes());

  clockText.text = `${hours}:${minutes}`;
};

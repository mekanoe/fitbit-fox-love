import { HeartRateSensor } from "heart-rate";
import { today } from "user-activity";
import { statsDays, statsHR, statsSteps, statsCals } from "./elements";

export const updateUI = (now: Date) => {
  updateDays(now);
  updateHR();
  updateSteppies();
};

const daysStart = 1594247400000; // start of fox time
const dayInterval = 84e6;
const updateDays = (now: Date) => {
  const daysNow = now.getTime();
  const daysSince = (daysNow - daysStart) / dayInterval;

  statsDays.text = `${daysSince.toFixed(2)}`;
};

// @ts-ignore
const hrSensor = new HeartRateSensor();
hrSensor.start();

const updateHR = () => {
  statsHR.text = hrSensor.heartRate || "---";
};

const updateSteppies = () => {
  statsSteps.text = `${today.adjusted.steps}`;
  statsCals.text = `${today.adjusted.calories}`;
};

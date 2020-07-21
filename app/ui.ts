import { display } from "display";
import { HeartRateSensor } from "heart-rate";
import { goals, today } from "user-activity";
import { user } from "user-profile";
import {
  statsDays,
  statsHR,
  statsSteps,
  statsCals,
  statsState,
} from "./elements";

export const updateUI = (now: Date) => {
  updateDays(now);
  updateHR(now);
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

const updateHR = (now: Date) => {
  if (display.on) {
    hrSensor.start();
  } else {
    hrSensor.stop();
    statsHR.text = "LOW";
    return;
  }

  const hr = hrSensor.heartRate;

  if (!hr) {
    statsHR.text = "HIGH";
    return;
  }

  statsHR.text = `${hr}`;

  const hrZone = user.heartRateZone(hr);
  statsState.text = hrZoneText[hrZone] || "CHILL TIME";
};

const hrZoneText = {
  "out-of-range": "NYANKO DAY",
  "below-custom": "NYANKO DAY",
  custom: "HYPER",
  "fat-burn": "HYPER",
  cardio: "ZOOMIES",
  "above-custom": "ZOOMIES",
  peak: "PEAK CAT",
};

const updateSteppies = () => {
  statsSteps.text = `${today.adjusted.steps}`;
  statsCals.text = `${today.adjusted.calories}`;
};

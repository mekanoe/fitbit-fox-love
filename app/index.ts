import clock from "clock";
import { updateClock } from "./clock";
import { updateUI } from "./ui";

clock.granularity = "seconds";

clock.ontick = (evt) => {
  const now = evt.date;

  updateClock(now);
  updateUI(now);
};

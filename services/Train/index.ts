import { deleteTrainById } from "./deleteTrainService";
import { getTrainById} from "./getTrainService";
import { removeDayEspecific } from "./removeDayEspecificService";
import { removeDaysWeekTrain } from "./removeDaysTrainService";
import { saveTrain } from "./saveTrainService";
import { subscribeToTrains } from "./subscribeTrainService";
import { updateDaysWeekTrain } from "./updateDaysTrainService";
import { updateTrainById } from "./updateTrainService";

export {
  getTrainById,
  subscribeToTrains,
  saveTrain,
  deleteTrainById,
  updateDaysWeekTrain,
  updateTrainById,
  removeDaysWeekTrain,
  removeDayEspecific
};
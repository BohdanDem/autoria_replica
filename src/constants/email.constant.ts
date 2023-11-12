import { EEmailAction } from "../enums/email.action.enum";

export const templates = {
  [EEmailAction.AddCAR]: {
    templateName: "add.car.brand",
    subject: "Car brand is missed on autoria_replica platform",
  },
};

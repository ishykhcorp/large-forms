export const carTypes = [
  "coupe",
  "minivan",
  "pickup",
  "sedan",
  "supercar",
  "van",
] as const;

export const modifications = [
  "audio system",
  "lighting",
  "body kit",
  "window tinting",
  "steering weel cover",
] as const;

export const doorLimits = [2, 3, 4] as const;

export type TModificationsCost = Record<(typeof modifications)[number], number>;

export type TDoorsFactoryLimit = Record<
  (typeof carTypes)[number],
  (typeof doorLimits)[number]
>;

export enum ECarsFormFieldNames {
  CARS = "cars",
  TOTAL_COSTS_FOR_CARS = "TOTAL_COSTS_FOR_CARS",
}

export type TCarsForm = {
  [ECarsFormFieldNames.CARS]: TCarFormRow[];
};

export enum ECarFieldNames {
  CAR_TYPE = "carType",
  DOOR_LIMIT = "doorLimit",
  VIN_NUMBER = "vinNumber",
  COST = "cost",
  MODIFICATIONS = "MODIFICATIONS",
}

export type TCarFormRow = {
  [ECarFieldNames.CAR_TYPE]?: (typeof carTypes)[number];
  [ECarFieldNames.DOOR_LIMIT]?: (typeof doorLimits)[number];
  [ECarFieldNames.VIN_NUMBER]: string;
  [ECarFieldNames.COST]: number;
  [ECarFieldNames.MODIFICATIONS]: (typeof modifications)[number][];
};

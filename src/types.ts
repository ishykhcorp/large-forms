export const carTypes = [
  "coupe",
  "minivan",
  "pickup",
  "sedan",
  "supercar",
  "van",
] as const;

export const doorLimits = [2, 3, 4] as const;

export type TDoorsFactoryLimit = Record<
  (typeof carTypes)[number],
  (typeof doorLimits)[number]
>;

export enum ECarFieldNames {
  CAR_TYPE = "carType",
  OWNER_PHONE = "ownerPhone",
  DOOR_LIMIT = "doorLimit",
  VIN_NUMBER = "vinNumber",
}

export type TCarFormRow = {
  [ECarFieldNames.CAR_TYPE]?: (typeof carTypes)[number];
  [ECarFieldNames.DOOR_LIMIT]?: (typeof doorLimits)[number];
  [ECarFieldNames.OWNER_PHONE]?: string;
  [ECarFieldNames.VIN_NUMBER]: string;
};

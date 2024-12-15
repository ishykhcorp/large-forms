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

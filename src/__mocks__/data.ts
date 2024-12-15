import { faker } from "@faker-js/faker";
import {
  ECarFieldNames,
  TCarFormRow,
  TDoorsFactoryLimit,
  carTypes,
} from "../types";

export const doorLimits: TDoorsFactoryLimit = {
  coupe: 2,
  minivan: 2,
  pickup: 2,
  sedan: 4,
  supercar: 2,
  van: 3,
};

export const generateCarsData = (totalCars: number) => {
  const vins = faker.helpers.uniqueArray(faker.vehicle.vin, totalCars);

  return Array.from({ length: totalCars }).map(
    (_: unknown, index: number): TCarFormRow => ({
      [ECarFieldNames.CAR_TYPE]: faker.helpers.arrayElement([
        undefined,
        ...carTypes,
      ]),
      [ECarFieldNames.OWNER_PHONE]: faker.helpers.arrayElement([
        faker.phone.number({ style: "international" }),
        undefined,
      ]),
      [ECarFieldNames.VIN_NUMBER]: vins[index],
    })
  );
};

import { faker } from "@faker-js/faker";
import {
  ECarFieldNames,
  TCarFormRow,
  TDoorsFactoryLimit,
  TModificationsCost,
  carTypes,
  modifications,
} from "../types";
import { DefaultOptionType } from "antd/es/select";

export const doorLimitsByCarType: TDoorsFactoryLimit = {
  coupe: 2,
  minivan: 2,
  pickup: 2,
  sedan: 4,
  supercar: 2,
  van: 3,
};

export const modificationsCost: TModificationsCost = {
  "audio system": 1800,
  "body kit": 7000,
  lighting: 1000,
  "steering weel cover": 1200,
  "window tinting": 900,
};

export const generateCarsData = (totalCars: number) => {
  const vins = faker.helpers.uniqueArray(faker.vehicle.vin, totalCars);

  return Array.from({ length: totalCars }).map(
    (_: unknown, index: number): TCarFormRow => ({
      [ECarFieldNames.CAR_TYPE]: faker.helpers.arrayElement([
        undefined,
        ...carTypes,
      ]),
      [ECarFieldNames.DOOR_LIMIT]: undefined,
      [ECarFieldNames.VIN_NUMBER]: vins[index],
      [ECarFieldNames.COST]: Number(
        faker.finance.amount({ min: 8000, max: 25000 })
      ),
      [ECarFieldNames.MODIFICATIONS]:
        faker.helpers.arrayElements(modifications),
    })
  );
};

export const transformArrayToSelectOptions = (
  arr: string[]
): DefaultOptionType[] =>
  arr.map((item) => ({
    label: item,
    value: item,
  }));

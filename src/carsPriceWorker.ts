import { modificationsCost } from "./__mocks__/data";
import { ECarFieldNames, TCarFormRow } from "./types";

self.onmessage = (event) => {
  const totalCost = (event.data as TCarFormRow[]).reduce(
    (acc, car) =>
      acc +
      (car[ECarFieldNames.COST] || 0) +
      car[ECarFieldNames.MODIFICATIONS].reduce(
        (costForModifications, modification) =>
          costForModifications + modificationsCost[modification],
        0
      ),
    0
  );

  postMessage(totalCost);
};

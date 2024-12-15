import { memo, useMemo } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import {
  ECarFieldNames,
  ECarsFormFieldNames,
  TCarFormRow,
  TCarsForm,
} from "../../types";
import { modificationsCost } from "../../__mocks__/data";

type TCostWithModificationColumnProps = {
  name: `${ECarsFormFieldNames.CARS}.${number}`;
};

export const CostWithModificationColumn =
  memo<TCostWithModificationColumnProps>(({ name }) => {
    const { control } = useFormContext<TCarsForm>();
    const carRow = useWatch<TCarsForm>({ control, name }) as TCarFormRow;

    const {
      [ECarFieldNames.COST]: carCost,
      [ECarFieldNames.MODIFICATIONS]: carModifications,
    } = carRow;

    const computedCost = useMemo(
      () =>
        carModifications.reduce(
          (acc, currentModification) =>
            acc + modificationsCost[currentModification],
          carCost || 0
        ),
      [carModifications, carCost]
    );

    return computedCost;
  });

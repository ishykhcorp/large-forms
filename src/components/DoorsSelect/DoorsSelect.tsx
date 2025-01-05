import { memo, useCallback } from 'react';
import {
  doorLimits,
  ECarFieldNames,
  ECarsFormFieldNames,
  TCarsForm,
} from '../../types';
import {
  doorLimitsByCarType,
  transformArrayToSelectOptions,
} from '../../__mocks__/data';
import { SelectFormField } from '../SelectFormField';
import { useFormContext, useWatch } from 'react-hook-form';

type DoorsSelectProps = {
  index: number;
};

const doorsOptions = transformArrayToSelectOptions(
  Array.of(...doorLimits).map(String),
);

export const DoorsSelect = memo<DoorsSelectProps>(({ index }) => {
  const { control } = useFormContext<TCarsForm>();
  const carType = useWatch<TCarsForm>({
    control,
    name: `${ECarsFormFieldNames.CARS}.${index}.${ECarFieldNames.CAR_TYPE}`,
  });

  const validate = useCallback(
    (value: string) => {
      const allowedDoors = doorLimitsByCarType[carType];
      let result: true | string = true;

      if (allowedDoors) {
        result =
          Number(value) !== allowedDoors
            ? `Wrong door limit for ${carType}`
            : true;
      }
      return result;
    },
    [carType],
  );

  return (
    <SelectFormField
      name={`${ECarsFormFieldNames.CARS}.${index}.${ECarFieldNames.DOOR_LIMIT}`}
      options={doorsOptions}
      required="Doors is required"
      width="100%"
      validate={validate}
    />
  );
});

import { memo } from "react";
import { useController, useFormContext } from "react-hook-form";
import { ECarFieldNames, ECarsFormFieldNames, TCarsForm } from "../../types";
import { InputNumber, Typography } from "antd";

type TNumberInputProps = {
  name: `${ECarsFormFieldNames.CARS}.${number}.${ECarFieldNames}`;
  required?: string;
  min?: number;
  max?: number;
  disabled?: boolean;
  step?: number;
};

export const NumberInput = memo<TNumberInputProps>(
  ({ name, required, min, max, disabled, step }) => {
    const { control } = useFormContext<TCarsForm>();
    const { field, fieldState } = useController<TCarsForm>({
      name,
      control,
      rules: {
        required,
        max,
        min,
      },
      disabled,
    });

    return (
      <>
        <InputNumber
          ref={field.ref}
          value={field.value}
          onChange={field.onChange}
          onBlur={field.onBlur}
          name={field.name}
          disabled={field.disabled}
          step={step}
          min={min}
          max={max}
        />
        {fieldState.error?.message && (
          <Typography.Paragraph type="danger">
            {fieldState.error?.message}
          </Typography.Paragraph>
        )}
      </>
    );
  }
);

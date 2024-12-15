import { Select, Typography } from "antd";
import { DefaultOptionType } from "antd/es/select";
import { CSSProperties, memo } from "react";
import { ECarFieldNames, ECarsFormFieldNames, TCarsForm } from "../../types";
import { useController, useFormContext, Validate } from "react-hook-form";

type SelectFormFieldProps = {
  options?: DefaultOptionType[];
  mode?: "multiple";
  disabled?: boolean;
  required?: string;
  name: `${ECarsFormFieldNames.CARS}.${number}.${ECarFieldNames}`;
  width?: CSSProperties["width"];
  validate?: Validate<never, TCarsForm>;
};

export const SelectFormField = memo<SelectFormFieldProps>(
  ({ options, mode, disabled, required, name, width, validate }) => {
    const { control } = useFormContext<TCarsForm>();
    const { field, fieldState } = useController<TCarsForm>({
      name,
      control,
      rules: {
        required,
        validate,
      },
      disabled,
    });

    return (
      <>
        <Select
          {...field}
          defaultValue={field.value}
          mode={mode}
          options={options}
          style={{
            width,
          }}
        />
        {fieldState.error?.message && (
          <Typography.Paragraph type="danger">
            {fieldState.error.message}
          </Typography.Paragraph>
        )}
      </>
    );
  }
);

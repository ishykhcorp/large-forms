import { memo } from 'react';
import { ECarFieldNames, ECarsFormFieldNames, TCarsForm } from '../../types';
import { useController, useFormContext } from 'react-hook-form';
import { Input, Typography } from 'antd';

type TTextInputProps = {
  name: `${ECarsFormFieldNames.CARS}.${number}.${ECarFieldNames}`;
  required?: string;
  disabled?: boolean;
  readOnly?: boolean;
};

export const TextInput = memo<TTextInputProps>(
  ({ name, required, disabled, readOnly }) => {
    const { control } = useFormContext<TCarsForm>();
    const { field, fieldState } = useController<TCarsForm>({
      name,
      control,
      rules: {
        required,
      },
      disabled,
    });

    return (
      <>
        <Input {...field} defaultValue={field.value} readOnly={readOnly} />
        {fieldState.error?.message && (
          <Typography.Paragraph type="danger">
            {fieldState.error.message}
          </Typography.Paragraph>
        )}
      </>
    );
  },
);

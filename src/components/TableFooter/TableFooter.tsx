import { Button, Flex, Typography } from "antd";
import { memo } from "react";
import { ECarsFormFieldNames, TCarsForm } from "../../types";
import { useWebWorker } from "../../hooks/useWebWorker";
import { useFormContext, useWatch } from "react-hook-form";

export const TableFooter = memo(() => {
  const { control } = useFormContext<TCarsForm>();
  const data = useWatch<TCarsForm>({
    name: ECarsFormFieldNames.CARS,
    control,
  });
  const { loading, result } = useWebWorker(data);

  return (
    <Flex justify="flex-end" align="center" gap={16}>
      <Typography.Text>
        All cars price: {loading ? "...Calculating" : result}
      </Typography.Text>
      <Button htmlType="submit">Submit</Button>
    </Flex>
  );
});

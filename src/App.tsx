import {
  generateCarsData,
  transformArrayToSelectOptions,
} from "./__mocks__/data";
import "./App.css";
import { Button, Form, Table, TableProps } from "antd";
import {
  carTypes,
  doorLimits,
  ECarFieldNames,
  ECarsFormFieldNames,
  modifications,
  TCarFormRow,
  TCarsForm,
} from "./types";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { CostWithModificationColumn } from "./components/CostWithModificationColumn";
import { NumberInput } from "./components/NumberInput";
import { SelectFormField } from "./components/SelectFormField";
import { TextInput } from "./components/TextInput";
import { TableFooter } from "./components/TableFooter";
import { useCallback } from "react";
import { DoorsSelect } from "./components/DoorsSelect";

const data = generateCarsData(8000);

const modificationOptions = transformArrayToSelectOptions(
  Array.of(...modifications)
);

const carTypesOptions = transformArrayToSelectOptions(Array.of(...carTypes));

function App() {
  const formMethods = useForm<TCarsForm>({
    defaultValues: {
      [ECarsFormFieldNames.CARS]: data,
    },
  });

  const { fields, remove } = useFieldArray({
    control: formMethods.control,
    name: ECarsFormFieldNames.CARS,
  });

  const columns: TableProps<TCarFormRow>["columns"] = [
    {
      title: "Vin Number",
      dataIndex: ECarFieldNames.VIN_NUMBER,
      width: 150,
      fixed: "left",
      render: (_, __, index) => (
        <TextInput
          name={`${ECarsFormFieldNames.CARS}.${index}.${ECarFieldNames.VIN_NUMBER}`}
          required="Vin number is required"
          readOnly
        />
      ),
    },
    {
      title: "Car Type",
      dataIndex: ECarFieldNames.CAR_TYPE,
      width: 100,
      render: (_, __, index) => (
        <SelectFormField
          name={`${ECarsFormFieldNames.CARS}.${index}.${ECarFieldNames.CAR_TYPE}`}
          options={carTypesOptions}
          required="Car type is required"
          width="100%"
        />
      ),
    },
    {
      title: "Door Limit",
      dataIndex: ECarFieldNames.DOOR_LIMIT,
      width: 70,
      render: (_, __, index) => <DoorsSelect index={index} />,
    },
    {
      title: "Modification",
      dataIndex: ECarFieldNames.MODIFICATIONS,
      width: 100,
      render: (_, __, index) => (
        <SelectFormField
          name={`${ECarsFormFieldNames.CARS}.${index}.${ECarFieldNames.MODIFICATIONS}`}
          options={modificationOptions}
          mode="multiple"
          width="100%"
        />
      ),
    },
    {
      title: "Cost",
      dataIndex: ECarFieldNames.COST,
      width: 80,
      render: (_, __, index) => (
        <NumberInput
          name={`${ECarsFormFieldNames.CARS}.${index}.${ECarFieldNames.COST}`}
          step={1000}
          min={0}
          max={100000}
          required="Cost field is required for car"
        />
      ),
    },
    {
      title: "Cost with modifications",
      dataIndex: "costWithModifications",
      width: 80,
      render: (_, __, index) => (
        <CostWithModificationColumn
          name={`${ECarsFormFieldNames.CARS}.${index}`}
        />
      ),
    },
    {
      title: "Action",
      fixed: "right",
      width: 50,
      render: (_, __, index) => (
        <Button onClick={() => remove(index)}>Remove</Button>
      ),
    },
  ];

  const onSubmit = useCallback((data: TCarsForm) => {
    console.log("Form data", data);
  }, []);

  return (
    <FormProvider {...formMethods}>
      <Form onFinish={formMethods.handleSubmit(onSubmit)}>
        <Table<TCarFormRow>
          bordered
          virtual
          scroll={{ x: 400, y: 300 }}
          columns={columns}
          rowKey={ECarFieldNames.VIN_NUMBER}
          dataSource={fields}
          pagination={false}
          footer={() => <TableFooter />}
        />
      </Form>
    </FormProvider>
  );
}

export default App;

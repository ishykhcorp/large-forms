import { generateCarsData } from "./__mocks__/data";
import "./App.css";
import { Table, TableProps } from "antd";
import { ECarFieldNames, TCarFormRow } from "./types";
import { FormProvider, useForm } from "react-hook-form";

const data = generateCarsData(200);

const columns: TableProps<TCarFormRow>['columns'] = [
  {
    title: "Vin Number",
    dataIndex: ECarFieldNames.VIN_NUMBER,
    width: 150,
    fixed: 'left'
  },
  {
    title: 'Owner Phone',
    dataIndex: ECarFieldNames.OWNER_PHONE,
    width: 150
  },
  {
    title: 'Car Type',
    dataIndex: ECarFieldNames.CAR_TYPE,
    width: 200
  },
  {
    title: 'Door Limit',
    dataIndex: ECarFieldNames.DOOR_LIMIT,
    width: 140
  }
];

function App() {
  const formMethods = useForm({
    defaultValues: data
  });

  return (
    <FormProvider {...formMethods}>
      <Table<TCarFormRow>
        bordered
        virtual
        scroll={{ x: 400, y: 300 }}
        columns={columns}
        rowKey={ECarFieldNames.VIN_NUMBER}
        dataSource={data}
        pagination={false}
      />
    </FormProvider>
  );
}

export default App;

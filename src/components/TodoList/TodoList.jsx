import TableComp from "../TableComp/TableComp";
import FormComp from "../FormComp/FormComp";
export function Todolist({ dataSource, setDataSource }) {
  return (
    <>
      <FormComp setDataSource={setDataSource} />
      <TableComp dataSource={dataSource} setDataSource={setDataSource}></TableComp>
    </>
  );
}

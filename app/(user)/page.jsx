import Button from "../../components/Buttons";
import DataTable from "../../components/DataTable";

export default function TablePage() {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Table Page</h1>
      <div className="flex justify-end">
        <Button />
      </div>
      <DataTable />
    </div>
  );
}

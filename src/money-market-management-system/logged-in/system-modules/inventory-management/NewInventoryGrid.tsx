import { observer } from "mobx-react-lite";

export const NewInventoryGrid = observer(({ data }: { data: any[] }) => {
  return (
    <table className="uk-table uk-table-hover uk-table-divider">
      <thead>
        <tr>
          <th>Inventory Code</th>
          <th>Name</th>
          <th>Status</th>
          <th>Created Date</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <td>{item.inventoryCode}</td>
            <td>{item.name}</td>
            <td>{item.status}</td>
            <td>{new Date(item.createdAt).toLocaleDateString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
});

import { statusesList } from "../types/statuses";

export default function StatusDropdown() {
  return (
    <select>
      {statusesList.map((status) => (
        <option key={status} value={status}>
          {status}
        </option>
      ))}
    </select>
  );
}

import { MenuItem, Select, type SelectChangeEvent } from "@mui/material";
import { statusesList } from "../types/statuses";

interface StatusDropdownProps {
  current: string;
  onChange: (event: SelectChangeEvent<string>) => void;
}

export default function StatusDropdown({
  current,
  onChange,
}: StatusDropdownProps) {
  return (
    <Select
      value={current}
      onChange={onChange}
      sx={{ width: 200, height: "auto" }}
    >
      {statusesList.map((status) => (
        <MenuItem key={status} value={status}>
          {status}
        </MenuItem>
      ))}
    </Select>
  );
}

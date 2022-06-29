import { ListSubheader } from "@mui/material";

export default function TransactionGroup ({ date, children }) {
  return (
    <li key={date}>
      <ul>
        <ListSubheader>{date}</ListSubheader>
        {children}
      </ul>
    </li>
  )
}

import { ListSubheader } from '@mui/material'

export default function TransactionGroup ({ date, children }) {
  return (
    <li key={date}>
      <ul>
        <ListSubheader style={{ backgroundColor: 'inherit' }}>
          {date}
        </ListSubheader>
        {children}
      </ul>
    </li>
  )
}

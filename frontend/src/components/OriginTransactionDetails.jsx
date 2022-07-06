import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';
import { Box, List, ListItem, ListItemText } from '@mui/material';

export default function OriginTransactionDetails ({ children, primary }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <SubdirectoryArrowRightIcon
        sx={{ color: 'action.active', mr: 2, my: 2 }}
      />
      <Box style={{ flexGrow: 1 }}>
        <List disablePadding dense>
          <ListItem disableGutters>
            <ListItemText
              primary={primary}
              primaryTypographyProps={{ noWrap: true }}
              secondary={children}
              secondaryTypographyProps={{ component: 'span' }}
            />
          </ListItem>
        </List>
      </Box>
    </Box>
  )
}

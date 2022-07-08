import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  AppBar,
  Box,
  List,
  Toolbar,
  Typography
} from '@mui/material'

const ACCORDION_LABEL = {
  sended: 'Continhas enviadas',
  received: 'Continhas recebidas',
  confirmed: 'Continhas confirmadas'
}

const getAccordionLabel = (category, quantity) => {
  return `${ACCORDION_LABEL[category]}${
    category !== 'confirmed' ? ` (${quantity})` : ''
  }`
}

export default function AccordionGroup ({
  children,
  color,
  category,
  quantity,
  total
}) {
  return (
    <Box>
      <Accordion defaultExpanded={category === 'confirmed'}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>{getAccordionLabel(category, quantity)}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List
            dense
            subheader={<li />}
            sx={{
              '& ul': { padding: 0 },
              '& li': { padding: 0 }
            }}
          >
            {children}
          </List>
        </AccordionDetails>
      </Accordion>
      {category === 'confirmed' && (
        <Box sx={{ height: '56px' }}>
          <AppBar
            position='fixed'
            color='primary'
            sx={{ top: 'auto', bottom: 0, alignItems: 'center', mt: 2 }}
          >
            <Toolbar>
              <Typography color={`${color}.main`}>
                Saldo confirmado: {total}
              </Typography>
            </Toolbar>
          </AppBar>
        </Box>
      )}
    </Box>
  )
}

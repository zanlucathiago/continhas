import { Box, Skeleton } from "@mui/material";

export default function FetchSkeleton () {
  return (
    <Box
      sx={{
        left: 0,
        p: 2,
        top: '50%',
        position: 'absolute',
        transform: 'translate(0px, -50%)',
        width: '100%'
      }}
    >
      {Array(4)
        .fill()
        .map((_item, index) => (
          <Skeleton height={41} key={index} />
        ))}
    </Box>
  )
}

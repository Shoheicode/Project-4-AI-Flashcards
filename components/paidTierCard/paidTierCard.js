import { Box, Button, Grid, Typography } from "@mui/material";

export default function PaidTierCard({
  bgcolor,
  tierName,
  price,
  description,
}) {
  return (
    <Grid item xs={12} md={6}>
      <Box
        height={180}
        border={"2px solid black"}
        borderRadius={3}
        bgcolor={bgcolor}
      >
        <Typography variant="h4">{tierName}</Typography>
        <Typography variant="h5">{price}</Typography>
        <Typography>{description}</Typography>
        <Button variant="contained" color="primary">
          Choose {tierName}
        </Button>
      </Box>
    </Grid>
  );
}

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
        height={220}
        border={"2px solid black"}
        borderRadius={3}
        bgcolor={bgcolor}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="h4">{tierName}</Typography>
        <Typography variant="h5" sx={{ marginBottom: "0.5em" }}>
          {price}
        </Typography>
        <Typography>{description}</Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ fontSize: 16, marginTop: "1.5em" }}
        >
          Choose {tierName}
        </Button>
      </Box>
    </Grid>
  );
}

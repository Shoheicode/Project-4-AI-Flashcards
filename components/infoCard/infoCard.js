import { Box, Grid, Typography } from "@mui/material";

export default function InfoCard({ icon, title, subtitle }) {
  return (
    <Grid item xs={12} md={4}>
      {icon}
      <Typography variant="h6">{title}</Typography>
      <Typography>{subtitle}</Typography>
    </Grid>
  );
}

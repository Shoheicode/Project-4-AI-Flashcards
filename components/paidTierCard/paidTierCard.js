import { Box, Button, Grid, Typography } from "@mui/material";
import getStripe from "@/app/utils/getStripe";

export default function PaidTierCard({
  bgcolor,
  tierName,
  price,
  description,
}) {
  const handleSubmit = async () => {
    const checkoutSession = await fetch("/api/checkout_session", {
      method: "POST",
      headers: { origin: "http://localhost:3000" },
      body: JSON.stringify({
        plan: tierName,
      }),
    });
    const checkoutSessionJson = await checkoutSession.json();

    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJson.id,
    });

    if (error) {
      console.warn(error.message);
    }
  };

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
          onClick={handleSubmit}
        >
          Choose {tierName}
        </Button>
      </Box>
    </Grid>
  );
}

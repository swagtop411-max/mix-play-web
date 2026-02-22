const express = require("express");
const app = express();
const stripe = require("stripe")("SUA_CHAVE_SECRETA_DO_STRIPE");

app.use(express.static("public"));
app.use(express.json());

app.post("/create-checkout-session", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [{
      price_data: {
        currency: "brl",
        product_data: {
          name: "Desbloqueio Mix Play PRO"
        },
        unit_amount: 1000 // R$10,00 (valor em centavos)
      },
      quantity: 1
    }],
    mode: "payment",
    success_url: `${req.headers.origin}?success=true`,
    cancel_url: `${req.headers.origin}?canceled=true`
  });
  res.json({ id: session.id });
});

app.listen(4242, () => console.log("Servidor rodando na porta 4242"));

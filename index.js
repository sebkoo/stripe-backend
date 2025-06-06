const express = require('express');
const Stripe = require('stripe');
const cors = require('cors');
require('dotenv').config();

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const app = express();
app.use(cors());
app.use(express.json());

app.post('/create-payment-intent', async (req, res) => {
  const { amount } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // convert to cents
      currency: 'usd',
    });
    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Payment Intent creation failed' });
  }
});

app.listen(4242, () => console.log('🚀 Server running on port 4242'));

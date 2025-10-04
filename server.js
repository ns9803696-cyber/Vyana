// server.js - Node/Express backend for Razorpay order creation and verification
const express = require('express');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Provide these via environment variables on your host (VERCEL/RENDER/RAILWAY)
const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID || '<REPLACE_RAZORPAY_KEY_ID>';
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || '<REPLACE_RAZORPAY_KEY_SECRET>';

if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
  console.warn('Razorpay keys missing. Set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in env.');
}

const razorpay = new Razorpay({ key_id: RAZORPAY_KEY_ID, key_secret: RAZORPAY_KEY_SECRET });

// Create order endpoint
app.post('/create-order', async (req, res) => {
  try {
    const { amount, currency = 'INR', receipt } = req.body;
    if (!amount || isNaN(amount)) return res.status(400).json({ error: 'Invalid amount' });
    const options = { amount: Math.round(amount * 100), currency, receipt: receipt || `rcpt_${Date.now()}` };
    const order = await razorpay.orders.create(options);
    res.json({ success:true, order });
  } catch (err) {
    console.error('create-order err', err);
    res.status(500).json({ error: 'create order failed', detail: err.message });
  }
});

// Verify payment signature
app.post('/verify-payment', (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ verified: false, error: 'Missing fields' });
    }
    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto.createHmac('sha256', RAZORPAY_KEY_SECRET).update(body.toString()).digest('hex');
    const valid = expectedSignature === razorpay_signature;
    if (valid) return res.json({ verified: true });
    else return res.status(400).json({ verified:false, error:'Invalid signature' });
  } catch (err) {
    console.error('verify-payment err', err);
    res.status(500).json({ verified:false, error:err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>console.log('Server listening on', PORT));

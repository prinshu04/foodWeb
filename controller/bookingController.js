const planModel=require("../model/planModel");
const stripe = require('stripe')('sk_test_3eGpUVHAFvvz8mQ8SWsbZ5Kl00tzfU3bfg');

module.exports.checkout=async function(req,res){
    const id=req.body.id;
    const plan=await planModel.findById(id);
    console.log(plan);
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{
          name: plan.name,
          description:plan.description,
        //   images: ['https://example.com/t-shirt.png'],
          amount: plan.price*100,
          currency: 'inr',
          quantity: 1,
        }],
        success_url: '/',
        cancel_url: '/',
      });
    res.status(201).json({
        data:plan,
        success:"payment object send",
        session
    })
    console.log(session)
};


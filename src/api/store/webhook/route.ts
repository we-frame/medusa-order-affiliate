import { CartService, MedusaRequest, MedusaResponse, Order, OrderService } from "@medusajs/medusa";
import {UpdateOrderInput} from "@medusajs/medusa/dist/types/orders"
import AffiliateService from "../../../services/affiliate";
import Stripe from "stripe";
import { PaymentService } from "@medusajs/medusa/dist/services";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_KEY as string);

export async function POST(req: MedusaRequest, res: MedusaResponse) {

  const sig = req.headers["stripe-signature"];
  let event:Stripe.Event;
  const secret:string = "whsec_14dd11f98b9a51d5685240e0441d8c999fae143db853155db9cd399d39cf46b7";

  try {
    event = stripe.webhooks.constructEvent(req.body as Buffer, sig, secret);
  } catch (err) {
    console.log(`Webhook Error: ${err.message}`);
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  console.log("STRIPE WEBHOOK EVENT: ", event.type);

  try {
  	switch (event.type) {
  		case 'charge.succeeded':
			const stripeChargeData:Stripe.Charge = event.data.object;
			const cartService:CartService = req.scope.resolve("cartService");
			// await cartService.authorizePayment(stripeChargeData.metadata.resource_id)
			console.log("cart payment authorized =================");
  			break;

  		default:
  			console.log(`Unhandled event type ${event.type}`);
  	}

  	res.status(200).send();
  } catch (error) {
  	console.log("[EXT ERROR] [] => ", error.message);
  }
}

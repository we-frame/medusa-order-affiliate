import {
  type ScheduledJobConfig,
  type ScheduledJobArgs,
} from "@medusajs/medusa";
import PayoutService from "../services/payout";
import { Payout } from "../models/payout";
// import { CLIENT_ID, CLIENT_SECRET } from "../admin/utils/pyapalcreds"
import axios from "axios";
import AffilateOrderService from "../services/affilateOrder";
import { Order } from "../models/order";

const BASE_API_URL: string = "https://api-m.sandbox.paypal.com";

export default async function handler({
  container,
  data,
  pluginOptions,
}: ScheduledJobArgs) {
  try {
    const payoutService: PayoutService = container.resolve("payoutService");
    const affilateOrderService: AffilateOrderService =
      new AffilateOrderService();
    const payouts: Payout[] = await payoutService.retrievePending();

    const clientId =
      pluginOptions["paypal_client_id"] != null
        ? pluginOptions["paypal_client_id"]
        : "";
    const clientSecret =
      pluginOptions["paypal_client_secret"] != null
        ? pluginOptions["paypal_client_secret"]
        : "";
    const basePath =
      pluginOptions["paypal_api_url"] != null
        ? pluginOptions["paypal_api_url"]
        : BASE_API_URL;

    const reqBody = new URLSearchParams();
    reqBody.append("grant_type", "client_credentials");
    reqBody.append("ignoreCache", "true");
    reqBody.append("return_authn_schemes", "true");
    reqBody.append("return_client_metadata", "true");
    reqBody.append("return_unconsented_scopes", "true");

    const bufClientId = Buffer.from(clientId + ":" + clientSecret);
    const authorizationToken1: string =
      "Basic " + bufClientId.toString("base64");

    const tokenRequestConfig = {
      method: "POST",
      url: `${basePath}/v1/oauth2/token`,
      maxBodyLength: Infinity,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: authorizationToken1,
      },
      data: reqBody,
    };

    const tokenResponse = await axios.request(tokenRequestConfig);

    if (tokenResponse.status == 200) {
      for (const payout of payouts) {
        console.log(payout);

        if (payout.paypal_payout_link != null) {
          const payoutResponse = await axios.request({
            method: "GET",
            url: payout.paypal_payout_link,
            maxContentLength: Infinity,
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${tokenResponse.data.access_token}`,
            },
          });

          if (payoutResponse.status == 200) {
            console.log("[SCHEDULAR] => payoutResponse: ", payoutResponse.data);
            if (payoutResponse.data.batch_header.batch_status == "SUCCESS") {
              payout.status = "SUCCESS";
              await payoutService.update(payout);
              const order: Order = new Order();
              order.id = payout.order_id;
              order.payout_status = "SUCCESS";
              await affilateOrderService.updateAffiliateOrder(order);
            }
          }
        }
      }
    }
  } catch (error) {
    console.log(
      "[ERROR] [check-payout-status-every-minute] => ",
      error.message
    );
  }
}

export const config: ScheduledJobConfig = {
  name: "check-payout-status-every-minute",
  schedule: "* * * * *",
  data: {},
};

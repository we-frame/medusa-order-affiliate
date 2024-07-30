import { CartService, MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import { CartUpdateProps } from "@medusajs/medusa/dist/types/cart";

export async function PATCH(req: MedusaRequest, res: MedusaResponse) {
    try {
        const cartService = req.scope.resolve<CartService>("cartService")
        const cartId = req.params["id"] as string;
        const updateBody: CartUpdateProps = {...req.body as CartUpdateProps};
        const updatedCart = await cartService.update(cartId, updateBody)
        return res.json(updatedCart)
    } catch (error) {
        return res.status(400).send({})
    }
    // const affiliate_ids = req.query["ids"] as string;
    // const affiliateIds = affiliate_ids.split(",")
    // // const affiliateData = await cartService.fetchMultipleByIds(affiliateIds)
    // console.log("affiliate_ids: ", affiliateIds);
    // res.json(affiliateData)
}
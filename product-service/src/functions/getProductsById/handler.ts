import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import ProductServerice from "../../product-service";

const productService = new ProductServerice();

import schema from "./schema";

const getProductsById: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const id = event.pathParameters.productId;

  try {
    const product = await productService.getProductsById(id);

    if (!product) {
      throw Error("Product not found");
    }

    return formatJSONResponse({
      product,
    });
  } catch (e) {
    return formatJSONResponse({
      status: 500,
      message: e,
    });
  }
};

export const main = middyfy(getProductsById);

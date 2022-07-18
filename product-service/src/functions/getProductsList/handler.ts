import { APIGatewayProxyResult } from "aws-lambda";
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import ProductServerice from "../../product-service";

const productService = new ProductServerice();

const getProductsList = async ():Promise<APIGatewayProxyResult> => {
  try {
    const products = await productService.getProductsList();
    return formatJSONResponse(products);
  } catch (e) {
    return formatJSONResponse({
      status: 500,
      message: e,
    });
  }
};

export const main = middyfy(getProductsList);

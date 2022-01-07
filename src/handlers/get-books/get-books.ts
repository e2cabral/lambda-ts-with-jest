import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { badRequest, ok } from '../../helpers/http-helpers';
import { validateGetBooks } from '../../validation/book/validator';

export const handle = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const perPage = event.queryStringParameters?.perPage;
    const currentPage = event.queryStringParameters?.currentPage;

    validateGetBooks(perPage, currentPage);

    return ok([]);
  } catch (err) {
    return badRequest((err as Error));
  }
};

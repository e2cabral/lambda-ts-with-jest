import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { badRequest, noContent } from '../../helpers/http-helpers';
import { validateUpdateBook } from '../../validation/book/validator';

export const handle = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const id = event.pathParameters?.id;
    const { body } = event;

    validateUpdateBook(body, id!);

    return noContent();
  } catch (err) {
    return badRequest((err as Error));
  }
};

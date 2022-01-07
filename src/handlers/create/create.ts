import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { Book } from '../../domain/book.model';
import { validateCreateBooks } from '../../validation/book/validator';
import { badRequest, noContent } from '../../helpers/http-helpers';

export const handle = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const book = JSON.parse(event.body!) as Book;

    validateCreateBooks(book);

    return noContent();
  } catch (e) {
    return badRequest((e as Error));
  }
};

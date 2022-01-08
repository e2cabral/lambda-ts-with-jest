import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { Book } from '../../domain/book.model';
import { badRequest, ok } from '../../helpers/http-helpers';
import { validateGetBook } from '../../validation/book/validator';

export const handle = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const id = event.pathParameters?.id;

    validateGetBook(id);

    const book: Book = new Book(
      new Date(),
      'Me',
      230,
      'A couple that need time to understand each other',
      ['Laszlo', 'Otto'],
      'Romance',
      12.95,
      5,
    );

    return ok(book);
  } catch (err) {
    return badRequest((err as Error));
  }
};

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { Book } from '../../domain/book.model';
import { badRequest, ok } from '../../helpers/http-helpers';

export const handle = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const id = event.pathParameters?.id;

  if (!id) return badRequest(new Error('An invalid id was provided.'));

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
};

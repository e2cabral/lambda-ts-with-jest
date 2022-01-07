import { APIGatewayProxyEvent } from 'aws-lambda';
import { Book } from '../../domain/book.model';
import { validator } from '../../validation/book/validator';
import { badRequest, noContent } from '../../helpers/http-helpers';

const handle = (event: APIGatewayProxyEvent) => {
  try {
    const book = JSON.parse(event.body || 'null') as Book;

    validator(book);

    return noContent();
  } catch (e) {
    return badRequest((e as Error));
  }
};

export default handle;

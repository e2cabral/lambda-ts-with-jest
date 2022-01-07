import { APIGatewayProxyEvent } from 'aws-lambda';
import { Book } from '../../domain/book.model';
import { Validator } from '../../validation/book/validator';
import { badRequest, noContent } from '../../helpers/http-helpers';

const create = (event: APIGatewayProxyEvent) => {
  try {
    const book = JSON.parse(event.body || 'null') as Book;

    Validator(book);

    return noContent();
  } catch (e) {
    return badRequest((e as Error));
  }
};

export default create;

import { APIGatewayEventRequestContextWithAuthorizer, APIGatewayProxyEvent } from 'aws-lambda';
import { Book } from '../../domain/book.model';
import { handle } from './get-books';
import { badRequest } from '../../helpers/http-helpers';

const mockRequest = (perPage: number | null, currentPage: number | null) => ({
  body: null,
  headers: {},
  multiValueHeaders: {},
  httpMethod: 'post',
  isBase64Encoded: false,
  path: '/books',
  pathParameters: null,
  queryStringParameters: { perPage: perPage?.toString(), currentPage: currentPage?.toString() },
  multiValueQueryStringParameters: null,
  stageVariables: null,
  requestContext: {} as APIGatewayEventRequestContextWithAuthorizer<any>,
  resource: 'create',
} as APIGatewayProxyEvent);

describe('GetBooks', () => {
  test('Should return 200 and an array of books on success.', async () => {
    const httpResponse = await handle(mockRequest(10, 1));

    const expected: Book[] = [];

    expect(typeof httpResponse.body).toEqual(typeof expected);
    expect(httpResponse.statusCode).toEqual(200);
  });

  test('Should return 400 if no per page parameter was provided.', async () => {
    const httpResponse = await handle(mockRequest(null, 1));

    expect(httpResponse).toEqual(badRequest(new Error('perPage parameter is required.')));
  });

  test('Should return 400 if no current page parameter was provided.', async () => {
    const httpResponse = await handle(mockRequest(10, null));

    expect(httpResponse).toEqual(badRequest(new Error('currentPage parameter is required.')));
  });
});

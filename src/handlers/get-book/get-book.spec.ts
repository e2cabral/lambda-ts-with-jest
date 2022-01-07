import { APIGatewayEventRequestContextWithAuthorizer, APIGatewayProxyEvent } from 'aws-lambda';
import { APIGatewayProxyEventPathParameters } from 'aws-lambda/trigger/api-gateway-proxy';
import { Book } from '../../domain/book.model';
import { handle } from './get-book';
import { badRequest } from '../../helpers/http-helpers';

const mockRequest = (id: string) => ({
  body: null,
  headers: {},
  multiValueHeaders: {},
  httpMethod: 'post',
  isBase64Encoded: false,
  path: '/books',
  pathParameters: { id } as APIGatewayProxyEventPathParameters,
  queryStringParameters: null,
  multiValueQueryStringParameters: null,
  stageVariables: null,
  requestContext: {} as APIGatewayEventRequestContextWithAuthorizer<any>,
  resource: 'create',
} as APIGatewayProxyEvent);

const mockBook = () => new Book(
  new Date(),
  'Me',
  230,
  'A couple that need time to understand each other',
  ['Laszlo', 'Otto'],
  'Romance',
  12.95,
  5,
);

describe('Get Book Handler', () => {
  test('Should return 200 on success.', async () => {
    const httpResponse = await handle(mockRequest('j42j34kg42k3jg5gkj2546ghj6g'));

    const expected: Book = mockBook();

    expect(typeof httpResponse.body).toEqual(typeof expected);
    expect(httpResponse.statusCode).toEqual(200);
  });

  test('Should return 400 if an invalid id was provided.', async () => {
    const httpResponse = await handle(mockRequest(''));

    expect(httpResponse).toEqual(badRequest(new Error('An invalid id was provided.')));
  });
});

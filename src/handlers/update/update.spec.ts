import { APIGatewayEventRequestContextWithAuthorizer, APIGatewayProxyEvent } from 'aws-lambda';
import { APIGatewayProxyEventPathParameters } from 'aws-lambda/trigger/api-gateway-proxy';
import { badRequest, noContent } from '../../helpers/http-helpers';
import { handle } from './update';

const mockRequest = (body: any, id: string) => ({
  body: JSON.stringify(body),
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

describe('Update Book', () => {
  test('Should return 204 on success.', async () => {
    const httpResponse = await handle(mockRequest(
      {
        publicationDate: new Date(),
        author: 'Me',
        pages: 230,
        subject: 'A couple that need time to understand each other',
        characters: ['Laszlo', 'Otto'],
        genre: 'Romance',
        price: 12.95,
        rating: 5,
      },
      'h1341hhg56jh',
    ));

    expect(httpResponse).toEqual(noContent());
  });

  test('Should return 400 if no id was provided.', async () => {
    const httpResponse = await handle(mockRequest(
      {
        publicationDate: new Date(),
        author: 'Me',
        pages: 230,
        subject: 'A couple that need time to understand each other',
        characters: ['Laszlo', 'Otto'],
        genre: 'Romance',
        price: 12.95,
        rating: 5,
      },
      '',
    ));

    expect(httpResponse).toEqual(badRequest(new Error('No possible to update. Provide a valid id')));
  });

  test('Should return 400 if no body was provided.', async () => {
    const httpResponse = await handle(mockRequest(
      undefined,
      'h1341hhg56jh',
    ));

    expect(httpResponse).toEqual(badRequest(new Error('No body was provided.')));
  });
});

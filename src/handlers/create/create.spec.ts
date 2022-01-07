import { APIGatewayProxyEvent } from 'aws-lambda';
import create from './create';
import { badRequest, noContent } from '../../helpers/http-helpers';

const mockRequest = (body: any) => ({
  body: JSON.stringify(body),
  headers: {},
  multiValueHeaders: {},
  httpMethod: 'post',
  isBase64Encoded: false,
  path: '/books',
  pathParameters: null,
  queryStringParameters: null,
  multiValueQueryStringParameters: null,
  stageVariables: null,
  requestContext: {},
  resource: 'create',
} as APIGatewayProxyEvent);

describe('Create Handler', () => {
  test('Should return 204 on success', () => {
    const httpResponse = create(mockRequest({
      publicationDate: new Date(),
      author: 'Me',
      pages: 230,
      subject: 'A couple that need time to understand each other',
      characters: ['Laszlo', 'Otto'],
      genre: 'Romance',
      price: 12.95,
      rating: 5,
    }));

    expect(httpResponse).toEqual(noContent());
  });

  test('Should return 400 if no body was provided', () => {
    const httpResponse = create(mockRequest(null));

    expect(httpResponse).toEqual(badRequest(new Error('A body should be provided.')));
  });

  test('Should return 400 if author was not provided', () => {
    const httpResponse = create(mockRequest({
      publicationDate: new Date(),
      pages: 230,
      subject: 'A couple that need time to understand each other',
      characters: ['Laszlo', 'Otto'],
      genre: 'Romance',
      price: 12.95,
      rating: 5,
    }));

    expect(httpResponse).toEqual(badRequest(new Error('Author was not provided.')));
  });

  test('Should return 400 if pages was not provided', () => {
    const httpResponse = create(mockRequest({
      publicationDate: new Date(),
      author: 'Me',
      subject: 'A couple that need time to understand each other',
      characters: ['Laszlo', 'Otto'],
      genre: 'Romance',
      price: 12.95,
      rating: 5,
    }));

    expect(httpResponse).toEqual(badRequest(new Error('Pages was not provided.')));
  });

  test('Should return 400 if price was not provided', () => {
    const httpResponse = create(mockRequest({
      publicationDate: new Date(),
      author: 'Me',
      pages: 230,
      subject: 'A couple that need time to understand each other',
      characters: ['Laszlo', 'Otto'],
      genre: 'Romance',
      rating: 5,
    }));

    expect(httpResponse).toEqual(badRequest(new Error('Price was not provided.')));
  });
});

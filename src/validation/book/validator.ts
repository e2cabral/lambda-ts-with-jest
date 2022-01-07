import { Book } from '../../domain/book.model';

export const validateCreateBooks = (book: Book) => {
  if (!book) throw new Error('A body should be provided.');
  if (!book.author) throw new Error('Author was not provided.');
  if (!book.pages) throw new Error('Pages was not provided.');
  if (!book.publicationDate) throw new Error('Publication Date was not provided.');
  if (!book.subject) throw new Error('Subject was not provided.');
  if (!book.characters) throw new Error('Characters was not provided.');
  if (!book.genre) throw new Error('Genre was not provided.');
  if (!book.price) throw new Error('Price was not provided.');
  if (!book.rating) throw new Error('Rating was not provided.');
};

export const validateGetBooks = (perPage: string | undefined, currentPage: string | undefined) => {
  if (!perPage) throw new Error('perPage parameter is required.');
  if (!currentPage) throw new Error('currentPage parameter is required.');
};

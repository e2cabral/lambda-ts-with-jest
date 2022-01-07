export class Book {
  constructor(
    publicationDate: Date,
    author: string,
    pages: number,
    subject: string,
    characters: string[],
    genre: string,
    price: number,
    rating: number,
  ) {
    this.publicationDate = publicationDate;
    this.author = author;
    this.pages = pages;
    this.subject = subject;
    this.characters = characters;
    this.genre = genre;
    this.price = price;
    this.rating = rating;
  }

  publicationDate: Date;

  author: string;

  pages: number;

  subject: string;

  characters: string[];

  genre: string;

  price: number;

  rating: number;
}

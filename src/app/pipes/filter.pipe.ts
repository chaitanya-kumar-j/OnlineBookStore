import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(books: any[], searchText: string, filterMetadata:any): any[] {
    if (!books) {
      filterMetadata.count = 0;
      return [];
    }
    if (!searchText) {
      filterMetadata.count = books.length;
      return books;
    }
    searchText = searchText.toLocaleLowerCase();

    let filteredBooks =  books.filter(book => {
      return book.bookName.toLocaleLowerCase().includes(searchText);
    });
    filterMetadata.count = filteredBooks.length;
    return filteredBooks;
  }

}

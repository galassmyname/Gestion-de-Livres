import { Component, OnInit } from '@angular/core';
import { BookService } from '../services/book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-book',
  standalone: true,
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css'],
  imports: [FormsModule], 
})
export class EditBookComponent implements OnInit {
  title = '';
  author = '';
  bookId: string = '';

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.bookId = this.route.snapshot.paramMap.get('id')!;
    this.getBook();
  }

  getBook() {
    this.bookService.getBooks().subscribe((books) => {
      const book = books.find((b) => b._id === this.bookId);
      if (book) {
        this.title = book.title;
        this.author = book.author;
      }
    });
  }

  onSubmit() {
    const updatedBook = { title: this.title, author: this.author };
    this.bookService.updateBook(this.bookId, updatedBook).subscribe(() => {
      this.router.navigate(['/book-list']);
    });
  }
}

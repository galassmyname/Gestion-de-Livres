import { Component, OnInit } from '@angular/core';
import { BookService } from '../services/book.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-book-list',
  standalone: true,
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
  imports: [CommonModule, FormsModule],
})
export class BookListComponent implements OnInit {
  books: any[] = [];

  constructor(private bookService: BookService, private router: Router) { }

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks() {
    this.bookService.getBooks().subscribe({
      next: (data) => this.books = data,
      error: (err) => console.error('Erreur:', err)
    });
  }

  deleteBook(id: string) {
    if (confirm('Supprimer ce livre ?')) {
      this.bookService.deleteBook(id).subscribe({
        next: () => this.loadBooks(),
        error: (err) => console.error('Erreur:', err)
      });
    }
  }

  editBook(id: string) {
    this.router.navigate(['/edit-book', id]);
  }

  addNewBook() {
    this.router.navigate(['/add-book']);
  }
}
import { Component } from '@angular/core';
import { BookService } from '../services/book.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-book',
  standalone: true,
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css'],
  imports: [FormsModule, CommonModule],
})
export class AddBookComponent {
  title = '';
  author = '';

  constructor(private bookService: BookService, private router: Router) { }

  onSubmit() {
    const book = { title: this.title, author: this.author };
    this.bookService.addBook(book).subscribe({
      next: () => {
        this.router.navigate(['/book-list']);
      },
      error: (err) => {
        console.error("Erreur lors de l'ajout:", err);
      }
    });
  }
}
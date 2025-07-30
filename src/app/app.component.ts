import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  newIdea: string = '';

  idea: string[] = [];
  prototype: string[] = [];
  development: string[] = [];
  ship: string[] = [];

  clickTimeout: any;

  addNewItem() {
    this.idea.push(this.newIdea);
    this.newIdea = '';
  }

  movingFoward(stage: string, index: number) {
    clearTimeout(this.clickTimeout);
    let item = '';
    switch (stage) {
      case 'idea':
        item = this.idea.splice(index, 1)[0];
        this.prototype.push(item);
        break;
      case 'prototype':
        this.clickTimeout = setTimeout(() => {
          item = this.prototype.splice(index, 1)[0];
          this.development.push(item);
        }, 500);
        break;
      case 'development':
        this.clickTimeout = setTimeout(() => {
          item = this.development.splice(index, 1)[0];
          this.ship.push(item);
        }, 500);
        break;
    }
  }

  movingBackward(stage: string, index: number) {
    clearTimeout(this.clickTimeout);
    let item = '';
    switch (stage) {
      case 'prototype':
        item = this.prototype.splice(index, 1)[0];
        this.idea.push(item);
        break;
      case 'development':
        item = this.development.splice(index, 1)[0];
        this.prototype.push(item);
        break;
      case 'ship':
        item = this.ship.splice(index, 1)[0];
        this.development.push(item);
        break;
    }
  }
}

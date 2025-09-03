import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
declare var $: any; // To allow the use of jQuery
@Component({
  selector: 'app-hero',
  imports: [RouterModule, CommonModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent implements  OnInit {
  images: string[] = [
    'assets/images/caursal/hero.jpg',
    'assets/images/caursal/coursal-1.jpg',
    'assets/images/caursal/cousal-2.jpg'
  ];
  
  currentIndex = 0;

  ngOnInit() {
    setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    }, 5000); // كل 5 ثواني تبدل الصورة
  }
}

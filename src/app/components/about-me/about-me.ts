import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about-me.html',
  styleUrls: ['./about-me.css']
})
export class AboutMe implements AfterViewInit {
  @ViewChild('carousel') carousel!: ElementRef;
  currentIndex = 0;
  
  ngAfterViewInit() {
    this.updateDotIndicator();
  }

  scroll(direction: 'left' | 'right') {
    const element = this.carousel.nativeElement;
    const cardWidth = element.children[0].offsetWidth + 32;
    const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
    
    element.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });

    if (direction === 'left') {
      this.currentIndex = Math.max(0, this.currentIndex - 1);
    } else {
      this.currentIndex = Math.min(2, this.currentIndex + 1);
    }

    this.updateDotIndicator();
  }

  scrollToIndex(index: number) {
    const element = this.carousel.nativeElement;
    const cardWidth = element.children[0].offsetWidth + 32;
    
    element.scrollTo({
      left: cardWidth * index,
      behavior: 'smooth'
    });

    this.currentIndex = index;
    this.updateDotIndicator();
  }

  private updateDotIndicator() {
    const element = this.carousel.nativeElement;
    const scrollPosition = element.scrollLeft;
    const cardWidth = element.children[0].offsetWidth + 32;
    
    this.currentIndex = Math.round(scrollPosition / cardWidth);
  }

  // Mantén la lógica existente del acordeón
  isExpanded = false;
  activeAccordions: { [key: string]: boolean } = {};

  toggleAccordion(key: string) {
    this.activeAccordions[key] = !this.activeAccordions[key];
  }

  isActive(key: string): boolean {
    return this.activeAccordions[key] || false;
  }
}

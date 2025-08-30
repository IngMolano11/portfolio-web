import { Component, Input, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

interface Project {
  title: string;
  description: string;
  imageUrl: string;
  demoUrl: string;
  githubUrl: string;
  technologies: string[];
}

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-card.html',
  styleUrls: ['./project-card.css']
})
export class ProjectCard implements AfterViewInit {
  @Input() project!: Project;
  @ViewChild('description') description!: ElementRef;
  isExpanded = false;
  initialHeight = '100px';

  ngAfterViewInit() {
    // Aseguramos que la descripción comience colapsada
    setTimeout(() => {
      if (this.description?.nativeElement) {
        this.description.nativeElement.style.height = this.initialHeight;
      }
    });
  }

  showDemoAlert() {
    Swal.fire({
      title: '¡Demo no disponible!',
      text: 'Por favor, consulta el repositorio de GitHub para más información sobre este proyecto.',
      icon: 'info',
      confirmButtonText: 'Entendido',
      background: '#1a0022',
      color: '#fff',
      iconColor: '#a020f0',
      confirmButtonColor: '#a020f0',
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
    });
  }

  toggleDescription() {
    this.isExpanded = !this.isExpanded;
    const element = this.description.nativeElement;
    
    if (this.isExpanded) {
      const scrollHeight = element.scrollHeight;
      element.style.height = scrollHeight + 'px';
    } else {
      element.style.height = this.initialHeight;
    }
  }
}

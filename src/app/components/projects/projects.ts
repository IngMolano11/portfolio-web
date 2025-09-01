import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectCard } from '../project-card/project-card';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, ProjectCard],
  templateUrl: './projects.html',
  styleUrls: ['./projects.css']
})
export class ProjectsComponent implements AfterViewInit {
  @ViewChild('carousel') carousel!: ElementRef;
  currentIndex = 0;
  isDragging = false;
  startX = 0;
  scrollLeft = 0;

  projects = [
    {
      title: 'Contacts App',
      description: 'Contactos Empresarial es una aplicación web desarrollada con Angular en el frontend y FastAPI en el backend, desplegada mediante Docker Compose, que permite gestionar de manera centralizada los contactos de una empresa. Entre sus funciones se incluyen: registrar y editar información de clientes o proveedores, cargar fotografías, clasificar contactos por categorías, realizar búsquedas rápidas y exportar o importar información en formato CSV. Su arquitectura facilita la escalabilidad y el mantenimiento, y al estar contenedorizada puede implementarse fácilmente en servidores locales o en la nube. Esta herramienta resulta útil para empresas, equipos comerciales o áreas de recursos humanos que necesiten organizar y acceder de forma ágil a su red de contactos, al mismo tiempo que sirve como un proyecto de portafolio para mostrar conocimientos en desarrollo full stack y orquestación de servicios.',
      imageUrl: '../../../images/contactsCover.png',
      demoUrl: '',
      githubUrl: 'https://github.com/IngMolano11/Contactos_Empresarial',
      technologies: ['angular', 'html', 'css','typescript', 'fastapi', 'python', 'SQLite', 'git', 'github', 'visualstudio']
    },
    {
      title: 'Country App',
      description: 'Country App Angular es una aplicación construida con Angular que consume la API de REST Countries para mostrar información en tiempo real de países de todo el mundo. Permite realizar búsquedas por nombre, capital o región, mostrando detalles como población, idioma, moneda y fronteras. Incluye manejo de rutas, servicios y consumo de APIs mediante HTTPClient, así como componentes reutilizables y responsive design en HTML, CSS y TypeScript. Su utilidad radica en la consulta rápida de datos geográficos y como ejemplo práctico de consumo de APIs en Angular.',
      imageUrl: '../../../images/countryCover.png',
      demoUrl: 'https://country-app-angular11.netlify.app/',
      githubUrl: 'https://github.com/IngMolano11/country-app-angular',
      technologies: ['angular', 'html', 'css', 'typescript', 'bootstrap', 'postman', 'git', 'github', 'visualstudio']
    },
    {
      title: 'Gifs App',
      description: 'Angular Gifs App es una aplicación desarrollada con Angular que integra la API de Giphy para buscar, mostrar y gestionar colecciones de GIFs animados. Implementa almacenamiento en LocalStorage para guardar el historial de búsquedas, uso de servicios para el consumo de la API y manejo dinámico de componentes para actualizar la interfaz en tiempo real. Es útil como proyecto de práctica para comprender integración de APIs externas, gestión del estado y experiencia de usuario en Angular.',
      imageUrl: '../../../images/gifCover.png',
      demoUrl: 'https://gifs-app-angular11.netlify.app/',
      githubUrl: 'https://github.com/IngMolano11/angular-gifs-app',
      technologies: ['angular', 'html', 'css', 'typescript', 'bootstrap', 'postman', 'git', 'github', 'visualstudio']
    },
    {
      title: 'Front BBB360',
      description: 'BBB360 corresponde al diseño del frontend de una página web, donde se trabajó principalmente en la maquetación y el diseño visual utilizando HTML, CSS y Angular. El proyecto se enfocó en la construcción de una interfaz moderna, responsive y clara, destinada a mostrar de forma atractiva los servicios de la marca. Aunque no incluye lógica de backend, es un ejemplo de diseño UI/UX aplicado a una solución real.',
      imageUrl: '../../../images/bbbCover.png',
      demoUrl: 'https://bbb360-front.netlify.app/',
      githubUrl: 'https://github.com/IngMolano11/BBB360',
      technologies: ['angular', 'html', 'css', 'typescript', 'git', 'github', 'visualstudio']
    },
    {
      title: 'Portfolio Web',
      description: 'Mi portafolio personal es un proyecto desarrollado con Angular, empleando HTML, CSS y TypeScript como base tecnológica, gestionado con Git y GitHub y trabajado en Visual Studio Code. Su objetivo es centralizar y mostrar de manera organizada mis proyectos, habilidades y experiencia como desarrollador en formación. Cuenta con una estructura limpia, navegación intuitiva y un diseño adaptable para cualquier dispositivo. Este portafolio funciona como carta de presentación profesional, combinando buenas prácticas de desarrollo front-end con la integración de repositorios y proyectos demostrativos.',
      imageUrl: '../../../images/portfolioCover.png',
      demoUrl: 'https://my-portfolio-ing-camilo.netlify.app/',
      githubUrl: 'https://github.com/IngMolano11/portfolio-web',
      technologies: ['angular', 'html', 'css', 'typescript', 'git', 'github', 'visualstudio']
    },
  ];

  ngAfterViewInit() {
    this.initDragScroll();
    this.updateDotIndicator();
  }

  scroll(direction: 'left' | 'right') {
    const element = this.carousel.nativeElement;
    const cardWidth = element.children[0].offsetWidth + 32; // width + gap
    const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;

    element.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });

    if (direction === 'left') {
      this.currentIndex = Math.max(0, this.currentIndex - 1);
    } else {
      this.currentIndex = Math.min(this.projects.length - 1, this.currentIndex + 1);
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

  private initDragScroll() {
    const ele = this.carousel.nativeElement;
    
    ele.addEventListener('mousedown', (e: MouseEvent) => {
      this.isDragging = true;
      this.startX = e.pageX - ele.offsetLeft;
      this.scrollLeft = ele.scrollLeft;
    });

    ele.addEventListener('mouseleave', () => {
      this.isDragging = false;
    });

    ele.addEventListener('mouseup', () => {
      this.isDragging = false;
    });

    ele.addEventListener('mousemove', (e: MouseEvent) => {
      if (!this.isDragging) return;
      e.preventDefault();
      const x = e.pageX - ele.offsetLeft;
      const walk = (x - this.startX) * 2;
      ele.scrollLeft = this.scrollLeft - walk;
    });
  }
}

import { Routes } from '@angular/router';
import { Description } from './components/description/description';
import { AboutMe } from './components/about-me/about-me';
import { ProjectsComponent } from './components/projects/projects';
import { ContactMe } from './components/contact-me/contact-me';

export const routes: Routes = [
  { path: '', component: Description },
  { path: 'about', component: AboutMe },
  { path: 'projects', component: ProjectsComponent },
  { path: 'contact', component: ContactMe },
  { path: '**', redirectTo: '' }
];

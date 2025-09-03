import { Routes } from '@angular/router';
import { FileArchiveComponent } from './pages/file-archive/file-archive.component';
import { FileSearchComponent } from './pages/file-search/file-search.component';

export const FILES_ROUTES: Routes = [
  { path: 'archive', component: FileArchiveComponent },
  { path: 'search', component: FileSearchComponent }
];

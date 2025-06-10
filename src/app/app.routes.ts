import { Routes } from '@angular/router';
import { Home } from '../features/home/home';
import { OpticalQuiz } from '../features/optical-quiz/optical-quiz';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'quiz', component: OpticalQuiz },
    { path: '**', redirectTo: '' },
];

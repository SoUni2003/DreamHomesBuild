import { Routes } from '@angular/router';
import { HomeComponent } from './user/pages/home/home.component';
import { VechungtoiComponent } from './user/pages/vechungtoi/vechungtoi.component';

export const routes: Routes = [
    {
        path:'',
        component: HomeComponent
    },
    {
        path: 'trangchu',
        component: HomeComponent
    },
    {
        path: 'vechungtoi',
        component: VechungtoiComponent
    }
];

import { Routes } from '@angular/router';
import { HomeComponent } from './user/pages/home/home.component';
import { VechungtoiComponent } from './user/pages/vechungtoi/vechungtoi.component';
import { ThongtinComponent } from './user/pages/thongtin/thongtin.component';
import { KhacComponent } from './user/pages/khac/khac.component';

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
    },
    {
        path: 'thongtin',
        component: ThongtinComponent
    },
    {
        path: 'khac',
        component: KhacComponent
    }
];

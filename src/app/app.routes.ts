import { Routes } from '@angular/router';
import { PartListComponent } from './features/part/partlist/part-list.component';
import { PartFormComponent } from './features/part/part-form/part-form.component';


export const routes: Routes = [
    {path: '', component: PartListComponent},
    {path: 'add', component: PartFormComponent},
    {path: 'edit/:id', component: PartFormComponent},
];

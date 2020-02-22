import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SalesComponent } from './sales/sales.component';
import { SalesDetailsComponent } from './sales-details/sales-details.component';
import { AddSalesComponent } from './add-sales/add-sales.component';
import { EditSalesComponent } from './edit-sales/edit-sales.component';

const routes: Routes = [
  {
    path: 'sales',
    component: SalesComponent,
    data: { title: 'List of Sales' }
  },
  {
    path: 'sales-details/:id',
    component: SalesDetailsComponent,
    data: { title: 'Sales Details' }
  },
  {
    path: 'add-sales',
    component: AddSalesComponent,
    data: { title: 'Add Sales' }
  },
  {
    path: 'edit-sales/:id',
    component: EditSalesComponent,
    data: { title: 'Edit Sales' }
  },
  { path: '',
    redirectTo: '/sales',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

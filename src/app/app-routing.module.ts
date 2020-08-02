import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './componets/dashboard/dashboard.component';
import { AdminCompaniesComponent } from './views/admin-companies/admin-companies.component';
import { AdminDestinationsComponent } from './views/admin-destinations/admin-destinations.component';
import { AdminManufacturersComponent } from './views/admin-manufacturers/admin-manufacturers.component';
import { AdminProductsComponent } from './views/admin-products/admin-products.component';
import { OrdersActiveComponent } from './views/orders-active/orders-active.component';
import { OrdersProductionComponent } from './views/orders-production/orders-production.component';
import { OrdersArchiveComponent } from './views/orders-archive/orders-archive.component';
import { OrderViewComponent } from './views/order-view/order-view.component';
import { ProductionActiveComponent } from './views/production-active/production-active.component';
import { ProductionArchiveComponent } from './views/production-archive/production-archive.component';
import { ProductorsActiveComponent } from './views/productors-active/productors-active.component';
import { ProductorsArchiveComponent } from './views/productors-archive/productors-archive.component';
import { RootConfigComponent } from './views/root-config/root-config.component';
import { RootLogComponent } from './views/root-log/root-log.component';
import { RootLoginComponent } from './views/root-login/root-login.component';
import { RootProfileComponent } from './views/root-profile/root-profile.component';
import { RootUsersComponent } from './views/root-users/root-users.component';
import { TimelineComponent } from './views/timeline/timeline.component';
import { NotfoundComponent } from './componets/notfound/notfound.component';


const routes: Routes = 
[
  { path: '', component: DashboardComponent },
  { path: 'admin-companies', component: AdminCompaniesComponent },
  { path: 'admin-destinations', component: AdminDestinationsComponent },
  { path: 'admin-manufacturers', component: AdminManufacturersComponent },
  { path: 'admin-products', component: AdminProductsComponent },
  { path: 'orders-active', component: OrdersActiveComponent },
  { path: 'orders-archive', component: OrdersArchiveComponent },
  { path: 'order-view', component: OrderViewComponent },
  { path: 'production-active', component: ProductionActiveComponent },
  { path: 'production-archive', component: ProductionArchiveComponent },
  { path: 'productors-active', component: ProductorsActiveComponent },
  { path: 'productors-archive', component: ProductorsArchiveComponent },
  { path: 'root-config', component: RootConfigComponent },
  { path: 'root-log', component: RootLogComponent },
  { path: 'root-login', component: RootLoginComponent },
  { path: 'root-parameters', component: DashboardComponent },
  { path: 'root-profile', component: RootProfileComponent },
  { path: 'root-profile/:id', component: RootProfileComponent },
  { path: 'root-users', component: RootUsersComponent },
  { path: 'timeline', component: TimelineComponent  },
  { path: '**', component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

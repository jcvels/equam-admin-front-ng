import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { ChartsModule } from 'ng2-charts';
import { HttpClientModule } from '@angular/common/http';

import { DataProviderService } from './services/data-provider.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './componets/navbar/navbar.component';
import { AdminCompaniesComponent } from './views/admin-companies/admin-companies.component';
import { AdminDestinationsComponent } from './views/admin-destinations/admin-destinations.component';
import { AdminManufacturersComponent } from './views/admin-manufacturers/admin-manufacturers.component';
import { AdminProductsComponent } from './views/admin-products/admin-products.component';
import { RootConfigComponent } from './views/root-config/root-config.component';
import { RootLogComponent } from './views/root-log/root-log.component';
import { RootLoginComponent } from './views/root-login/root-login.component';
import { RootParametersComponent } from './views/root-parameters/root-parameters.component';
import { RootProfileComponent } from './views/root-profile/root-profile.component';
import { RootUsersComponent } from './views/root-users/root-users.component';
import { DashboardComponent } from './componets/dashboard/dashboard.component';
import { FooterComponent } from './componets/footer/footer.component';
import { NotifyComponent } from './componets/notify/notify.component';
import { OrdersActiveComponent } from './views/orders-active/orders-active.component';
import { OrdersProductionComponent } from './views/orders-production/orders-production.component';
import { OrdersArchiveComponent } from './views/orders-archive/orders-archive.component';
import { OrderViewComponent } from './views/order-view/order-view.component';
import { ProductionActiveComponent } from './views/production-active/production-active.component';
import { ProductorsActiveComponent } from './views/productors-active/productors-active.component';
import { ProductorsArchiveComponent } from './views/productors-archive/productors-archive.component';
import { TimelineComponent } from './views/timeline/timeline.component';
import { ProductionArchiveComponent } from './views/production-archive/production-archive.component';
import { NotfoundComponent } from './componets/notfound/notfound.component';
import { TableHeadersComponent } from './utils/table-headers/table-headers.component';
import { WidgetNumberComponent } from './utils/widget-number/widget-number.component';
import { WaitSpinerComponent } from './utils/wait-spiner/wait-spiner.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AdminCompaniesComponent,
    AdminDestinationsComponent,
    AdminManufacturersComponent,
    AdminProductsComponent,
    RootConfigComponent,
    RootLogComponent,
    RootLoginComponent,
    RootParametersComponent,
    RootProfileComponent,
    RootUsersComponent,
    DashboardComponent,
    FooterComponent,
    NotifyComponent,
    OrdersActiveComponent,
    OrdersProductionComponent,
    OrdersArchiveComponent,
    OrderViewComponent,
    ProductionActiveComponent,
    ProductorsActiveComponent,
    ProductorsArchiveComponent,
    TimelineComponent,
    ProductionArchiveComponent,
    NotfoundComponent,
    TableHeadersComponent,
    WidgetNumberComponent,
    WaitSpinerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChartsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [DataProviderService],
  bootstrap: [AppComponent]
})
export class AppModule { }

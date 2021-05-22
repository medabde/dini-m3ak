import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ToastrModule } from "ngx-toastr";
import { FormsModule } from '@angular/forms'
import { ReactiveFormsModule} from '@angular/forms'
import { SidebarModule } from "./sidebar/sidebar.module";
import { FooterModule } from "./shared/footer/footer.module";
import { NavbarModule } from "./shared/navbar/navbar.module";
import { FixedPluginModule } from "./shared/fixedplugin/fixedplugin.module";

import { AppComponent } from "./app.component";
import { AppRoutes } from "./app.routing";

import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { HttpClientModule } from "@angular/common/http";
import { LoginComponent } from './login/login.component';
import { UpdateUserComponent } from './update-user/update-user.component';

@NgModule({
  declarations: [AppComponent, AdminLayoutComponent, LoginComponent, UpdateUserComponent],
  imports: [
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(AppRoutes, {
      useHash: true,
    }),
    ReactiveFormsModule,
    FormsModule,
    SidebarModule,
    NavbarModule,
    ToastrModule.forRoot(),
    FooterModule,
    FixedPluginModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

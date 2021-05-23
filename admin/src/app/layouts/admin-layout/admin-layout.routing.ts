import { Routes } from "@angular/router";

import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { UserComponent } from "../../pages/user/user.component";
import { TableComponent } from "../../pages/table/table.component";
import { UpgradeComponent } from "../../pages/upgrade/upgrade.component";
import { RidesComponent } from "app/pages/rides/rides.component";

export const AdminLayoutRoutes: Routes = [
  { path: "dashboard", component: DashboardComponent },
  { path: "user", component: UserComponent },
  { path: "table", component: TableComponent },
  { path: "upgrade", component: UpgradeComponent },
  { path: "rides", component: RidesComponent },
];

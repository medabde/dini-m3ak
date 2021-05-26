import { Component, OnInit } from "@angular/core";

export interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

export const ROUTES: RouteInfo[] = [
  { path: "/dashboard", title: "acceuil", icon: "nc-bank", class: "" },


  { path: "/user", title: "Profile", icon: "nc-single-02", class: "" },
  { path: "/table", title: "Utilisateurs", icon: "nc-tile-56", class: "" },

  { path: "/rides", title: "Trajets", icon: "nc-tile-56", class: "" },
  // { path: '/upgrade',       title: 'Upgrade to PRO',    icon:'nc-spaceship',  class: 'active-pro' },
];

@Component({
  moduleId: module.id,
  selector: "sidebar-cmp",
  templateUrl: "sidebar.component.html",
})
export class SidebarComponent implements OnInit {
  public menuItems: any[];
  ngOnInit() {
    this.menuItems = ROUTES.filter((menuItem) => menuItem);
  }
}

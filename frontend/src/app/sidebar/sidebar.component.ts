import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../sidebar.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent implements OnInit {
  sidebarVisible = false;
  navbarItems: { link: string; iconPath: string; label: string }[];

  constructor(private SidebarService: SidebarService) {
    this.navbarItems = SidebarService.getNavbarItems();
  }

  ngOnInit() {
    this.SidebarService.sidebarToggled.subscribe(() => {
      this.sidebarVisible = !this.sidebarVisible;
    });

    this.SidebarService.closeSidebar.subscribe(() => {
      this.sidebarVisible = false;
    });
  }

  closeSidebar() {
    this.SidebarService.triggerCloseSidebar();
  }
}

import { MenuItem } from '../models/menu.model';

export class Menu {
  public static pages: MenuItem[] = [
    {
      group: 'Menu',
      separator: true,
      icon: 'assets/icons/chart-pie.svg',
      
      items: [
        {
          icon: 'assets/icons/chart-pie.svg',
          label: 'Dashboard',
          route: '/dashboard/main',
          
        }, {
          icon: 'assets/icons/chart.svg',
          label: 'Analytics',
          route: '/dashboard/analytics',
        },
        {
          icon: 'assets/icons/table.svg',
          label: 'History',
          route: '/dashboard/history',
          
        },
        {
          icon: 'assets/icons/cctv.svg',
          label: 'Cameras',
          route: '/dashboard/cameras',
          
        },
        {
          icon: 'assets/icons/heroicons/outline/cog.svg',
          label: 'Settings',
          route: '/dashboard/setting',
        },
      ]        
      
      
    },
  ];
}

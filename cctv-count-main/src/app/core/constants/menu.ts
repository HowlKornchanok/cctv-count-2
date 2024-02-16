import { MenuItem } from '../models/menu.model';

export class Menu {
  public static pages: MenuItem[] = [
    {
      group: 'Menu',
      separator: false,
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

          
        }
        
        
        
      ],
    },
    

  ];
}

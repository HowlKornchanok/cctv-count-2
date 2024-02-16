import { MenuItem } from '../models/menu.model';

export class Menu2 {
  public static pages: MenuItem[] = [
    {
      group: '',
      separator: false,
      items: [
        {
          icon: 'assets/icons/heroicons/outline/cog.svg',
          label: 'Settings',
          route: '/dashboard/setting',
        },
      ],
    },
  ];
}

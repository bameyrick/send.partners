import { Colour, Icon } from '../../enums';

interface NavigationItemCommon {
  url: string;
  translationKey: string;
  icon: Icon;
  iconColour: Colour;
}

export interface NavigationItem extends NavigationItemCommon {
  notificationCount?: number;
}

export interface NavigationGroup extends Partial<NavigationItemCommon> {
  items: NavigationItem[];
  open?: boolean;
}

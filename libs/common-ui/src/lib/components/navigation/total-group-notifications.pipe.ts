import { Pipe, PipeTransform } from '@angular/core';
import { NavigationItem } from './navigation.models';

@Pipe({
  name: 'groupNotifications',
})
export class TotalGroupNotificationsPipe implements PipeTransform {
  public transform(items: NavigationItem[]): number {
    return items.reduce((total, item) => total + (item.notificationCount || 0), 0);
  }
}

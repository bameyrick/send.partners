import { AfterContentInit, Component, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import { User } from '@common';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { selectAuthUser } from '../../auth';
import { AbstractComponent } from '../abstracts';

@Component({
  selector: 'avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AvatarComponent extends AbstractComponent implements AfterContentInit {
  /**
   * The BEM block name class
   */
  public readonly bemBlockClass: string = 'Avatar';

  /**
   * The current logged in user
   */
  public user$?: Observable<User | undefined>;

  /**
   * The initials of the current logged in user
   */
  public initials$?: Observable<string | undefined>;

  @Input() public currentUser$?: Observable<User | undefined>;

  constructor(elementRef: ElementRef, private readonly store: Store) {
    super(elementRef);
  }

  public ngAfterContentInit(): void {
    if (this.currentUser$) {
      this.user$ = this.currentUser$;
    } else {
      this.user$ = this.store.select(selectAuthUser);
    }

    this.initials$ = this.user$?.pipe(
      map(user =>
        user
          ? user.name
              ?.trim()
              .split(' ')
              .map(name => name[0])
              .join('')
          : ''
      )
    );
  }
}

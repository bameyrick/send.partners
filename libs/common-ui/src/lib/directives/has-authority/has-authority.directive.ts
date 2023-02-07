import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { Authority, hasAuthority } from '@common';
import { Store } from '@ngrx/store';
import { selectAuthUser } from '../../auth';

@Directive({
  selector: '[hasAuthority]',
})
export class HasAuthorityDirective implements OnInit {
  /**
   * The authority to check
   */
  @Input() public authority?: Authority;

  private readonly user$ = this.store.select(selectAuthUser);

  constructor(
    private readonly store: Store,
    private readonly viewContainerRef: ViewContainerRef,
    private readonly templateRef: TemplateRef<unknown>
  ) {}

  public async ngOnInit(): Promise<void> {
    if (!this.authority) {
      throw new Error('Authority is required');
    }

    if (!Object.values(Authority).includes(this.authority)) {
      throw new Error(`Invalid authority: ${this.authority}`);
    }

    this.user$.subscribe(user => {
      if (!this.authority || !user || !hasAuthority(this.authority, user)) {
        this.viewContainerRef.clear();
      } else {
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      }
    });
  }
}

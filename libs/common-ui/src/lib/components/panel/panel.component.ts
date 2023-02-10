import { Component, ElementRef, HostBinding, Input, OnChanges, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { isEmpty } from '@qntm-code/utils';
import { AbstractComponent } from '../abstracts';
import { PanelType } from './panel-type';

@Component({
  selector: 'common-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PanelComponent extends AbstractComponent implements OnChanges {
  /**
   * The BEM block name class
   */
  public readonly bemBlockClass: string = 'Panel';

  /**
   * The type of panel to render
   */
  @Input() public type = PanelType.Info;

  /**
   * Optional title
   */
  @Input() public title?: string;

  /**
   * The type of tag to wrap the title in
   */
  @Input() public titleTag = 'h2';

  /**
   * HTML for the title
   */
  public titleHTML?: SafeHtml;

  /**
   * Hostbinding for the element
   */
  @HostBinding('[attr.aria-labelledby]') public labeledBy?: string;

  private readonly titleId = `${this.id}-title`;

  constructor(elementRef: ElementRef, private readonly domSanitizer: DomSanitizer) {
    super(elementRef);
  }

  public ngOnChanges(): void {
    this.labeledBy = !isEmpty(this.title) ? this.titleId : undefined;

    this.titleHTML = !isEmpty(this.title)
      ? this.domSanitizer.bypassSecurityTrustHtml(
          `<${this.titleTag} id="${this.titleId}" class="${this.bemBlockClass}__title" tabindex="-1">${this.title}</${this.titleTag}>`
        )
      : undefined;

    this.setHostClass();
  }

  protected override getHostClasses(): string[] {
    const classes = super.getHostClasses();

    classes.push(`${this.bemBlockClass}--${this.type}`);

    return classes;
  }
}

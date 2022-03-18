import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Directive, ElementRef, Inject, Input } from '@angular/core';
import { Icon } from '../../enums';
import { SvgSymbolsService } from '../service';
import { IconPlacement } from './icon-placement';

const NS_SVG = 'http://www.w3.org/2000/svg';
const NS_XLINK = 'http://www.w3.org/1999/xlink';

@Directive({
  selector: '[icon]',
})
export class IconDirective implements AfterViewInit {
  /**
   * Populates the icon by name
   */
  @Input('icon') public set iconName(value: Icon | undefined) {
    if (value) {
      this.name = value;

      this.useElement.setAttributeNS(NS_XLINK, 'href', `#${value}`);
    }
  }

  /**
   * Gets the current icon name
   */
  public get iconName(): Icon {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.name!;
  }

  /**
   * Whether the icon should at the start or end of the element
   */
  @Input() public iconPlacement: IconPlacement = IconPlacement.Before;

  /**
   * Class to add to the icon
   */
  @Input() public iconClass?: string;

  /**
   * The SVG use element
   */
  private useElement: SVGUseElement;

  /**
   * The element with the [srtIcon] directive tag, that the svg is being injected into
   */
  private element: HTMLElement;

  /**
   * The name of the selected icon
   */
  private name?: Icon;

  /**
   * Reference to the created svg element
   */
  private svg?: SVGElement;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(@Inject(DOCUMENT) document: Document, elementRef: ElementRef, _iconService: SvgSymbolsService) {
    this.useElement = document.createElementNS(NS_SVG, 'use');
    this.element = elementRef.nativeElement as HTMLElement;
  }

  public ngAfterViewInit(): void {
    if (this.name) {
      this.svg = document.createElementNS(NS_SVG, 'svg');
      this.svg.appendChild(this.useElement);

      if (this.iconClass) {
        this.svg.classList.add(this.iconClass);
      }

      if (this.iconPlacement === IconPlacement.Before) {
        this.element.insertBefore(this.svg, this.element.firstChild);
      } else {
        this.element.appendChild(this.svg);
      }
    }
  }
}

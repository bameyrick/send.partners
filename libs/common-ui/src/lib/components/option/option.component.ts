import { AfterContentInit, AfterViewInit, Component, Input, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { isEmpty, isNullOrUndefined } from '@qntm-code/utils';
import { sanitizeSearchValue } from '@app/common';
import { OptionValue } from './option-value';

@Component({
  selector: 'dropdown-option',
  templateUrl: './option.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class OptionComponent implements AfterContentInit, AfterViewInit {
  /**
   * The value of the option (The same as the value attribute on a native HTML <option>)
   */
  @Input() public value?: OptionValue;

  /**
   * Optional string value to be used for searches
   */
  @Input() public stringValue?: string;

  /**
   * Optional data for the option
   */
  @Input() public data?: unknown;

  /**
   * SafeHtml to be used in the wrapping component's option list
   */
  public html: SafeHtml = this.domSanitizer.bypassSecurityTrustHtml('');

  /**
   * The value to be used for searching options and scoring similarity
   */
  public searchValue?: string;

  /**
   * Reference to the template
   */
  @ViewChild('template', { static: true }) private template?: TemplateRef<unknown>;

  constructor(private readonly domSanitizer: DomSanitizer) {}

  /**
   * Try collect the html content as soon as possible to prevent 'ExpressionChangedAfterItHasBeenCheckedError'
   */
  public ngAfterContentInit(): void {
    this.getHTML();
  }

  /**
   * Collect the html values if they weren't available on content init. This should not be necessary once we upgrade to angular 11
   */
  public ngAfterViewInit(): void {
    this.getHTML();
  }

  /**
   * Gathers the HTML content
   */
  public getHTML(): void {
    const view = this.template?.createEmbeddedView(null);

    /**
     * nodeType 1: HTML element
     * nodeType 3: Text
     */
    const content = view?.rootNodes
      .filter(node => [1, 3].includes(node.nodeType))
      .reduce((result, node) => result + (node.nodeType === 1 ? node.outerHTML : node.nodeValue), '');

    if (!isEmpty(content)) {
      this.html = this.domSanitizer.bypassSecurityTrustHtml(content as string);

      this.searchValue = sanitizeSearchValue(
        isNullOrUndefined(this.stringValue)
          ? view?.rootNodes.filter(node => node.nodeType === 3).reduce((result, node) => result + node.nodeValue, '')
          : this.stringValue
      );
    }

    view?.destroy();
  }
}

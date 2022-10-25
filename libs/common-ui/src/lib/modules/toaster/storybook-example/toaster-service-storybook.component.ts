import { Component, ElementRef, Input } from '@angular/core';
import { isString } from '@qntm-code/utils';
import { CommonUiModule } from '../../../common-ui.module';
import { AbstractComponent } from '../../../components';
import { Icon } from '../../../enums';
import { ToasterService } from '../toaster.service';

@Component({
  selector: 'storybook-toaster-service',
  templateUrl: `./toaster-service-storybook.component.html`,
  providers: [CommonUiModule],
})
export class StorybookToasterServiceComponent extends AbstractComponent {
  @Input() public title?: string;
  @Input() public body?: string;
  @Input() public icon?: Icon;
  @Input() public duration?: number;
  @Input() public type?: string;
  @Input() public dismissText?: string;

  constructor(elementRef: ElementRef, private readonly toasterService: ToasterService) {
    super(elementRef);
  }

  public pop(): void {
    if (isString(this.body)) {
      this.toasterService.pop({
        title: this.title,
        body: this.body,
        options: { icon: this.icon, duration: this.duration, type: this.type, dismissText: this.dismissText },
      });
    }
  }
}

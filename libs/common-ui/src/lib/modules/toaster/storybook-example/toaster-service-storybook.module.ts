import { NgModule } from '@angular/core';
import { CommonUiStorybookModule } from '../../../common-ui.storybook.module';
import { ToasterModule } from '../toaster.module';
import { StorybookToasterServiceComponent } from './toaster-service-storybook.component';

@NgModule({
  declarations: [StorybookToasterServiceComponent],
  imports: [ToasterModule, CommonUiStorybookModule],
  exports: [StorybookToasterServiceComponent],
})
export class StorybookToasterServiceModule {}

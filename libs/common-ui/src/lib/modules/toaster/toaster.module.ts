import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToasterComponent } from './toaster/toaster.component';
import { ToastComponent } from './toast/toast.component';
import { CommonUiModule } from '../../common-ui.module';

@NgModule({
  declarations: [ToasterComponent, ToastComponent],
  imports: [CommonUiModule, BrowserAnimationsModule],
  exports: [ToasterComponent],
})
export class ToasterModule {}

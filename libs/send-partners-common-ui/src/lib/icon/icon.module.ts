import { NgModule } from '@angular/core';
import { IconDirective } from './directive';
import { SvgSymbolsService } from './service';

@NgModule({
  declarations: [IconDirective],
  exports: [IconDirective],
  providers: [SvgSymbolsService],
})
export class IconModule {}

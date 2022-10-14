import { Component, Input, OnChanges, ViewEncapsulation } from '@angular/core';
import { AbstractComponent } from '../abstracts';

@Component({
  selector: 'common-password-strength',
  templateUrl: './password-strength.component.html',
  styleUrls: ['./password-strength.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PasswordStrengthComponent extends AbstractComponent implements OnChanges {
  /**
   * The password to analyze
   */
  @Input() public password?: string | null;

  /**
   * Score
   */
  public score = 0;

  public async ngOnChanges(): Promise<void> {
    const zxcvbn = (await import('zxcvbn')).default;

    this.score = zxcvbn(this.password || '').score;
  }
}

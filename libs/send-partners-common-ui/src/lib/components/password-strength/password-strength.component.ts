import { Component, Input, OnChanges, ViewEncapsulation } from '@angular/core';
import { AbstractComponent } from '../abstracts';
import * as zxcvbn from 'zxcvbn';

@Component({
  selector: 'send-partners-common-password-strength',
  templateUrl: './password-strength.component.html',
  styleUrls: ['./password-strength.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PasswordStrengthComponent extends AbstractComponent implements OnChanges {
  /**
   * The password to analyze
   */
  @Input() public password?: string;

  /**
   * Score
   */
  public score = 0;

  public ngOnChanges(): void {
    this.score = zxcvbn(this.password || '').score;
  }
}

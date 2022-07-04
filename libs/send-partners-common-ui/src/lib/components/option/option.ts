import { OptionValue } from './option-value';

export interface Option {
  /**
   * The value for the option
   */
  value: OptionValue;

  /**
   * The text for the option
   */
  text: string;
}

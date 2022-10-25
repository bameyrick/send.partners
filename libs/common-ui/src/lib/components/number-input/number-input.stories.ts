import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { CommonUiModule } from '../../common-ui.module';
import { NumberInputComponent } from './number-input.component';

export default {
  title: 'Components/Number Input',
  component: NumberInputComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonUiModule],
    }),
  ],
} as Meta<NumberInputComponent>;

const Template: Story<NumberInputComponent> = (props: NumberInputComponent) => ({
  template: `<number-input ${Object.keys(props).reduce(
    (result, key) => `${result} [${key}]="${key}"`,
    ''
  )} [ngModel]="false"></number-input>`,
  props,
});

export const Primary = Template.bind({});

Primary.args = {
  label: 'Number Input',
  min: 0,
  max: 10,
  disabled: false,
  required: false,
};

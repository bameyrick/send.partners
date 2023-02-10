import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { mapComponentPropsForTemplate } from '../../../../.storybook/map-props';
import { CommonUiStorybookModule } from '../../common-ui.storybook.module';
import { NumberInputComponent } from './number-input.component';

export default {
  title: 'Components/Number Input',
  component: NumberInputComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonUiStorybookModule],
    }),
  ],
} as Meta<NumberInputComponent>;

const Template: Story<NumberInputComponent> = (props: NumberInputComponent) => ({
  template: `<number-input ${mapComponentPropsForTemplate(props)} [ngModel]="false"></number-input>`,
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

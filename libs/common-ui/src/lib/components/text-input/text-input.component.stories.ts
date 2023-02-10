import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { mapComponentPropsForTemplate } from '../../../../.storybook/map-props';
import { CommonUiStorybookModule } from '../../common-ui.storybook.module';
import { TextInputComponent } from './text-input.component';

export default {
  title: 'Components/Text Input',
  component: TextInputComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonUiStorybookModule],
    }),
  ],
  argTypes: {
    type: {
      options: ['text', 'email', 'password', 'search', 'tel'],
      control: {
        type: 'select',
      },
    },
  },
} as Meta<TextInputComponent>;

const Template: Story<TextInputComponent> = (props: TextInputComponent) => ({
  template: `<text-input ${mapComponentPropsForTemplate(props)} [ngModel]="''"></text-input>`,
  props,
});

export const Primary = Template.bind({});
Primary.args = {
  label: 'Text Input',
  loading: false,
  disabled: false,
  required: false,
};

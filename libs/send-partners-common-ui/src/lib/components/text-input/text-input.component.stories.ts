import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { SendPartnersCommonUiModule } from '../../send-partners-common-ui.module';
import { TextInputComponent } from './text-input.component';

export default {
  title: 'TextInputComponent',
  component: TextInputComponent,
  decorators: [
    moduleMetadata({
      imports: [SendPartnersCommonUiModule],
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

const Template: Story<TextInputComponent> = (args: TextInputComponent) => ({
  template: `<text-input ${Object.keys(args).reduce((result, key) => `${result} [${key}]="${key}"`, '')} [ngModel]="''"></text-input>`,
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {
  label: 'Text Input',
  loading: false,
};

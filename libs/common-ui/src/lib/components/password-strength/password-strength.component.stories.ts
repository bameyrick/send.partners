import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { PasswordStrengthComponent } from './password-strength.component';

export default {
  title: 'Components/Password Strength',
  component: PasswordStrengthComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    }),
  ],
} as Meta<PasswordStrengthComponent>;

const Template: Story<PasswordStrengthComponent> = (args: PasswordStrengthComponent) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {
  password: '',
};

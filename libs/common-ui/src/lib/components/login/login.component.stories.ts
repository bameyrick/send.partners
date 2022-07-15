import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { CommonUiModule } from '../../common-ui.module';
import { LoginComponent } from './login.component';

export default {
  title: 'Components/Login',
  component: LoginComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonUiModule],
    }),
  ],
} as Meta<LoginComponent>;

const Template: Story<LoginComponent> = (args: LoginComponent) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {
  error: '',
};

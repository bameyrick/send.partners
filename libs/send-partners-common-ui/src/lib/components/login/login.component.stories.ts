import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { SendPartnersCommonUiModule } from '../../send-partners-common-ui.module';
import { LoginComponent } from './login.component';

export default {
  title: 'Components/Login',
  component: LoginComponent,
  decorators: [
    moduleMetadata({
      imports: [SendPartnersCommonUiModule],
    }),
  ],
} as Meta<LoginComponent>;

const Template: Story<LoginComponent> = (args: LoginComponent) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {};

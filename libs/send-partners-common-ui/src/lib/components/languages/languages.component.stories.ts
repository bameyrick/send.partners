import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { SendPartnersCommonUiStorybookModule } from '../../send-partners-common-ui.storybook.module';
import { LanguagesComponent } from './languages.component';

export default {
  title: 'Components/Languages',
  component: LanguagesComponent,
  decorators: [
    moduleMetadata({
      imports: [SendPartnersCommonUiStorybookModule],
    }),
  ],
} as Meta<LanguagesComponent>;

const Template: Story<LanguagesComponent> = (props: LanguagesComponent) => ({
  props,
});

export const Primary = Template.bind({});
Primary.args = {};

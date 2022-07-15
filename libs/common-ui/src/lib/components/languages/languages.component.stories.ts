import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { CommonUiStorybookModule } from '../../common-ui.storybook.module';
import { LanguagesComponent } from './languages.component';

export default {
  title: 'Components/Languages',
  component: LanguagesComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonUiStorybookModule],
    }),
  ],
} as Meta<LanguagesComponent>;

const Template: Story<LanguagesComponent> = (props: LanguagesComponent) => ({
  props,
});

export const Primary = Template.bind({});
Primary.args = {};

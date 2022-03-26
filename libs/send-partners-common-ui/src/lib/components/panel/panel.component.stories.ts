import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { PanelType } from './panel-type';
import { PanelComponent } from './panel.component';

interface PanelWithContent extends PanelComponent {
  content: string;
}

export default {
  title: 'Components/Panel',
  component: PanelComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    }),
  ],
  argTypes: {
    type: {
      options: Object.values(PanelType),
      control: {
        type: 'select',
      },
    },
  },
} as Meta<PanelComponent>;

const Template: Story<PanelWithContent> = (args: PanelWithContent) => ({
  props: args,
  template: `<send-partners-common-panel ${Object.keys(args)
    .filter(key => key !== 'content')
    .reduce((result, key) => `${result} [${key}]="${key}"`, '')}>{{ content }}</send-partners-common-panel>`,
});

export const Primary = Template.bind({});
Primary.args = {
  title: '',
  type: PanelType.Info,
  content: 'Lorem ipsum',
};

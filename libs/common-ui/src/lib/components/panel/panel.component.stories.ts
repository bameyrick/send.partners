import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { mapComponentPropsForTemplate } from '../../../../.storybook/map-props';
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

const Template: Story<PanelWithContent> = (props: PanelWithContent) => ({
  props,
  template: `<common-panel ${mapComponentPropsForTemplate(props)}>{{ content }}</common-panel>`,
});

export const Primary = Template.bind({});

Primary.args = {
  title: '',
  type: PanelType.Info,
  content: 'Lorem ipsum',
};

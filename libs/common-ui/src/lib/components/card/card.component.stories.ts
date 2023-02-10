import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { mapComponentPropsForTemplate } from '../../../../.storybook/map-props';
import { CommonUiStorybookModule } from '../../common-ui.storybook.module';
import { CardComponent } from './card.component';

interface CardWithContent extends CardComponent {
  content: string;
}

export default {
  title: 'Components/Card',
  component: CardComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonUiStorybookModule],
    }),
  ],
  parameters: {
    backgrounds: {
      default: 'light',
    },
  },
} as Meta<CardComponent>;

const Template: Story<CardWithContent> = (props: CardWithContent) => ({
  props,
  template: `<card ${mapComponentPropsForTemplate(props)}>{{ content }}</card>`,
});

export const Primary = Template.bind({});

Primary.args = {
  content:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas lacus diam, euismod a tincidunt eu, fringilla commodo magna. Curabitur id odio quis sem semper blandit sed a felis. Aenean volutpat sodales orci sed volutpat. Fusce at arcu quis lacus ultrices tincidunt non sed libero. Sed nisl dui, efficitur non vehicula non, condimentum ut nunc. Pellentesque arcu lorem, pellentesque non ipsum ut, aliquam tempus mi. In tristique turpis sed porttitor hendrerit. Duis sem felis, semper sit amet ultrices a, facilisis et tortor.',
};

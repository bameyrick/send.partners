import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { mapComponentPropsForTemplate } from '../../../../.storybook/map-props';
import { Icon } from '../../enums';
import { CommonUiModule } from '../../common-ui.module';
import { ButtonStyle } from './button-style';
import { ButtonComponent } from './button.component';

interface ButtonWithContent extends ButtonComponent {
  content: string;
}

export default {
  title: 'Components/Button',
  component: ButtonComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonUiModule],
    }),
  ],
  argTypes: {
    style: {
      options: Object.values(ButtonStyle),
      control: {
        type: 'radio',
      },
    },
    icon: {
      options: Object.values(Icon),
      control: {
        type: 'select',
      },
    },
  },
} as Meta<ButtonWithContent>;

const Template: Story<ButtonWithContent> = (props: ButtonWithContent) => ({
  props,
  template: `<button ${mapComponentPropsForTemplate(props)}>{{ content }}</button>`,
});

export const Primary = Template.bind({});
Primary.args = {
  content: 'Button',
  style: ButtonStyle.Primary,
  disabled: false,
  loading: false,
  iconOnly: false,
};

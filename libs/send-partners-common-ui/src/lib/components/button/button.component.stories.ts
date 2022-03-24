import { HttpClientModule } from '@angular/common/http';
import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { Icon } from '../../enums';
import { IconModule } from '../../icon';
import { ButtonComponent } from './button.component';

interface ButtonWithContent extends ButtonComponent {
  content: string;
}

export default {
  title: 'ButtonComponent',
  component: ButtonComponent,
  decorators: [
    moduleMetadata({
      imports: [IconModule, HttpClientModule],
    }),
  ],
  argTypes: {
    icon: {
      options: Object.values(Icon),
      control: {
        type: 'select',
      },
    },
  },
} as Meta<ButtonWithContent>;

const Template: Story<ButtonWithContent> = (args: ButtonWithContent) => ({
  props: args,
  template: `<button ${Object.keys(args)
    .filter(key => key !== 'content')
    .reduce((result, key) => `${result} [${key}]="${key}"`, '')}>{{ content }}</button>`,
});

export const Primary = Template.bind({});
Primary.args = {
  content: 'Button',
  disabled: false,
  loading: false,
  iconOnly: false,
};

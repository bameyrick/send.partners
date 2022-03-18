import { HttpClientModule } from '@angular/common/http';
import { moduleMetadata, Story, Meta } from '@storybook/angular';
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
} as Meta<ButtonWithContent>;

const Template: Story<ButtonWithContent> = (args: ButtonWithContent) => ({
  props: args,
  template: `<button [disabled]="disabled" [loading]="loading">{{ content }}</button>`,
});

export const Primary = Template.bind({});
Primary.args = {
  content: 'Button',
  disabled: false,
  loading: false,
};

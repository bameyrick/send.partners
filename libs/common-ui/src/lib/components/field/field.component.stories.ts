import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { CommonUiModule } from '../../common-ui.module';
import { FieldComponent } from './field.component';

export default {
  title: 'Components/Field',
  component: FieldComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonUiModule],
    }),
  ],
} as Meta<FieldComponent>;

const Template: Story<FieldComponent> = (args: FieldComponent) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {};

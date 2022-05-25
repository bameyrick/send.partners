import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { SendPartnersCommonUiModule } from '../../send-partners-common-ui.module';
import { FieldComponent } from './field.component';

export default {
  title: 'Components/Field',
  component: FieldComponent,
  decorators: [
    moduleMetadata({
      imports: [SendPartnersCommonUiModule],
    }),
  ],
} as Meta<FieldComponent>;

const Template: Story<FieldComponent> = (args: FieldComponent) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {};

import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { Icon } from '../../enums';
import { StorybookToasterServiceComponent, StorybookToasterServiceModule } from './storybook-example';

export default {
  title: 'Services/Toaster',
  component: StorybookToasterServiceComponent,
  decorators: [
    moduleMetadata({
      imports: [StorybookToasterServiceModule],
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
} as Meta<StorybookToasterServiceComponent>;

const Template: Story<StorybookToasterServiceComponent> = (props: StorybookToasterServiceComponent) => ({ props });

export const Primary = Template.bind({});

Primary.args = {
  title: '',
  body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean pharetra enim vel lacus laoreet tincidunt. Vestibulum consectetur consectetur lacus, commodo congue dolor rhoncus sit amet. Nunc lacus dolor, tincidunt sed odio sed, consectetur molestie eros. Morbi ut tempus ex, sed fermentum nisi.',
  duration: 10,
  icon: undefined,
};

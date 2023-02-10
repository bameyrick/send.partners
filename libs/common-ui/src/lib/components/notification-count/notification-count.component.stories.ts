import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { CommonUiStorybookModule } from '../../common-ui.storybook.module';
import { NotificationCountComponent } from './notification-count.component';

export default {
  title: 'Components/Notification Count',
  component: NotificationCountComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonUiStorybookModule],
    }),
  ],
} as Meta<NotificationCountComponent>;

const Template: Story<NotificationCountComponent> = (props: NotificationCountComponent) => ({
  template: `<notification-count ${Object.keys(props).reduce((result, key) => `${result} [${key}]="${key}"`, '')}></notification-count>`,
  props,
});

export const Primary = Template.bind({});

Primary.args = {
  count: 5,
};

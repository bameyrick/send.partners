import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { mapComponentPropsForTemplate } from '../../../../.storybook/map-props';
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
  template: `<notification-count ${mapComponentPropsForTemplate(props)}></notification-count>`,
  props,
});

export const Primary = Template.bind({});

Primary.args = {
  count: 5,
};

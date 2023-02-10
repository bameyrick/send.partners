import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { mapComponentPropsForTemplate } from '../../../../.storybook/map-props';
import { CommonUiStorybookModule } from '../../common-ui.storybook.module';
import { AvatarComponent } from './avatar.component';

export default {
  title: 'Components/Avatar',
  component: AvatarComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonUiStorybookModule],
    }),
  ],
} as Meta<AvatarComponent>;

const Template: Story<AvatarComponent> = (props: AvatarComponent) => ({
  template: `<avatar ${mapComponentPropsForTemplate(props)}></avatar>`,
  props,
});

export const Primary = Template.bind({});

Primary.args = {};

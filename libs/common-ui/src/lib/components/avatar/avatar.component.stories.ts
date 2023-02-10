import { Meta, moduleMetadata, Story } from '@storybook/angular';
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
  template: `<avatar ${Object.keys(props).reduce((result, key) => `${result} [${key}]="${key}"`, '')}></avatar>`,
  props,
});

export const Primary = Template.bind({});

Primary.args = {};

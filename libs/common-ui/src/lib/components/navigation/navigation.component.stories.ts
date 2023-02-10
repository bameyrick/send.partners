import { AppPath } from '@common';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { CommonUiStorybookModule } from '../../common-ui.storybook.module';
import { Colour, Icon } from '../../enums';
import { NavigationComponent } from './navigation.component';

export default {
  title: 'Components/Navigation',
  component: NavigationComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonUiStorybookModule],
    }),
  ],
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'light',
    },
  },
} as Meta<NavigationComponent>;

const Template: Story<NavigationComponent> = (props: NavigationComponent) => ({
  template: `
    <navigation ${Object.keys(props).reduce((result, key) => `${result} [${key}]="${key}"`, '')}></navigation>
    <main>
      <h2>Dashboard</h2>
    </main>
  `,
  props,
});

export const Primary = Template.bind({});

Primary.args = {
  navigationGroups: [
    {
      items: [
        {
          url: AppPath.Root,
          translationKey: 'admin.dashboard',
          icon: Icon.TableLayout,
          iconColour: Colour.text,
        },
      ],
    },
    {
      items: [
        {
          url: AppPath.Users,
          translationKey: 'admin.users',
          icon: Icon.Users,
          iconColour: Colour.text,
        },
      ],
    },
    {
      url: AppPath.Activities,
      translationKey: 'activities.activities',
      icon: Icon.Bell,
      iconColour: Colour.text,
      items: [
        {
          url: AppPath.Activity,
          icon: Icon.Hiking,
          iconColour: Colour.grey,
          translationKey: 'activities.hiking',
          notificationCount: 2,
        },
        {
          url: AppPath.Activity,
          icon: Icon.Running,
          iconColour: Colour.grey,
          translationKey: 'activities.running',
          notificationCount: 1,
        },
        {
          url: AppPath.Activity,
          icon: Icon.Running,
          iconColour: Colour.grey,
          translationKey: 'activities.climbing',
          notificationCount: 0,
        },
      ],
    },
    {
      url: AppPath.Groups,
      translationKey: 'groups.groups',
      icon: Icon.Group,
      iconColour: Colour.text,
      items: [
        {
          url: AppPath.Group,
          icon: Icon.Hiking,
          iconColour: Colour.red,
          translationKey: 'Boulders Climbing Club',
          notificationCount: 2,
        },
        {
          url: AppPath.Group,
          icon: Icon.Running,
          iconColour: Colour.green,
          translationKey: 'RocBloc Climbing Club',
          notificationCount: 10,
        },
        {
          url: AppPath.Group,
          icon: Icon.Running,
          iconColour: Colour.orange,
          translationKey: 'Cardiff Running Club',
          notificationCount: 1,
        },
      ],
    },
  ],
};

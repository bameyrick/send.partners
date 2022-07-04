import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { mapComponentPropsForTemplate } from '../../../../.storybook/map-props';
import { SendPartnersCommonUiModule } from '../../send-partners-common-ui.module';
import { DropdownComponent } from './dropdown.component';

export default {
  title: 'Components/Dropdown',
  component: DropdownComponent,
  decorators: [
    moduleMetadata({
      imports: [SendPartnersCommonUiModule],
    }),
  ],
} as Meta<DropdownComponent>;

const Template: Story<DropdownComponent> = (props: DropdownComponent) => ({
  props,
  template: `<dropdown ${mapComponentPropsForTemplate(props)} [ngModel]="''">
    <dropdown-option>Option 1</dropdown-option>
    <dropdown-option>Option 2</dropdown-option>
    <dropdown-option>Option 3</dropdown-option>
  </dropdown>`,
});

export const Primary = Template.bind({});

Primary.args = {
  label: 'Dropdown',
};

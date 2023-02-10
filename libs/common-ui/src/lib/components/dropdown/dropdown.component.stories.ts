import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { mapComponentPropsForTemplate } from '../../../../.storybook/map-props';
import { CommonUiStorybookModule } from '../../common-ui.storybook.module';
import { DropdownComponent } from './dropdown.component';

export default {
  title: 'Components/Dropdown',
  component: DropdownComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonUiStorybookModule],
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

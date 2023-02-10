import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { mapComponentPropsForTemplate } from '../../../../.storybook/map-props';
import { CommonUiStorybookModule } from '../../common-ui.storybook.module';
import { CheckboxComponent } from './checkbox.component';

export default {
  title: 'Components/Checkbox',
  component: CheckboxComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonUiStorybookModule],
    }),
  ],
} as Meta<CheckboxComponent>;

const Template: Story<CheckboxComponent> = (props: CheckboxComponent) => ({
  template: `<checkbox ${mapComponentPropsForTemplate(props)} [ngModel]="false"></checkbox>`,
  props,
});

export const Primary = Template.bind({});

Primary.args = {
  label: 'Checkbox',
};

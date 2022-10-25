import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { CommonUiModule } from '../../common-ui.module';
import { CheckboxComponent } from './checkbox.component';

export default {
  title: 'Components/Checkbox',
  component: CheckboxComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonUiModule],
    }),
  ],
} as Meta<CheckboxComponent>;

const Template: Story<CheckboxComponent> = (props: CheckboxComponent) => ({
  template: `<checkbox ${Object.keys(props).reduce((result, key) => `${result} [${key}]="${key}"`, '')} [ngModel]="false"></checkbox>`,
  props,
});

export const Primary = Template.bind({});

Primary.args = {
  label: 'Checkbox',
};

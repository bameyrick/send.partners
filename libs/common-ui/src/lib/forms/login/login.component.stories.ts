import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { CommonUiStorybookModule } from '../../common-ui.storybook.module';
import { ENABLE_LOGGING } from '../../tokens';
import { DEFAULT_LANGUAGE, LANGUAGES, USE_DEFAULT_LANGUAGE } from '../../translate';
import { LoginComponent } from './login.component';

export default {
  title: 'Components/Login',
  component: LoginComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonUiStorybookModule, StoreModule.forRoot({}), RouterTestingModule],
      providers: [
        {
          provide: LANGUAGES,
          useValue: [{ code: 'en', displayValue: 'English' }],
        },
        {
          provide: DEFAULT_LANGUAGE,
          useValue: 'en',
        },
        {
          provide: USE_DEFAULT_LANGUAGE,
          useValue: true,
        },
        {
          provide: ENABLE_LOGGING,
          useValue: false,
        },
      ],
    }),
  ],
} as Meta<LoginComponent>;

const Template: Story<LoginComponent> = (args: LoginComponent) => ({
  props: args,
});

export const Primary = Template.bind({});

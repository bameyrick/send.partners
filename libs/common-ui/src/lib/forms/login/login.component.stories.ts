import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { CommonUiModule } from '../../common-ui.module';
import { ENABLE_LOGGING } from '../../tokens';
import { DEFAULT_LANGUAGE, LANGUAGES, USE_DEFAULT_LANGUAGE } from '../../translate';
import { LoginComponent } from './login.component';

export default {
  title: 'Components/Login',
  component: LoginComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonUiModule, StoreModule.forRoot({}), RouterTestingModule],
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

import { Component, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LatLon } from '@common';
import { AbstractAuthFormComponent } from '@common-ui';
import { SignupActions } from '../../store';

@Component({
  selector: 'app-signup-location-form',
  templateUrl: './signup-location-form.component.html',
  styleUrls: ['./signup-location-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SignupLocationFormComponent extends AbstractAuthFormComponent {
  public gettingLocation = false;

  public errorKey?: string;

  private readonly location = new FormControl<LatLon>([0, 0]);

  public readonly form = new FormGroup({
    location: this.location,
  });

  public getLocation(): void {
    if (!this.gettingLocation) {
      this.gettingLocation = true;
      this.errorKey = undefined;

      navigator.geolocation.getCurrentPosition(
        result => {
          this.location.setValue([result.coords.latitude, result.coords.longitude]);

          this.submit();

          this.gettingLocation = false;
        },
        error => {
          this.errorKey = `send_partners.location_error.code_${error.code}`;
          this.gettingLocation = false;
        }
      );
    }
  }

  protected dispatch(): void {
    this.store.dispatch(SignupActions.setLocation(this.form.value as { location: LatLon }));
  }
}

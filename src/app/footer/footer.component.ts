import { Component } from '@angular/core';
import { AboutService } from '../shared/about.service';

@Component({
  selector: 'alm-app-footer',
  templateUrl: './footer.component.html',
  styleUrls: [/* Uncomment when styles are added './footer.component.scss'*/],
})

export class FooterComponent {

  constructor(public about: AboutService) {

  }

}

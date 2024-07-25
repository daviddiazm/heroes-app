import { Component } from '@angular/core';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styleUrl: './new-page.component.css'
})
export class NewPageComponent {

  public publishers = [
    {
      id: 'DC comics',
      desc: 'DC-comics'
    },
    {
      id: 'Marvel comics',
      desc: 'Marvel-comics'
    },
  ]
}

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PartListComponent } from './features/part/partlist/part-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PartListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'parts-ui';
}

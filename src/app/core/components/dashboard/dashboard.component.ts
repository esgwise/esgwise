import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'esg-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'US Equity', cols: 1, rows: 1 },
          { title: 'EU Equity', cols: 1, rows: 1 },
          { title: 'Emering Equity', cols: 1, rows: 1 },
          { title: 'Japan Equity', cols: 1, rows: 1 }
        ];
      }

      return [
        { title: 'US Equity', cols: 2, rows: 1 },
        { title: 'EU Equity', cols: 1, rows: 1 },
        { title: 'Emering Equity', cols: 1, rows: 2 },
        { title: 'Japan Equity', cols: 1, rows: 1 }
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver) {}
}

import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { GeolocationData } from 'src/app/shared/components/geolocation/geolocation.component';
import { IOldestNodes } from '../../../interfaces/node-api.interface';
import { LightningApiService } from '../../lightning-api.service';

@Component({
  selector: 'app-oldest-nodes',
  templateUrl: './oldest-nodes.component.html',
  styleUrls: ['./oldest-nodes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OldestNodes implements OnInit {
  @Input() widget: boolean = false;
  
  oldestNodes$: Observable<IOldestNodes[]>;
  skeletonRows: number[] = [];

  constructor(private apiService: LightningApiService) {}

  ngOnInit(): void {
    for (let i = 1; i <= (this.widget ? 10 : 100); ++i) {
      this.skeletonRows.push(i);
    }

    if (this.widget === false) {
      this.oldestNodes$ = this.apiService.getOldestNodes$().pipe(
        map((ranking) => {
          for (const i in ranking) {
            ranking[i].geolocation = <GeolocationData>{
              country: ranking[i].country?.en,
              city: ranking[i].city?.en,
              subdivision: ranking[i].subdivision?.en,
              iso: ranking[i].iso_code,
            };
          }
          return ranking;
        })
      );
    } else {
      this.oldestNodes$ = this.apiService.getOldestNodes$().pipe(
        map((nodes: IOldestNodes[]) => {
          return nodes.slice(0, 7);
        })
      );
    }
  }

}

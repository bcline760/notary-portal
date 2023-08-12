import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { LoadingService } from 'src/app/service/loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit, OnDestroy {
  public loading: boolean = false;
  private _loadingSub: Subscription | null = null;

  constructor(private loadingService: LoadingService) { }

  ngOnDestroy(): void {
    if (this._loadingSub != null) {
      this._loadingSub.unsubscribe();
    }
  }

  ngOnInit(): void {
    this._loadingSub = this.loadingService.loadingStatus.pipe(
      debounceTime(200)
    ).subscribe((v) => {
      this.loading = v
    });
  }

}

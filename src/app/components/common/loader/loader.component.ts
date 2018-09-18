import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs'
import { LoaderService } from '../../../services/common/loader.service';
import { LoaderState } from '../../../interfaces';
@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit, OnDestroy {

  shown = false;
  private subscription: Subscription;
  constructor(private loaderService: LoaderService) { }

  ngOnInit() {
    this.subscription = this.loaderService.loaderState.subscribe((state: LoaderState) => {
      this.shown = state.shown;
    })
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

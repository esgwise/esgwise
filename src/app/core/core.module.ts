import { NgModule, Optional, SkipSelf } from '@angular/core';
import { NavigationComponent } from './components/navigation/navigation.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { CategoriesDirective } from './components/directives/categories.directive';
import { CategoriesService } from './services/catgories/categories.service';
import { CategoriesComponent } from './components/categories/categories.component';

@NgModule({
  declarations: [
    NavigationComponent,
    DashboardComponent,
    CategoriesComponent,
    CategoriesDirective
  ],
  imports: [
    SharedModule,
  ],
  exports: [
    NavigationComponent,
    DashboardComponent,
    CategoriesComponent,
    CategoriesDirective
  ],
  providers: [
    CategoriesService
  ],
  entryComponents: [
    CategoriesComponent
  ]
})
export class CoreModule {
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule has already been loaded. You should only import Core modules in the AppModule only.');
    }
  }
}

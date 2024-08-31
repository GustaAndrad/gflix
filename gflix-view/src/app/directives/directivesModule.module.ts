// src/app/directives/directives.module.ts
import { NgModule } from '@angular/core';
import { AppearOnScrollDirective } from './appear-on-scroll.directive';
import { AppearRightOnScrollDirective } from './appearRight-on-scroll.directive';

@NgModule({
  declarations: [AppearOnScrollDirective, AppearRightOnScrollDirective],
  exports: [AppearOnScrollDirective, AppearRightOnScrollDirective]
})
export class DirectivesModule {}

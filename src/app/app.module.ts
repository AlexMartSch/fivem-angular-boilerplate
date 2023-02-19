import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app-routing.module';

import { AppComponent } from './app.component';
import { TestComponent } from './pages/test/test.component';
import { NativeService } from './shared/services/native.service';

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FormsModule,
    BrowserModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private nativeService: NativeService) {
    nativeService.SetupNativeService()
  }
 }

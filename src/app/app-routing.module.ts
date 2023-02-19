import { Routes } from "@angular/router";
import { AppComponent } from "./app.component";
import { TestComponent } from "./pages/test/test.component";

export const appRoutes: Routes = [
    {
        path: '',
        component: AppComponent
    },
    {
        path: 'test',
        component: TestComponent
    },

]
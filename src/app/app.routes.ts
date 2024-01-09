import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { authGuard } from "./guards/auth.guard";
import { TableComponent } from "./components/table/table.component";
import { LoginComponent } from "./components/login.component/login.component";
import { RegistrationComponent } from "./components/registration.component/registration.component";
import { ChangeWindow } from "./components/test.component/testwindow";
import { NotFoundComponent } from "./components/not-found.component/not-found.component";

export const routes: Routes = [
    { path: '', component: TableComponent, pathMatch: 'full', canActivate: [authGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'ChangeWindow', component: ChangeWindow },
    { path: 'registration', component: RegistrationComponent },
    { path: '**', component: NotFoundComponent },


]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {

}
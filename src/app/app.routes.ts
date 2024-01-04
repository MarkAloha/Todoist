import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TableComponent } from "./table/table.component";
import { RegistrationComponent } from "./registration.component/registration.component";
import { NotFoundComponent } from "./not-found.component/not-found.component";
import { LoginComponent } from "./login.component/login.component";
import { authGuard } from "./guards/auth.guard";
import { ChangeWindow } from "./table/changewindow.component/changewindow";

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
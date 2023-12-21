import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TableComponent } from "./table/table.component";
import { AuthorizationComponent } from "./authorization/authorization.component";
import { NotFoundComponent } from "./not-found.component/not-found.component";
import { LoginComponent } from "./login.component/login.component";
import { authGuard } from "./guards/auth.guard";

export const routes: Routes = [
    { path: '', component: TableComponent, pathMatch: 'full', canActivate: [authGuard] },
    { path: 'auth', component: AuthorizationComponent, },
    { path: 'login', component: LoginComponent },
    { path: 'registration', component: AuthorizationComponent },
    { path: '**', component: NotFoundComponent },


]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {

}
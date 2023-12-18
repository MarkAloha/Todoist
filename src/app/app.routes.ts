import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TableComponent } from "./table/table.component";
import { AuthorizationComponent } from "./authorization/authorization.component";
import { NotFoundComponentComponent } from "./not-found.component/not-found.component.component";
import { LoginComponentComponent } from "./login.component/login.component";

export const routes: Routes = [
    {path: '', component: TableComponent, pathMatch: 'full'},
    {path: 'auth', component: AuthorizationComponent},
    {path: 'login', component: LoginComponentComponent},
    {path: '**', component: NotFoundComponentComponent},


]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {

}
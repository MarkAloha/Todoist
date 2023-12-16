import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TableComponent } from "./table/table.component";
import { AuthorizationComponent } from "./authorization/authorization.component";

// http://localhost:4200/ -> Home
// http://localhost:4200/auth -> Auth


const routes: Routes = [
    {path: '', component: TableComponent, pathMatch: 'full'},
    {path: 'auth', component: AuthorizationComponent}

]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {

}
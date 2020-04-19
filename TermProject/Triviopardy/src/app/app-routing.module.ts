import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GameComponentComponent } from './components/game-component/game-component.component';
import { ResultsComponentComponent } from './components/results-component/results-component.component';
import { StartComponentComponent } from './components/start-component/start-component.component';


const routes: Routes = [
  {path: '',         component:StartComponentComponent},
  {path:'play',      component:GameComponentComponent},
  {path:'results',   component:ResultsComponentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

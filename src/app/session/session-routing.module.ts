import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SessionComponent } from './session.component';
import { TopicComponent } from './topic-session/topic.component';

const routes: Routes = [
  {
    path: '',
    component: SessionComponent
  },
  // {
  //   path: ':session',
  //   component: EditSessionComponent
  // },
  {
    path: ':session/topics',
    component: TopicComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class SessionRoutingModule {}

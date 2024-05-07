import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobseekerProfileCompletionGuard } from 'app/shared/services/jobseeker-profile-completion.guard';
import { ChatContainerComponent } from './components/chat-container/chat-container.component';

const routes: Routes = [
  {
      path: '',
      component:  ChatContainerComponent,
      canActivate: [JobseekerProfileCompletionGuard],
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatRoutingModule { }

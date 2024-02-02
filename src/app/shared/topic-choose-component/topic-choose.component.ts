import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VoteController } from '@api/controllers/vote.controller';
import { UserService } from '@api/services/user.service';

@Component({
 selector: 'app-topic-choose',
 styleUrls: ['./topic-choose.component.scss'],
 templateUrl: './topic-choose.component.html',
})
export class TopicChooseComponent {
  sessionId: string;
  userId: string | null;
  topicId: string;
  title:string;
 constructor(
    public dialogRef: MatDialogRef<TopicChooseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private voteController: VoteController,
    private userService: UserService
 ) {
  this.topicId = data.topicId;
  this.userId = data.userId;
  this.sessionId = data.sessionId;
  this.title = data.title;
 }

 vote() {
    let body = {
            "client_id": this.userId,
            "topic_id": this.topicId,
            "session_id": this.sessionId,
            "choice": true
        }
    let responseAPI$ = this.voteController.create(body); 
    responseAPI$.subscribe({
        next: value => {
          if(value.response.statusCode === 200 || value.response.statusCode === 201) {
            this.dialogRef.close('success');
          } else {
            this.dialogRef.close('error');
          }
        },
        error: err => {
          this.dialogRef.close('error');
        }
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
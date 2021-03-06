import { Component } from '@angular/core';

import { NotificationsService } from 'angular2-notifications';
import { ServerDataSource } from 'ng2-smart-table';

import { ConfirmService } from '../../../core';
import { Utils } from '../../../shared';
import { Friend, FriendService } from '../shared';

@Component({
  selector: 'my-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: [ './friend-list.component.scss' ]
})
export class FriendListComponent {
  friendsSource = null;
  tableSettings = {
    attr: {
      class: 'table-hover'
    },
    hideSubHeader: true,
    actions: {
      position: 'right',
      add: false,
      edit: false,
      delete: false
    },
    columns: {
      id: {
        title: 'ID',
        sort: false,
        sortDirection: 'asc'
      },
      host: {
        title: 'Host',
        sort: false
      },
      score: {
        title: 'Score',
        sort: false
      },
      createdAt: {
        title: 'Created Date',
        sort: false,
        valuePrepareFunction: Utils.dateToHuman
      }
    }
  }

  constructor(
    private notificationsService: NotificationsService,
    private confirmService: ConfirmService,
    private friendService: FriendService
  ) {
    this.friendsSource = this.friendService.getDataSource();
  }

  hasFriends() {
    return this.friendsSource.count() != 0;
  }

  quitFriends() {
    const confirmMessage = 'Do you really want to quit your friends? All their videos will be deleted.';
    this.confirmService.confirm(confirmMessage, 'Quit friends').subscribe(
      res => {
        if (res === false) return;

        this.friendService.quitFriends().subscribe(
          status => {
            this.notificationsService.success('Sucess', 'Friends left!');

            this.friendsSource.refresh();
          },

          err => this.notificationsService.error('Error', err.text)
        );
      }
    );
  }
}

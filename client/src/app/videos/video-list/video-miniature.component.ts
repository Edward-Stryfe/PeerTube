import { Component, Input, Output, EventEmitter } from '@angular/core';

import { NotificationsService } from 'angular2-notifications';

import { ConfirmService } from '../../core';
import { SortField, Video, VideoService } from '../shared';
import { User } from '../../shared';

@Component({
  selector: 'my-video-miniature',
  styleUrls: [ './video-miniature.component.scss' ],
  templateUrl: './video-miniature.component.html'
})

export class VideoMiniatureComponent {
  @Output() removed = new EventEmitter<any>();

  @Input() currentSort: SortField;
  @Input() user: User;
  @Input() video: Video;

  hovering = false;

  constructor(
    private notificationsService: NotificationsService,
    private confirmService: ConfirmService,
    private videoService: VideoService
  ) {}

  displayRemoveIcon() {
    return this.hovering && this.video.isRemovableBy(this.user);
  }

  onBlur() {
    this.hovering = false;
  }

  onHover() {
    this.hovering = true;
  }

  removeVideo(id: string) {
    this.confirmService.confirm('Do you really want to delete this video?', 'Delete').subscribe(
      res => {
        if (res === false) return;

        this.videoService.removeVideo(id).subscribe(
          status => this.removed.emit(true),

          error => this.notificationsService.error('Error', error.text)
        );
      }
    );
  }
}

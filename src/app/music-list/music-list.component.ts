import {Component, OnInit} from '@angular/core';
import {MusicListService} from '../music-list.service';

@Component({
  selector: 'app-music-list',
  templateUrl: './music-list.component.html',
  styleUrls: ['./music-list.component.css']
})
export class MusicListComponent implements OnInit {
  musics: any[];

  constructor(private musicService: MusicListService) {
  }

  ngOnInit() {
    this.musicService.list().subscribe(
      list => {
        this.musics = list.map(item => {
          return item.payload.val();
        });
      }
    );
  }
}

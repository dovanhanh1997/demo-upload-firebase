import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFireDatabase} from '@angular/fire/database';
import {AngularFireStorage} from '@angular/fire/storage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'upload-file-to-firebase02';
  selectFile: File = null;
  fileUrl: Observable<string | null>;
  musicUrl = '';
  itemValue = '';
  items = new Observable<any[]>();

  constructor(private db: AngularFireDatabase, private afStorage: AngularFireStorage) {
  }

  //
  // onSubmit() {
  //   this.db.list('items').push({content: this.itemValue});
  //   this.itemValue = '';
  // }

  onSelectedFile(event) {
    console.log(event);
    this.selectFile = event.target.files[0] as File;
    console.log(this.selectFile);
  }

  upLoad() {
    return this.afStorage.ref(`music/${this.selectFile.name}`).put(this.selectFile);
  }

  list() {
    const ref = this.afStorage.ref('music/NguoiEmKhongYeu-QuangVinh-2430593.mp3');
    this.fileUrl = ref.getDownloadURL();
    this.fileUrl.subscribe(url => {
      this.musicUrl = url;
      console.log(this.musicUrl);
    });
  }
}

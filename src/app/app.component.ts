import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'upload-file-to-firebase02';
  selectFile: File = null;
  listMusic: any[];
  databaseList: AngularFireList<any>;

  constructor(private afDatabase: AngularFireDatabase, private afStorage: AngularFireStorage) {
  }

  //
  // onSubmit() {
  //   this.afDatabase.list('items').push({content: this.itemValue});
  //   this.itemValue = '';
  // }

  onSelectedFile(event) {
    this.selectFile = event.target.files[0] as File;
    console.log(this.selectFile);
  }

  upLoad() {
    this.databaseList = this.afDatabase.list('/list');
    const firePath = `${this.selectFile.name}`;
    const fireRef = this.afStorage.ref(firePath);
    this.afStorage.upload(firePath, this.selectFile).snapshotChanges().pipe(
      finalize(() => {
        fireRef.getDownloadURL().subscribe((url) => {
          this.databaseList.push({musicUrl: url});
        });
      })
    ).subscribe();
  }


}

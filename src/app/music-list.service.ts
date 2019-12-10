import {Injectable} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class MusicListService {
  listMusic: any[];

  constructor(private afDatabase: AngularFireDatabase) {
    this.list();
  }

  list() {
    return this.afDatabase.list('/list').snapshotChanges();
  }
}



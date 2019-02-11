import { Injectable } from '@angular/core';
import { Post } from '../models/post';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class CrudPostService {

  postsRef: AngularFireList<any>;
  postRef: AngularFireObject<any>;

  constructor(
    private db: AngularFireDatabase
  ) { }

  addPost(post: Post) {
    this.postsRef.push({
      avatarURL: post.avatarURL,
      displayName: post.displayName,
      body: post.body,
      photoUrl: post.photoUrl,
      like: 0
    })
  }

  getPost(id: string) {
    this.postRef = this.db.object('posts/' + id);
    return this.postRef;
  }

  getPostsList() {
    this.postsRef = this.db.list('posts');
    return this.postsRef;
  }

  updatePost(post: Post) {
    this.postRef.update({
      avatarURL: post.avatarURL,
      displayName: post.displayName,
      body: post.body,
      photoUrl: post.photoUrl,
      like: post.like
    })
  }

  deletePost(id: string) {
    this.postRef = this.db.object('posts/' + id);
    this.postRef.remove();
  }
}

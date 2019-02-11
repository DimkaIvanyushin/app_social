import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { CrudPostService } from 'src/app/shared/services/crud-post.service';    // CRUD services API
import { AuthService } from 'src/app/shared/services/auth.service';
import { Post } from 'src/app/shared/models/post';
import { PostListComponent } from '../post-list/post-list.component';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.pug',
  styleUrls: ['./add-post.component.styl']
})
export class AddPostComponent implements OnInit {

  public postForm: FormGroup;

  constructor(
    public crudApi: CrudPostService,  
    public fb: FormBuilder,
    public authService: AuthService
  ) { }

  ngOnInit() {
    this.crudApi.getPostsList();  
    this.postsForm();   
  }

  postsForm() {
    this.postForm = this.fb.group({
      body: ['', [Validators.required, Validators.minLength(2)]],
      photoUrl: ['']
    })  
  }

  get body() {
    return this.postForm.get('body');
  }

  get photoUrl() {
    return this.postForm.get('photoUrl');
  }  

  resetForm() {
    this.postForm.reset();
  }  
 
  submitPostData() {
    this.postForm.value.displayName = this.authService.userData.displayName;
    this.postForm.value.avatarURL = this.authService.userData.photoURL;
    this.crudApi.addPost(this.postForm.value);
    this.resetForm();
   };

}
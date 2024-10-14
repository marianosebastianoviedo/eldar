import { Component, signal, ViewChild, WritableSignal } from '@angular/core';

import { FormBuilder, FormsModule } from '@angular/forms';
import { FormGroup, ReactiveFormsModule,Validators } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { Table } from 'primeng/table';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { StyleClassModule } from 'primeng/styleclass';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
import { DialogModule } from 'primeng/dialog';
import { AvatarModule } from 'primeng/avatar';
import { InputTextareaModule } from 'primeng/inputtextarea';


import { DataService } from '../../services/data.service';
import { Post } from '../../models/post.model';
import { MessageService } from 'primeng/api';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    ButtonModule, 
    TableModule, 
    IconFieldModule, 
    InputIconModule, 
    InputTextModule, 
    StyleClassModule, 
    ToastModule, 
    RippleModule,
    DialogModule,
    AvatarModule,
    InputTextareaModule,
    FormsModule,
    ReactiveFormsModule

  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  @ViewChild('dt') dt: Table | any;
  editarP:boolean = false;
  agregarP:boolean = false;
  visible: boolean = false;
  loading:boolean = false;
  posts: WritableSignal<Post[]> = signal([]);
  initialposts:any = [{
    id: 120,
    title: 'Oviedo Mariano',
    body: 'Programador Web hace seis años, Primera vez usando PrimeNg, aprendiendo desde la documentación sobre la marcha.',
    userId: 1
  }];
  editForm: FormGroup ;
constructor(
  private data:DataService,
  private messageService: MessageService,
  private appC:AppComponent,
  private formBuilder: FormBuilder
){
  this.editForm = this.formBuilder.group({
    id:['',[Validators.required, Validators.minLength(3)]],
    userId:['',[Validators.required, Validators.minLength(3)]],
    title:['',[Validators.required, Validators.minLength(3)]],
    body:['',[Validators.required, Validators.minLength(3)]],
  });
  this.getFullData();
}
get userCategory(){
  return this.appC.isAdmin();
}
showDialog(postId?:number) {
  if(postId === undefined){
    this.agregarP = true;
    this.editarP = false;
  } else {
    this.agregarP = false;
    this.editarP = true;
    if ( postId === 120 || postId === 101){
      alert('Este post no se puede editar, por favor lea la descripción');
      return;
    }
    let totalPosts:Post[] = this.posts();
    const index = totalPosts.findIndex((post) => post.id === postId );
    this.editForm.reset({
      id:totalPosts[index].id,
      userId:totalPosts[index].userId,
      title:totalPosts[index].title,
      body:totalPosts[index].body,
    })
  }
  this.visible = true;
  console.log(this.editForm);
  
}
createPost(){
  this.loading = true;
  let totalPosts:Post[] = this.posts();
  
  let body = {
    title: this.editForm.value.title,
    body: this.editForm.value.body,
    userId: 1,
  }
  this.data.createPost(body).subscribe({
    next: (createdPost)=>{
      totalPosts.push(createdPost);
      this.posts.set(totalPosts);
      this.messageService.add({ severity: 'success', summary: 'Post Creado', detail: 'Tu post fue creado con éxito' });
      this.loading = false;
      this.visible = false;
      //this.dt.reset();     
    },
    error: (error)=>{
      console.log(error);
      this.loading = false;
    },
    complete: ()=>{console.log('CREATED')}
  });
}
editPost(){

  let totalPosts:Post[] = this.posts();
  const index = totalPosts.findIndex((post) => post.id === this.editForm.value.id );

  this.loading = true;
  let body = this.editForm.value
  this.data.updatePost(body).subscribe({
    next: (updatedPost:Post)=>{
      totalPosts[index] = updatedPost;
      this.posts.set(totalPosts);
      this.messageService.add({ severity: 'success', summary: 'Post Editado', detail: 'Tu post fue actualizado con éxito' });
      this.loading = false;
      this.visible = false;
    },
    error: (error)=>{
      console.log(error)
      this.loading = false;
    },
    complete: ()=>{console.log('UPDATED')}
  });
}

getFullData(){
  this.loading = true;
  this.data.getPosts().subscribe({
    next: (posts:any)=>{
      this.initialposts.push(...posts);
      this.posts.set(this.initialposts)
      this.loading = false;
    },
    error: (error)=>{
      console.log(error)
      this.loading = false;
    },
    complete: ()=>{console.log('COMPLETE DATA')},
  });
}
}

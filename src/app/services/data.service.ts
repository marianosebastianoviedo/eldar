import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../models/post.model';


const BASE_URL = 'https://jsonplaceholder.typicode.com/';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) { }
  getPosts(){
    return this.http.get<Post[]>(`${BASE_URL}posts`);
  }
  createPost(body:Post){
    return this.http.post<Post>(`${BASE_URL}posts`, body);
  }
  updatePost(body:Post){
    return this.http.put<Post>(`${BASE_URL}posts/${body.id}`, body);
  }
}
import { Component, Input, OnInit } from '@angular/core';
import { BookBoostService } from '../../../services/bookboost.service';
import { User } from '../../../interfaces';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-user',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit {

  genres = [
    "Romance",
    "Fantasy",
    "MysteryThriller",
    "ScienceFiction",
    "YoungAdult",
    "NonFiction"
  ];
  @Input() user!: any;
  userAccount!: User;
  userForm: FormGroup;

  constructor(private bookboostService: BookBoostService, private fb: FormBuilder){
    this.userForm = this.fb.group({
      genres: this.fb.array(this.genres.map(() => new FormControl(false)))
    });
  }

  get genreArray(): FormArray {
    return this.userForm.get('genres') as FormArray;
  }

  get selectedGenres(): string[] {
    return this.genres.filter((_, i) => this.genreArray.at(i).value);
  }

  onSubmit() {
    console.log('Selected Genres:', this.selectedGenres);
  }

  ngOnInit() {
    this.bookboostService.getUser(this.user.clientPrincipal.userId).subscribe(
      (user) => {
        console.log(user);
        this.userAccount = user;
      },
      (error) => {
        if(error.status == 404){
          let newUser = {
            userId: this.user.clientPrincipal.userId,
            username: this.user.clientPrincipal.userDetails
          } as User;
          this.bookboostService.upsertUser(newUser).subscribe(data => console.log(data));
        }
      }
    );
  }

}

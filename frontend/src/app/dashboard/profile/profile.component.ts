import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  //Should be replaced with the database data
  options = [
    {gender: 'Masculino'},
    {gender: 'Femenino'},
    {gender: 'Otro'}
  ];
}

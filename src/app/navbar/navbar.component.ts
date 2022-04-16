import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  path: string = "../assets/images/conestoga.png";
  alt: string = "conestogaPic";

  ngOnInit(): void {
  }

}

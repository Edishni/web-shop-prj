import { Component, OnInit } from '@angular/core';
import { UserService } from '../../authentication/user.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(public userAdmin : UserService) { }

  ngOnInit(): void {
  }

}

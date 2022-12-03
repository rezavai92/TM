import { Component, OnInit } from '@angular/core';
import { GetUserResponse } from 'src/app/shared/models/interfaces/user.interface';
import { AuthService } from 'src/app/shared/services/auth-services/auth.service';
import { UserService } from 'src/app/shared/services/user-services/user.service';

@Component({
	selector: 'app-my-profile',
	templateUrl: './my-profile.component.html',
	styleUrls: ['./my-profile.component.scss'],
})
export class MyProfileComponent implements OnInit {
	loggedInUser!: GetUserResponse;
	constructor(
		private userService: UserService,
		private authService: AuthService
	) {}

	ngOnInit(): void {
		this.authService.getLoggedInUser().subscribe((user) => {
			this.loggedInUser = user;
			console.log('loged', this.loggedInUser);
		});
	}
}

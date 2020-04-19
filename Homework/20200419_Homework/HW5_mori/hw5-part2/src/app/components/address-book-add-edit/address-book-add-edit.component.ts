import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';

import { Contact } from '../../model/contact';
import { AddressProviderService } from 
          '../../model/address-provider.service';

@Component({
  selector: 'app-address-book-add-edit',
  templateUrl: './address-book-add-edit.component.html',
  styleUrls: ['./address-book-add-edit.component.css']
})
export class AddressBookAddEditComponent implements OnInit {

	friend: Contact;
	title:  string;

  constructor(private route: ActivatedRoute,
      private provider: AddressProviderService,
      private router: Router) { }

  ngOnInit() {
  	
  	let id = this.route.snapshot.params['id'];
    if (id) {
        this.title = 'Edit Contact';
        this.friend = this.provider.getFriend(id);
    } else {
    	this.title = "Add Contact";
			this.friend = this.provider.addFriend();
		}
		console.log(this.friend);
  }

  // call the provider function Save Friend to update the edits (or add a new friend)
  saveChanges() {
    let id = this.route.snapshot.params['id'];
    this.provider.saveFriend(id, this.friend)
  }

  // simply return to /details, don't save the changes
  cancelChanges() {
    this.router.navigate(["/details"])
  }

}

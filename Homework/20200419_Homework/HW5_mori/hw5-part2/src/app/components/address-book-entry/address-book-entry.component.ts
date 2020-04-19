import { Component, OnInit, OnDestroy } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { Contact } from '../../model/contact';
import { AddressProviderService } from 
    '../../model/address-provider.service';


@Component({
  selector: 'app-address-book-entry',
  templateUrl: './address-book-entry.component.html',
  styleUrls: ['./address-book-entry.component.css']
})
export class AddressBookEntryComponent implements 
                  OnInit, OnDestroy  {

	friend: Contact;
	sub: any;
  totalContacts: any;
  firstContact: any;

  constructor(private route: ActivatedRoute,
  		private provider: AddressProviderService) { }

  // find either the largest, or smallest, ID so that we can remove "Next" and "Prev" as necessary
  getMinMaxContactID(side):number {
    let friendIds: Array<number> = [];
    this.provider.getFriends().forEach(friend => {friendIds.push(friend.id)})
    if(side === "max") {
      return friendIds.sort((a,b) => b-a)[0];
    } else {
      return friendIds.sort((a,b) => a-b)[0];
    }
  }

  ngOnInit() {
    
    // fixed Total Contacts since deletions screw up the ID system
    this.totalContacts = this.getMinMaxContactID("max")

    // added first contact to remove Next when necessary
    this.firstContact = this.getMinMaxContactID("min")

  	this.sub = 
      this.route.params.subscribe(params => {
        console.log(params);
        let id: string = params['id'];
        this.friend = this.provider.getFriend(+id);
      });
  
      console.log(`firstContact = ${this.firstContact}`)
  }

  ngOnDestroy() {
    console.log("ngOnDestroy");
    this.sub.unsubscribe();
  }

  // call the new provider function deleteFriend to remove that particular ID
  deleteFriend(id) {
    this.provider.deleteFriend(id)
  }
}


























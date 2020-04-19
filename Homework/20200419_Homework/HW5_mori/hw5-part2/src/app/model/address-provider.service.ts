import { Injectable } from '@angular/core';

import { Contact } from './contact';
import { CONTACTS } from './mock-data';

@Injectable({
  providedIn: 'root'
})
export class AddressProviderService {

  constructor() { }

  getFriends(): Contact[] {
  	return CONTACTS;
  }

  getFriend(id: number): Contact {
  	let friends:Contact[] = this.getFriends();
    let friend: Contact = friends.find(
			f => {return (f.id == id)});
	// returning a copy so that we can edit it and decide if we want to save it later
    return {...friend};
  }

  addFriend(): Contact {
  	let friends:Contact[] = this.getFriends();
  	let maxId: number;
  	
  	if (friends && friends.length > 0) {
		let friendIds: Array<number> = []
		// maxId had to be fixed now that we're involving deletions; we can't assume that the lenght + 1 is the next available id
		friends.forEach(friend => {friendIds.push(friend.id)})
		  maxId = friendIds.sort((a,b) => b-a)[0];
  	} else {
  		maxId = 0;
  	}

  	let friend: Contact = new Contact();
	  friend.id = maxId + 1;
	// same thing as getFriend(), returning a copy
  	return {...friend};
  }

  // this functionality gives us the ability to save/update individual records
  saveFriend(id:number, updatedFriend:Contact): void {
	let friendIndex: number = this.getFriendIndex(id);
	let friends: Contact[] = this.getFriends();
	if(friendIndex >= 0) {
		friends[friendIndex] = updatedFriend;
	} else {
		friends.push(updatedFriend)
	}
  }

  // helper function to identify the Array Index of the particuar object (because the IDs will change due to deletions)
  getFriendIndex(id):number {
	let friends: Contact[] = this.getFriends();
	for(let i:number = 0; i<friends.length; i++) {
		if (friends[i].id == id) {
			console.log("id", i)
			return i
		}
	}
	return -1;
  }

  // ask if we are sure we want to delete the friend, if so, splice out the friend from the CONTACTS
  deleteFriend(id) {
	 let friends: Contact[] = this.getFriends();
	 let confirmation: boolean = confirm("Are you sure you want to delete this friend?")
	 if(confirmation) {
		friends.splice(this.getFriendIndex(id), 1)
	 }
  }

}

import { UUID } from 'crypto';
import { item } from '../models/item';
import { Injectable } from '@angular/core';
import { user } from '../models/user';

@Injectable({
    providedIn: 'root'
})

export class userService{
    
    userList: user[] = [{
        id: crypto.randomUUID(),
        firstName: "Danny",
        lastName: "Wu",
        userItems: [{
            id: crypto.randomUUID(),
            title: "Chores",
            completionStatus: true,
            dueDate: new Date()
            },
            {
            id: crypto.randomUUID(),
            title: "Homework",
            completionStatus: false,
            dueDate: new Date()
            }
        ]
        },
        {
        id: crypto.randomUUID(),
        firstName: "Test",
        lastName: "Subject",
        userItems: [{
            id: crypto.randomUUID(),
            title: "Chores",
            completionStatus: true,
            dueDate: new Date()
            }
        ]
        }
    ]

    addUser(firstName: string, lastName: string){
        let id = crypto.randomUUID();
        let user: user = {
            id: id,
            firstName: firstName,
            lastName: lastName,
            userItems: []
        }
        this.userList.push(user);
    }

    removeUser(id: UUID){
        let user = this.getUser(id)!;
        const index = this.userList.indexOf(user);
        this.userList.splice(index, 1);
    }

    getUser(id: UUID){
        let user = this.userList.find(i => i.id === id);
        return user;
    }

    updateUser(id: UUID, firstName: string, lastName: string, userItems: item[]){
        let user = this.getUser(id)!;
        user.firstName = firstName;
        user.lastName = lastName;
        user.userItems = userItems;
    }

    logInUser(firstName: string, lastName: string){
        let user = this.userList.find(u => u.firstName === firstName && u.lastName === lastName);
        return user;
    }

    getUserItems(user: user){
        return user.userItems;
    }
}
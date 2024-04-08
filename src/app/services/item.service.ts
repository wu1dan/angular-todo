import { UUID } from 'crypto';
import { item } from '../models/item';
import { Injectable } from '@angular/core';
import { user } from '../models/user';

@Injectable({
    providedIn: 'root'
})

export class itemService{

    addItem(user: user, title: string, dueDate: Date){
        let id = crypto.randomUUID();
        
        let item: item = {
            id: id,
            title: title,
            completionStatus: false,
            dueDate: dueDate
        }

        user.userItems.push(item);
    }

    removeItem(user: user, id: UUID){
        let item = this.getItem(user, id)!;
        const index = user.userItems.indexOf(item);
        user.userItems.splice(index, 1);
    }
    
    getItem(user: user, id: UUID){
        let item = user.userItems.find(i => i.id === id);
        return item;
    }

    updateItem(user: user, id: UUID, title: string, completionStatus: boolean, dueDate: Date){
        let item = user.userItems.find(i => i.id === id)!;
        let index = user.userItems.findIndex(i => i.id === id)!;
        item.title = title;
        item.completionStatus = completionStatus;
        item.dueDate = dueDate;
        user.userItems[index] = item;
    }

    getStatus(item: item){
        if (item.completionStatus){
          return 'completed';
        }
        else{
          let today = new Date();
          let dueDate = new Date(item.dueDate);
          let daysDifference = Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 3600 * 24));
          if (daysDifference < 0){
            return 'overdue';
          }
          else if (daysDifference <= 5){
            return 'upcomingdue';
          }
        }
        return 'default';
    }

    sortItems(user: user){
        user.userItems.sort((b,a) => b.dueDate.getTime() - a.dueDate.getTime());
    }
}
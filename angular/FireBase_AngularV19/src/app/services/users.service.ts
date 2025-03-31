import { Injectable } from "@angular/core";
import { User } from "../model/user";
import { Firestore, collection, collectionData, deleteDoc } from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { doc, setDoc } from "firebase/firestore";

@Injectable({
    providedIn: "root"
})

export class UsersService {
    constructor(private firestore: Firestore) { }

    addUser(user: User) {
        setDoc(doc(this.firestore, 'users', user.email), user)
    }

    getUser(): Observable<User[]> {
        const userRef = collection(this.firestore, 'users');
        return collectionData(userRef, { idField: 'id' }) as Observable<User[]>
    }

    deleteUser(user: User) {
        const userDocRef = doc(this.firestore, `users/${user.id}`);
        return deleteDoc(userDocRef);
    }

    


}
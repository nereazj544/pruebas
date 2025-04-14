import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })
export class AuthService {
    constructor(private auth: Auth, private firestore: Firestore) {}

    async register(email: string, password: string, role: string) {
        try {
            const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
            const user = userCredential.user;

            // Guardar el rol en Firestore
            await setDoc(doc(this.firestore, 'users', user.uid), { email, role });

            return user;
        } catch (error) {
            console.error('Error registering:', error);
            throw error;
        }
    }
}

import { auth } from "./fire";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

export function registerFirebase(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}
export function loginFirebase(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

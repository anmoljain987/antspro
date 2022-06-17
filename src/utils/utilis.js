import { auth } from "./fire";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

onAuthStateChanged(auth, function (user) {
  console.log("OnStateChange", user);
  if (user) {
    user.getIdToken().then((token) => {
      console.log("token", token);
      localStorage.setItem("token", token);
    });
    return;
  }
  localStorage.setItem("token", null);
});
export function registerFirebase(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}
export function loginFirebase(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function logoutFire() {
  return signOut(auth);
}

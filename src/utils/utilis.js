import { auth } from "./fire";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";
import { message } from "antd";
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
const provider = new GoogleAuthProvider();
export function googleLogin() {
  signInWithPopup(auth, provider);
}
export function logoutFire() {
  return signOut(auth);
}

export function resetPassword(email) {
  sendPasswordResetEmail(auth, email)
    .then(() => {
      message.success("Reset Link Sent");
    })
    .catch((err) => {
      message.error(err.message);
    });
}

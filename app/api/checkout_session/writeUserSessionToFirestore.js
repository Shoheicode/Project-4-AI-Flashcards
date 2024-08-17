import { database } from "@/app/firebase";
import { collection, doc, setDoc } from "firebase/firestore";

export default async function writeUserSessionToFirestore(userId, session) {
  const sessionsDocRef = doc(collection(database, "sessionsToUsers"), "map");

  await setDoc(
    sessionsDocRef,
    {
      [session]: userId,
    },
    { merge: true }
  );
}

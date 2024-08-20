import { database } from "@/app/firebase";
import { collection, doc, setDoc, getDoc } from "firebase/firestore";

export async function writeUserSessionToFirestore(userId, session) {
  const sessionsDocRef = doc(collection(database, "sessionsToUsers"), session);

  await setDoc(
    sessionsDocRef,
    {
      id: userId,
    },
    { merge: true }
  );
}

export async function createUser(userId) {
  const userDocRef = doc(collection(database, "users"), userId);
  const userDocSnap = await getDoc(userDocRef);

  if (!userDocSnap.exists()) {
    await setDoc(userDocRef, { flashcardSets: [], tier: "free" });
  }
}

export async function getSubscriptionId(userId) {
  const userDocRef = doc(collection(database, "users"), userId);
  const userDocSnap = await getDoc(userDocRef);

  if (userDocSnap.exists()) {
    const subscriptionId = userDocSnap.data().subscriptionId;
    return subscriptionId;
  }
}

export async function getTier(userId) {
  const userDocRef = doc(collection(database, "users"), userId);
  const userDocSnap = await getDoc(userDocRef);

  if (userDocSnap.exists()) {
    const tier = userDocSnap.data().tier;
    return tier;
  }
}

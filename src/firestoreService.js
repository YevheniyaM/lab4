import {
  getFirestore,
  collection,
  getDocs,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import app from "./firebaseConfig";
import { articlesData } from "./data";

const db = getFirestore(app);

// Функція для отримання даних з колекції
export const getArticles = async () => {
  const articlesCollection = collection(db, "articles");
  const articlesSnapshot = await getDocs(articlesCollection);
  const articlesList = articlesSnapshot.docs.map((doc) => doc.data());
  return articlesList;
};

// Функція для отримання статті за id
export const getArticleById = async (id) => {
  const articleRef = doc(db, "articles", id);
  const articleSnap = await getDoc(articleRef);
  if (articleSnap.exists()) {
    return articleSnap.data();
  } else {
    throw new Error("No such document!");
  }
};

// Функція для завантаження статей у Firestore
export const uploadArticles = async () => {
  const articlesCollection = collection(db, "articles");
  for (const article of articlesData) {
    const articleRef = doc(articlesCollection, article.id.toString());
    await setDoc(articleRef, article);
  }
  console.log("Articles uploaded successfully!");
};

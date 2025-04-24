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

// Функція для збереження коментаря у Firestore
export const saveComment = async (articleId, comment, userEmail, userId) => {
  const commentsCollection = collection(db, "comments");
  const commentRef = doc(commentsCollection, `${articleId}_${Date.now()}`);
  await setDoc(commentRef, {
    articleId,
    comment,
    userEmail,
    userId,
    timestamp: Date.now(),
  });
};

// Функція для отримання коментарів з Firestore
export const getCommentsByArticleId = async (articleId) => {
  const commentsCollection = collection(db, "comments");
  const commentsSnapshot = await getDocs(commentsCollection);
  const commentsList = commentsSnapshot.docs
    .map((doc) => doc.data())
    .filter((comment) => comment.articleId === articleId);
  return commentsList;
};

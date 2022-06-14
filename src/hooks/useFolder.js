import { useReducer, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import {
  getDocs,
  where,
  collection,
  query,
  orderBy,
  db,
  doc,
  getDoc,
} from "../firebase";

const ACTIONS = {
  SELECT_FOLDER: "select-folder",
  UPDATE_FOLDER: "update-folder",
  SET_FOLDERS: "set-child-folders",
  SET_FILES: "set-child-files",
};

export const ROOT_FOLDER = { name: "Root", id: null, path: [] };

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.SELECT_FOLDER:
      return {
        folderId: payload.folderId,
        folder: payload.folder,
        files: [],
        folders: [],
      };
    case ACTIONS.UPDATE_FOLDER:
      return {
        ...state,
        folder: payload.folder,
      };
    case ACTIONS.SET_FOLDERS:
      return {
        ...state,
        folders: payload.folders,
      };
    case ACTIONS.SET_FILES:
      return {
        ...state,
        files: payload.files,
      };
    default:
      return state;
  }
}

export function useFolder(folderId = null, folder = null) {
  const [state, dispatch] = useReducer(reducer, {
    folderId,
    folder,
    folders: [],
    files: [],
  });
  const { currentUser } = useAuth();

  useEffect(() => {
    dispatch({ type: ACTIONS.SELECT_FOLDER, payload: { folderId, folder } });
  }, [folderId, folder]);

  useEffect(() => {
    if (folderId == null) {
      return dispatch({
        type: ACTIONS.UPDATE_FOLDER,
        payload: { folder: ROOT_FOLDER },
      });
    }
    const updateFolder = async () => {
      const docRef = doc(db, "folders", folderId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        
        dispatch({
          type: ACTIONS.UPDATE_FOLDER,
          payload: { folder:docSnap.data() },
        });
      } else {
        dispatch({
          type: ACTIONS.UPDATE_FOLDER,
          payload: { folder: ROOT_FOLDER },
        });
      }
    };

    updateFolder();
  }, [folderId]);

  useEffect(() => {
    const getChildFolder = async () => {
      const q = query(
        collection(db, "folders"),
        where("parentId", "==", folderId),
        where("userId", "==", currentUser.uid),
        orderBy("createdAt")
      );

      const querySnapshot = await getDocs(q);
      const folders = [];
      querySnapshot.forEach((doc) => {
        folders.push(doc.data());
      });
      dispatch({
        type: ACTIONS.SET_FOLDERS,
        payload: {
          folders,
        },
      });
    };
    getChildFolder();
  }, [folderId, currentUser]);

  useEffect(() => {
    const getChildFolder = async () => {
      const q = query(
        collection(db, "files"),
        where("folderId", "==", folderId),
        where("userId", "==", currentUser.uid),
        // orderBy("createdAt")
      );

      const querySnapshot = await getDocs(q);
      const files = [];
      querySnapshot.forEach((doc) => {
        files.push(doc.data());
      });
      dispatch({
        type: ACTIONS.SET_FILES,
        payload: {
          files,
        },
      });
    };
    getChildFolder();
  }, [folderId, currentUser]);

  return state;
}

import React from "react";
import Navbar from "../components/Navbar";
import AddFolder from "../components/AddFolder";
import AddFile from "../components/AddFile";
import {useFolder} from "../hooks/useFolder";
import Folder from "../components/Folder";
import File from "../components/File";
import BreadCrumbs from "../components/BreadCrumbs";
import {useLocation,useParams}from 'react-router-dom'
function Dashboard() {
  const { folderId } = useParams()
  const { state } = useLocation()
  
  const { folder, folders, files } = useFolder(folderId,state?state.folder:null)

 
    
  
  return (
    <>
      <Navbar />

      <BreadCrumbs currentFolder={folder} />
      <AddFile currentFolder={folder} />
      <AddFolder currentFolder={folder} />

      {folders.length > 0 && (
        <div className="d-flex flex-wrap">
          {folders.map((folder) => {
            return (
              <div key={folder.id} style={{ maxWidth: 250 }} className="m-1">
                <Folder folder={folder} />
              </div>
            );
          })}
        </div>
      )}
      {folders.length > 0 && files.length > 0 && <hr />}
      
      {files.length > 0 && (
        <div className="d-flex flex-wrap">
          {files.map((file) => {
            return (
              <div key={file.name} style={{ maxWidth: 250 }} className="m-1">
                <File file={file} />
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

export default Dashboard;

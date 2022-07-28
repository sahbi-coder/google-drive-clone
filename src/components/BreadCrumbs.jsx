import React from "react";
import { Breadcrumb, BreadcrumbItem } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ROOT_FOLDER } from "../hooks/useFolder";

export default function BreadCrumbs({ currentFolder }) {
  let path = currentFolder === ROOT_FOLDER ? [] : [ROOT_FOLDER];
  if (currentFolder) path = [...path, ...currentFolder.path];

  return (
    <Breadcrumb
      className="flex-grow-1"
      listProps={{ className: "bg-white pl-0 m-1" }}
    >
      <BreadcrumbItem
        linkAs={Link}
        linkProps={{
          to: {
            pathname: `/dashboard`,
          },
        }}
        className="text-truncate d-inline-block"
        style={{ maxWidth: "150px" }}
      >
        root
      </BreadcrumbItem>
      {path.map((folder, index) => (
        <Breadcrumb.Item
          key={folder.id}
          linkAs={Link}
          linkProps={{
            to: {
              pathname: folder.id ? `/dashboard/folders/${folder.id}` : "/",
              state: { folder: { ...folder, path: path.slice(1, index) } },
            },
          }}
          className="text-truncate d-inline-block"
          style={{ maxWidth: "150px" }}
        >
          {folder.id}
        </Breadcrumb.Item>
      ))}
      {currentFolder && (
        <Breadcrumb.Item
          className="text-truncate d-inline-block"
          style={{ maxWidth: "200px" }}
          active
        >
          {currentFolder.id||'root'}
        </Breadcrumb.Item>
      )}
    </Breadcrumb>
  );
}

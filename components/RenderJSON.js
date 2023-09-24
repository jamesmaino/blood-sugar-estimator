"use client";

import React, { useState } from "react";

function TreeView(props) {
  const { data, isRoot = true } = props;
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  if (typeof data !== "object" || data === null) {
    return <span>{JSON.stringify(data)}</span>;
  }

  return (
    <div className={`relative ${isRoot ? "" : "ml-4"}`}>
      <div
        onClick={toggleCollapse}
        className={`cursor-pointer absolute top-2.5 left-2 w-2 h-full border-t-2 border-b-2 border-transparent border-l-2 border-gray-400 transform ${
          isCollapsed ? "rotate-90 w-10" : ""
        }`}
      ></div>
      {!isCollapsed && (
        <div className="ml-6 mt-2">
          {Object.keys(data).map((key) => (
            <div key={key} className="mt-2">
              <strong>{key}:</strong>
              <TreeView data={data[key]} isRoot={false} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const RenderJSON = (props) => {
  const { children, showTree = true } = props;
  if (showTree) return <TreeView showTree={true} data={children} />;

  return <pre>{JSON.stringify(children, null, 2)}</pre>;
};

export default RenderJSON;

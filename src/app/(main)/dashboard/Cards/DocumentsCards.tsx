import React from "react";
import Card from "./Card";

const DocumentsCards = ({ items }) => {
  return items?.length > 0 ? (
    <div className="grid grid-cols-3 gap-4">
      {items?.map((item) => {
        return <Card item={item} />;
      })}
    </div>
  ) : (
    <div className="text-center w-full">No Files Exists</div>
  );
};

export default DocumentsCards;

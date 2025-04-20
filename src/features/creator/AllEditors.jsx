import React, { useEffect } from "react";
import { ExpandableCardDemo } from "./EditorCard";

import useEditorStore from "../../store/useEditorsStore";

const AllEditors = () => {
  const { editors, fetchEditors, loading, error } = useEditorStore();

  useEffect(() => {
    fetchEditors();
  }, [fetchEditors]);

  return (
    <div>
      <h1 className="text-3xl mt-15 font-extrabold text-center text-gray-800 dark:text-white mb-10">
        All Editors
      </h1>
      <ExpandableCardDemo cards={editors} />
    </div>
  );
};

export default AllEditors;

import React, { useState, useEffect } from "react";
import * as Diff from "diff";

const TextDiffApp = () => {
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [diffResult, setDiffResult] = useState([]);

  useEffect(() => {
    const handleResize = () => {
      const textareas = document.querySelectorAll("textarea");
      textareas.forEach((textarea) => {
        textarea.style.height = `${window.innerHeight - 200}px`;
      });
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleCompare = () => {
    console.log("Comparing texts:");
    console.log("text1:", text1);
    console.log("text2:", text2);

    if (!text1.trim() && !text2.trim()) {
      console.log("Both texts are empty, clearing diff result");
      setDiffResult([]);
      return;
    }

    const diff = Diff.diffWords(text1, text2);
    console.log("Diff result:", diff);
    setDiffResult(diff);
  };

  const handleClear = () => {
    setText1("");
    setText2("");
    setDiffResult([]);
  };

  const renderDiff = () => {
    return diffResult.map((part, index) => (
      <span
        key={index}
        style={{
          backgroundColor: part.added
            ? "rgba(0, 255, 0, 0.3)"
            : part.removed
            ? "rgba(255, 0, 0, 0.3)"
            : "transparent",
          textDecoration: part.removed ? "line-through" : "none",
        }}
      >
        {part.value}
      </span>
    ));
  };

  return (
    <div className="flex flex-col h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Text Diff Comparator</h1>
      <div className="flex flex-1 space-x-4 mb-4">
        <div className="flex-1">
          <label htmlFor="text1" className="block mb-2">
            Original Text:
          </label>
          <textarea
            id="text1"
            value={text1}
            onChange={(e) => setText1(e.target.value)}
            className="w-full p-2 border rounded resize-none"
            placeholder="Paste original text here"
          />
        </div>
        <div className="flex-1">
          <label htmlFor="text2" className="block mb-2">
            Modified Text:
          </label>
          {diffResult.length === 0 ? (
            <textarea
              id="text2"
              value={text2}
              onChange={(e) => setText2(e.target.value)}
              className="w-full p-2 border rounded resize-none"
              placeholder="Paste modified text here"
            />
          ) : (
            <div className="w-full h-full p-2 border rounded overflow-auto whitespace-pre-wrap">
              {renderDiff()}
            </div>
          )}
        </div>
      </div>
      <div className="flex space-x-4 mb-4">
        <button
          onClick={handleCompare}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Compare
        </button>
        <button
          onClick={handleClear}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default TextDiffApp;

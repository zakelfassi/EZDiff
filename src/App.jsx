import React, { useState, useEffect, useCallback } from "react";
import * as Diff from "diff";

const DiffModes = {
  WORDS: "words",
  CHARS: "chars",
  LINES: "lines",
};

const TextDiffApp = () => {
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [diffResult, setDiffResult] = useState([]);
  const [diffMode, setDiffMode] = useState(DiffModes.CHARS);
  const [isRealTime, setIsRealTime] = useState(false);

  const computeDiff = useCallback(() => {
    if (!text1.trim() && !text2.trim()) {
      setDiffResult([]);
      return;
    }

    let diff;
    switch (diffMode) {
      case DiffModes.CHARS:
        diff = Diff.diffChars(text1, text2);
        break;
      case DiffModes.LINES:
        diff = Diff.diffLines(text1, text2);
        break;
      case DiffModes.WORDS:
      default:
        diff = Diff.diffWords(text1, text2);
    }
    setDiffResult(diff);
  }, [text1, text2, diffMode]);

  useEffect(() => {
    if (isRealTime) {
      computeDiff();
    }
  }, [text1, text2, diffMode, isRealTime, computeDiff]);

  const handleClear = () => {
    setText1("");
    setText2("");
    setDiffResult([]);
  };

  const renderDiff = () => {
    return diffResult.map((part, index) => (
      <span
        key={index}
        className={`diff-part ${part.added ? "added" : ""} ${
          part.removed ? "removed" : ""
        }`}
      >
        {part.value}
      </span>
    ));
  };

  return (
    <div className="flex flex-col h-screen p-4 bg-gray-100">
      <h1 className="text-3xl font-bold mb-4 text-blue-600">EzDiff</h1>
      <div className="flex space-x-4 mb-4">
        <select
          value={diffMode}
          onChange={(e) => setDiffMode(e.target.value)}
          className="px-2 py-1 border rounded"
        >
          <option value={DiffModes.WORDS}>Words</option>
          <option value={DiffModes.CHARS}>Characters</option>
          <option value={DiffModes.LINES}>Lines</option>
        </select>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={isRealTime}
            onChange={(e) => setIsRealTime(e.target.checked)}
            className="mr-2"
          />
          Real-time diff
        </label>
      </div>
      <div className="flex flex-1 space-x-4 mb-4">
        <div className="flex-1">
          <label htmlFor="text1" className="block mb-2 font-semibold">
            Original Text:
          </label>
          <textarea
            id="text1"
            value={text1}
            onChange={(e) => setText1(e.target.value)}
            className="w-full h-full p-2 border rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Paste original text here"
          />
        </div>
        <div className="flex-1">
          <label htmlFor="text2" className="block mb-2 font-semibold">
            Modified Text:
          </label>
          <textarea
            id="text2"
            value={text2}
            onChange={(e) => setText2(e.target.value)}
            className="w-full h-full p-2 border rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Paste modified text here"
          />
        </div>
      </div>
      <div className="flex-1 p-4 bg-white border rounded overflow-auto whitespace-pre-wrap">
        {renderDiff()}
      </div>
      <div className="flex space-x-4 mt-4">
        <button
          onClick={computeDiff}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Compare
        </button>
        <button
          onClick={handleClear}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default TextDiffApp;

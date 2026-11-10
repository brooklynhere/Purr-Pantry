import fs from "fs";
import yamlFront from "yaml-front-matter";
import readLastLine from "read-last-lines";

export async function Parser(filePath) {
  let rawData = "";
  let jsonData = {};

  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      console.error(err);
      throw new Error("Error reading the file");
    }
    rawData = data;
  });

  let lastLine = await readLastLine.read(filePath, 1).then((line) => line);
  let appendLine = false;

  if (lastLine !== "---") {
    appendLine = true;
  } else {
    appendLine = false;
  }

  rawData = rawData + (appendLine ? "\n---" : "");
  jsonData = yamlFront.loadFront(rawData);
  return jsonData;
}

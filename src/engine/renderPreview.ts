import fs from "fs-extra";
import path from "path";
import { processTemplate } from "./templateProcessor";

export function renderTemplatePreview(templatePath: string, variables: any) {
  console.log("\n📦 Project Preview\n");

  renderFolder(templatePath, variables, 0);

  console.log("\nIncluded:");
  for (const key of Object.keys(variables)) {
    if (typeof variables[key] === "boolean") {
      console.log(`${variables[key] ? "✔" : "✘"} ${key}`);
    }
  }

  console.log("");
}

function renderFolder(folderPath: string, variables: any, depth: number) {
  const items = fs.readdirSync(folderPath);

  for (const item of items) {
    const srcPath = path.join(folderPath, item);

    // Apply variable replacement to names
    const processedName = processTemplate(item, variables);

    // Skip if name was removed by conditionals
    if (!processedName.trim()) continue;

    const indent = "  ".repeat(depth);
    const stats = fs.statSync(srcPath);

    if (stats.isDirectory()) {
      console.log(`${indent}${processedName}/`);
      renderFolder(srcPath, variables, depth + 1);
    } else {
      console.log(`${indent}${processedName}`);
    }
  }
}

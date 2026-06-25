
import fs from "fs-extra";
import path from "path";
import { error, info } from "../utils/errors";
import { getTemplatePath } from "./loadTemplate";
import { processTemplate } from "../engine/templateProcessor";
import { log } from "../utils/logger";

export async function generateTemplate(templateKey: string, projectName: string, variables: any = {}) {
  const templatePath = getTemplatePath(templateKey);
  const projectPath = path.join(process.cwd(), projectName);

  if (fs.existsSync(projectPath)) {
    error(`Project folder '${projectName}' already exists.`);
    return;
  }

  // Create root folder
  fs.mkdirSync(projectPath);
  log.header("Summary");
  log.success(`Template: ${templateKey}`);
  log.success(`Project: ${projectName}`);
  log.success(`Files generated successfully.`);
  log.divider();

  // Recursively process template folder
  copyAndProcess(templatePath, projectPath, variables);

  info(`Template '${templateKey}' generated as '${projectName}'`);
  console.log(`📁 Location: ${projectPath}\n`);
}

function copyAndProcess(srcDir: string, destDir: string, variables: any) {
  const items = fs.readdirSync(srcDir);

  for (const item of items) {
    const srcPath = path.join(srcDir, item);

    // Process dynamic names
    const processedName = processTemplate(item, variables);
    const destPath = path.join(destDir, processedName);

    const stats = fs.statSync(srcPath);

    if (stats.isDirectory()) {
      // Create folder
      fs.mkdirSync(destPath);

      // Recurse
      copyAndProcess(srcPath, destPath, variables);
    } else {
      // Process file content
      let content = fs.readFileSync(srcPath, "utf8");
      content = processTemplate(content, variables);

      fs.writeFileSync(destPath, content);
    }
  }
}

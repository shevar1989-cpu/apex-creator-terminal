import inquirer from "inquirer";
import { runNewProjectWizard } from "./commands/newProjectWizard";
import { runTemplateWizard } from "./commands/newTemplateWizard";

console.log("Apex Creator Terminal v0.1");
console.log("----------------------------------");

async function mainLoop() {
  while (true) {
    const { command } = await inquirer.prompt([
      {
        type: "input",
        name: "command",
        message: "✔ Apex >"
      }
    ]);

    const cmd = command.trim();

    // Exit command
    if (cmd === "exit" || cmd === "quit") {
      console.log("Goodbye.");
      process.exit(0);
    }

    // Wizard: new project (interactive)
    if (cmd === "new project") {
      await runNewProjectWizard();
      continue;
    }

    // Direct project creation: new project <name>
    if (cmd.startsWith("new project ")) {
      const projectName = cmd.replace("new project ", "").trim();

      if (!projectName) {
        console.log("Usage: new project <name>");
        continue;
      }

      process.env.APEX_PROJECT_NAME = projectName;
      await runNewProjectWizard();
      continue;
    }

    // Template wizard with optional tag
    if (cmd.startsWith("new template")) {
      const parts = cmd.split(" ");
      const tagIndex = parts.indexOf("--tag");

      let tag: string | null = null;
      if (tagIndex !== -1 && parts[tagIndex + 1]) {
        tag = parts[tagIndex + 1];
      }

      await runTemplateWizard(tag);
      continue;
    }

    // Unknown command
    console.log(`Unknown command: ${cmd}`);
  }
}

mainLoop();

import inquirer from "inquirer";
import fs from "fs-extra";
import path from "path";

export async function runNewProjectWizard() {
  console.log("\n✨ Apex Project Wizard\n");

  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "Project name:",
      validate: (v) => v.length > 0 || "Name cannot be empty"
    },
    {
      type: "input",
      name: "description",
      message: "Description:"
    },
    {
      type: "list",
      name: "type",
      message: "Project type:",
      choices: ["app", "module", "simulation", "engine-component"]
    },
    {
      type: "input",
      name: "version",
      message: "Version:",
      default: "1.0.0"
    },
    {
      type: "input",
      name: "author",
      message: "Author:"
    },
    {
      type: "confirm",
      name: "includeSampleASL",
      message: "Include sample ASL file?",
      default: true
    },
    {
      type: "confirm",
      name: "includeSampleForge",
      message: "Include sample Forge pipeline?",
      default: true
    }
  ]);

  const projectPath = path.join(process.cwd(), answers.name);

  if (fs.existsSync(projectPath)) {
    console.log(`❌ Project folder "${answers.name}" already exists.`);
    return;
  }

  fs.mkdirSync(projectPath);

  // apex.json
  fs.writeFileSync(
    path.join(projectPath, "apex.json"),
    JSON.stringify(
      {
        name: answers.name,
        description: answers.description,
        version: answers.version,
        type: answers.type,
        author: answers.author
      },
      null,
      2
    )
  );

  if (answers.includeSampleASL) {
    fs.writeFileSync(
      path.join(projectPath, "main.asl"),
      `// ASL Entrypoint\nprint "Welcome to ${answers.name}";`
    );
  }

  if (answers.includeSampleForge) {
    fs.writeFileSync(
      path.join(projectPath, "pipeline.forge"),
      `# Forge Pipeline\nstep build {}\nstep run {}\n`
    );
  }

  console.log(`\n✨ Project "${answers.name}" created successfully!`);
  console.log(`📁 Location: ${projectPath}\n`);
  console.log("\n✨ Apex Project Wizard\n");

}

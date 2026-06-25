import fs from "fs-extra";
import path from "path";

export async function createNewProject(projectName: string) {
  const projectPath = path.join(process.cwd(), projectName);

  // 1. Check if folder exists
  if (fs.existsSync(projectPath)) {
    console.error(`Project folder "${projectName}" already exists.`);
    return;
  }

  // 2. Create folder
  fs.mkdirSync(projectPath);

  // 3. Create files
  fs.writeFileSync(
    path.join(projectPath, "apex.json"),
    JSON.stringify(
      {
        name: projectName,
        version: "1.0.0",
        type: "apex-project",
      },
      null,
      2
    )
  );

  fs.writeFileSync(
    path.join(projectPath, "main.asl"),
    `// Apex Script Language (ASL) entrypoint\n\nprint "Hello from ${projectName}";`
  );

  fs.writeFileSync(
    path.join(projectPath, "pipeline.forge"),
    `# Apex Forge Pipeline\n\nstep build {}\nstep run {}\n`
  );

  fs.writeFileSync(
    path.join(projectPath, "genesis.config.json"),
    JSON.stringify(
      {
        engine: "Apex Genesis Engine",
        version: "0.1",
      },
      null,
      2
    )
  );

  console.info(`Project "${projectName}" created successfully!`);
  console.log(`📁 Location: ${projectPath}\n`);
}

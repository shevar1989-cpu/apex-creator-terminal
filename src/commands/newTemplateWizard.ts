import inquirer from "inquirer";
import path from "path";

import { 
  loadTemplateRegistry, 
  loadTemplateMeta, 
  getTemplatePath 
} from "./loadTemplate";

import { generateTemplate } from "./generateTemplate";
import { renderTemplatePreview } from "../engine/renderPreview";
import { error, warn, info } from "../utils/errors";
import fs from "fs-extra";

export async function runTemplateWizard(tag?: string | null) {
  const registry = loadTemplateRegistry();
  let keys = Object.keys(registry);

  // Step 0 — Tag filtering
  if (tag) {
    const filtered = keys.filter(k => 
      registry[k].tags && registry[k].tags.includes(tag)
    );

    if (filtered.length === 0) {
      error(`No templates found with tag "${tag}".`);
      return;
    }

    if (filtered.length === 1) {
      info(`Found template "${filtered[0]}" via tag "${tag}".`);
      return await runTemplateWizardSelect(filtered[0]!);
    }

    keys = filtered;
    info(`\n✔ Showing templates with tag "${tag}":\n`);
  }

  // Step 1 — Choose template
  const { template } = await inquirer.prompt([
    {
      type: "select",
      name: "template",
      message: "Choose a template:",
      choices: keys.map(k => ({
        name: `${registry[k].name} — ${registry[k].description}`,
        value: k
      }))
    }
  ]);

  return await runTemplateWizardSelect(template);
}

// Extracted logic for reuse when tag auto-selects a template
async function runTemplateWizardSelect(template: string) {
  const meta = loadTemplateMeta(template);

  // Step 2 — Base project info
  const base = await inquirer.prompt([
    {
      type: "input",
      name: "projectName",
      message: "Project name:",
      validate: v => v.length > 0 || "Name cannot be empty"
    }
  ]);

  // Step 3 — Metadata-driven options
  const optionEntries = Object.entries(meta.options || {}) as [string, string][];

  let extras: any = {};
  if (optionEntries.length > 0) {
    extras = await inquirer.prompt(
      optionEntries.map(([key, label]) => ({
        type: "confirm",
        name: key,
        message: label,
        default: meta.defaults?.[key] ?? false
      }))
    );
  }

  // Step 4 — Merge variables
  const variables = {
    name: base.projectName,
    description: meta.description,
    type: meta.name,
    ...(meta.defaults || {}),
    ...extras
  };

  // Step 5 — Preview
  const templatePath = getTemplatePath(template);
  renderTemplatePreview(templatePath, variables);

  // Step 6 — Confirm
  const { confirm } = await inquirer.prompt([
    {
      type: "confirm",
      name: "confirm",
      message: "Generate this project?",
      default: true
    }
  ]);

  if (!confirm) {
    console.log("\n❌ Cancelled.\n");
    return;
  }

  // Step 7 — Generate project
  await generateTemplate(template, base.projectName, variables);
}

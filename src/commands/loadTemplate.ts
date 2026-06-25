import fs from "fs-extra";
import path from "path";
import { error, warn } from "../utils/errors";

const templatesRoot = path.join(__dirname, "..", "templates");

export function getTemplatePath(key: string) {
  return path.join(templatesRoot, key);
}

export function loadTemplateMeta(key: string) {
  const metaPath = path.join(getTemplatePath(key), "template.meta.json");

  if (!fs.existsSync(metaPath)) {
    error(`Missing metadata file for template "${key}". Expected: ${metaPath}`);
    return null;
  }

  try {
    const raw = fs.readFileSync(metaPath, "utf8");
    return JSON.parse(raw);
  } catch (e) {
    error(`Invalid JSON in metadata for template "${key}".`);
    return null;
  }
}

export function loadTemplateRegistry() {
  const keys = fs.readdirSync(templatesRoot).filter(k =>
    fs.statSync(path.join(templatesRoot, k)).isDirectory()
  );

  const registry: Record<string, any> = {};

  for (const key of keys) {
    const meta = loadTemplateMeta(key);

    if (!meta) {
      warn(`Skipping template "${key}" due to metadata errors.`);
      continue;
    }

    registry[key] = {
      name: meta.name,
      description: meta.description,
      tags: meta.tags || [],
      defaults: meta.defaults || {},
      options: meta.options || {}
    };
  }

  return registry;
}

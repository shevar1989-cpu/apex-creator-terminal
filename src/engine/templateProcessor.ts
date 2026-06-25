import fs from "fs-extra";

export function processTemplate(content: string, variables: any): string {
  let output = content;

  // 1. Replace simple variables {{var}}
  output = output.replace(/{{\s*([\w.]+)\s*}}/g, (_, key) => {
    const value = key.split(".").reduce((o: any, k: string) => (o ? o[k] : ""), variables);
    return value !== undefined ? value : "";
  });

  // 2. Conditional blocks {{#if var}} ... {{/if}}
  output = output.replace(/{{#if\s+([\w.]+)}}([\s\S]*?){{\/if}}/g, (_, key, block) => {
    const value = key.split(".").reduce((o: any, k: string) => (o ? o[k] : ""), variables);
    return value ? block : "";
  });

  return output;
}

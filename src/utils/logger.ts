import chalk from "chalk";

export const log = {
  info: (msg: string) => {
    console.log(chalk.blue(`ℹ ${msg}`));
  },

  success: (msg: string) => {
    console.log(chalk.green(`✔ ${msg}`));
  },

  warn: (msg: string) => {
    console.log(chalk.yellow(`⚠ ${msg}`));
  },

  error: (msg: string) => {
    console.log(chalk.red(`❌ ${msg}`));
  },

  file: (msg: string) => {
    console.log(chalk.gray(`  • ${msg}`));
  },

  header: (msg: string) => {
    console.log(chalk.magenta(`\n=== ${msg} ===\n`));
  },

  divider: () => {
    console.log(chalk.gray("----------------------------------"));
  }
};

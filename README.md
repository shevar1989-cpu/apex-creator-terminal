![Version](https://img.shields.io/badge/version-0.1.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Status](https://img.shields.io/badge/status-MVP-orange)

# apex-creator-terminal
Apex Creator Terminal
Command‑Line Gateway to the Apex Genesis Engine
The Apex Creator Terminal (ACT) is the official command‑line interface for the Apex Genesis Engine ecosystem — the unified system powering Apex Meta‑Systems, Apex Design Labs, and Apex Reality Systems.

ACT gives creators, developers, and simulation architects a fast, structured, and intelligent way to generate new projects, templates, and simulation modules with zero friction.

It is the first tool in the Apex Genesis Engine pipeline.

✨ Features
✔ Global CLI Command
Install once, run anywhere:

Code
apex
✔ Template System
Generate projects from modular, metadata‑driven templates.

✔ Metadata Engine
Each template includes a template.meta.json file defining:

Name

Description

Tags

Options

Defaults

✔ Tag‑Based Template Filtering
Quickly find templates by category:

Code
apex new template --tag simulation
✔ Interactive Wizard
ACT walks you through:

Project naming

Option selection

Template preview

Confirmation

Generation

✔ Preview Engine
Before generating, ACT shows a clean summary of:

Template name

Description

Selected options

Output structure

✔ Logging Layer
Apex‑style output:

Success logs

Warnings

Errors

File‑by‑file creation logs

Summary blocks

✔ Error Handling Layer
No crashes.
No stack traces.
Clean, predictable behavior.

📦 Installation
Once published to npm:

Code
npm install -g apex-creator-terminal
Or for local development:

Code
npm run build
npm link
Then run:

Code
apex
🚀 Usage
Start the CLI
Code
apex
Create a new project
Code
apex new project
Create from a template
Code
apex new template
Filter by tag
Code
apex new template --tag simulation
Example Output
Code
Apex Creator Terminal v0.1
----------------------------------
✔ Selected Template: Simulation Module
✔ Project Name: my-sim
  • src/main.asl
  • src/sim_loop.asl
  • README.md
----------------------------------
✔ Project "my-sim" created successfully.
📁 Project Structure
Code
apex-creator-terminal/
│
├── bin/                # CLI entry point
├── src/                # TypeScript source
├── dist/               # Compiled output
├── templates/          # Template library
├── package.json
├── tsconfig.json
└── README.md
🧠 Philosophy
The Apex Creator Terminal is built on three principles:

1. Precision
Every command produces predictable, structured output.

2. Modularity
Templates, metadata, and options are fully decoupled.

3. Speed
Generate new projects in seconds, not hours.

🗺️ Roadmap
v0.2.0
GUI Creator Terminal

Template marketplace

Live preview

v0.3.0
Genesis Viewport integration

Simulation scaffolding

Asset pipeline

v1.0.0
Full ASL + Apex Forge integration

Genesis Engine project generator

Apex Reality Systems VR Lab templates

📜 License
MIT License — free to use, modify, and distribute.

🏢 Apex Meta‑Systems
ACT is the first official tool in the Apex Genesis Engine ecosystem, powering:

Apex Design Labs — creative systems

Apex Reality Systems — VR/AR simulations

Apex Meta‑Systems — unified architecture

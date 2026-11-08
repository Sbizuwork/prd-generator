# PRD Generator with a Built-In Critic

Turn a one-line feature idea into a structured PRD, then let a second AI pass attack it before you ever show it to a stakeholder.

Most AI writing tools stop at the first draft. First drafts are where vague problems, unmeasurable metrics, and missing edge cases hide. This tool adds the step that actually improves the document: a dedicated critique pass that reviews the draft like a skeptical senior stakeholder, followed by a revision pass that has to answer every criticism.

## How it works

1. **Draft** — You enter a one-line feature idea and an optional target user. The app generates a PRD using a fixed template: Problem Statement, Goals, Non-Goals, User Stories, Acceptance Criteria, Success Metrics, Risks and Open Questions.
2. **Critique** — A second model call reviews the draft against a stakeholder rubric: Is the problem real and specific? Are the metrics measurable? What is missing, assumed, or hand-waved?
3. **Revise** — A third call rewrites the PRD, addressing each critique point. The results screen shows Draft and Revised side by side, with the Critique in between, so the improvement is visible rather than claimed. The revised PRD downloads as Markdown.

The drafter and the critic can be different model families (for example, GPT drafts and Claude critiques) because all calls route through OpenRouter. One model grading its own homework is a weaker check than a second model with no attachment to the draft.

## Demo mode

No API key? The app runs in demo mode with realistic sample outputs so the full flow can be clicked through. Add an `OPENROUTER_API_KEY` to switch to live generation. See `.env.example`.

## Docs

- [PRD template](docs/prd-template.md) — the fixed structure every PRD follows, and why each section exists
- [Prompts](docs/prompts.md) — the Draft, Critique, and Revise prompts
- [Evaluation notes](docs/eval-notes.md) — the rubric used to score drafts vs. revisions, and what the critique pass actually catches
- [Examples](examples/) — full sample runs: idea in, draft, critique, final PRD

## Built with

- Replit (app built and hosted from a single workspace)
- OpenRouter (one API for the drafter and critic models)
- Product School AI tools program (tool access)

## Roadmap

- Model picker in the UI so visitors can choose the drafter/critic pairing
- Scored eval set of 20 ideas with published before/after rubric scores
- Export to Notion and Google Docs
- Saved history of past PRDs

## Author

Sena Bizuwork — product manager working on AI product workflows.
[github.com/Sbizuwork](https://github.com/Sbizuwork)

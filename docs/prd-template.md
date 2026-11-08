# The PRD Template

Every PRD this tool generates uses the same fixed structure. A fixed template is deliberate: it makes outputs comparable across ideas and across models, it forces the sections that one-line ideas usually skip (Non-Goals, Risks), and it gives the critique pass a stable checklist to review against.

## Sections

### 1. Problem Statement
Who has this problem, what exactly goes wrong today, and what it costs them (time, money, churn, frustration). Must name a specific user and a specific situation. "Users find scheduling hard" fails this section; "Team leads spend 20 minutes per meeting request trading availability emails" passes it.

### 2. Goals
What success looks like if this ships. Two to four goals, each tied back to the problem statement, not a feature list in disguise.

### 3. Non-Goals
What this version explicitly will not do. The most skipped section in real PRDs and the one that prevents the most scope arguments later. The generator is required to produce at least two.

### 4. User Stories
"As a [user], I want [capability], so that [outcome]." Three to five stories covering the main flow, not every imaginable edge case.

### 5. Acceptance Criteria
Testable conditions for each story. Written so a QA engineer could verify them without asking the PM what they meant. Vague criteria ("works well") are a named failure in the critique rubric.

### 6. Success Metrics
One primary metric with a target and a measurement window, plus at most two supporting metrics. "Increase engagement" is not a metric. "Reduce average time-to-booked-meeting from 2 days to under 4 hours within 60 days of launch" is.

### 7. Risks and Open Questions
Technical risks, adoption risks, dependencies, and the questions that must be answered before or during build. At least one honest adoption risk is required; "no risks" is treated as a drafting failure.

## Why fixed sections matter for the critique pass

The critic reviews section by section. Because the structure never changes, a weak section is easy to spot and score, and revisions can be compared apples to apples. See [eval-notes.md](eval-notes.md) for the scoring rubric.

# Evaluation Notes

The claim of this project is that the critique pass makes the final PRD measurably better than the first draft. That claim should be scored, not asserted. This doc defines the rubric; scored runs live in [examples/](../examples/).

## Rubric

Each dimension is scored 1 to 5 for the Draft and again for the Revised PRD.

| Dimension | What a 5 looks like | What a 1 looks like |
|---|---|---|
| Problem specificity | Named user, observable situation, stated cost | "Users struggle with X" |
| Metric quality | Primary metric has target + time window, team can move it | "Increase engagement" |
| Testability | QA could verify every acceptance criterion as written | Criteria are adjectives ("fast", "easy") |
| Scope honesty | Non-Goals exclude real, tempting scope | No Non-Goals, or trivial ones |
| Risk honesty | Includes adoption risk and real dependencies | "No risks identified" |

## What the critique pass catches most often

From the sample runs:

1. **Metrics without targets.** First drafts almost always write directional metrics ("reduce time spent scheduling"). The critique forces a number and a window.
2. **Problems stated as solutions.** Drafts open with the feature ("Users need a smart calendar") instead of the problem ("Team leads lose 20 minutes per request to availability emails"). The revise pass usually fixes the framing.
3. **Missing adoption risk.** Drafts list technical risks and skip the human one: why would the target user change their current behavior? The template requires one, and the critic enforces it.
4. **Acceptance criteria written as vibes.** "The system should respond quickly" becomes "Suggestions return within 2 seconds for calendars with up to 5 attendees."

## Method notes

- Scoring is done by the author on the sample runs for now; the honest limitation is that the scorer is not blind to which version is which. A blind scoring pass (shuffled drafts and revisions, scored without labels) is on the roadmap.
- The eval set is small (3 published runs). The plan is 20 fixed ideas run against every model pairing change, so prompt or model changes can be compared over time instead of judged by feel.

## Open questions

- Does a same-family critic (GPT critiquing GPT) score meaningfully worse than a cross-family critic? Early impression: cross-family catches more framing problems, same-family catches more internal inconsistencies. Needs the 20-idea set to say properly.
- How much of the revision gain comes from the critique itself vs. simply from a second writing pass? A control run (revise without critique) is the obvious next experiment.

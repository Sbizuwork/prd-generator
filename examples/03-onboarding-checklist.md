# Example Run 03 — Onboarding Checklist for a Fitness App

*Sample run in demo mode.*

## Input

- **Feature idea:** A getting-started checklist that walks new users through their first week
- **Target user:** New users of a consumer fitness app

## Draft PRD (pass 1, abridged)

### Problem Statement
Many new users stop opening the app after the first few days and never build a habit.

### Goals
- Guide new users through setup and their first workouts
- Increase day-7 retention

### Success Metrics
- More users complete onboarding
- Higher retention

### Risks and Open Questions
- Users might find a checklist annoying.

## Critique (pass 2)

1. **Problem Statement:** Which step do users actually drop at? "Stop opening the app" is the outcome, not the problem. If most users never log a first workout, the checklist should be built around that moment, not general setup.
2. **Goals vs. Metrics:** Day-7 retention is named as a goal but the metrics section never gives it a baseline or target.
3. **Missing Non-Goals:** Nothing stops this from growing into a full tutorial system. State what it is not: no video lessons, no social features, no rewards economy in v1.
4. **Risks:** "Annoying" is the right risk stated too softly. A checklist that nags will be dismissed in one tap and never seen again. What is the dismissal behavior, and can a dismissed user ever get it back?

## Revised PRD (pass 3, abridged)

### Problem Statement
Assumption to validate with funnel data before build: the largest drop is between account creation and first logged workout, where roughly half of new users never record any activity. Users who log a workout in the first 48 hours retain at several times the rate of those who do not. The checklist exists to get a new user to one logged workout fast, not to teach the whole app.

### Goals
- Get new users to their first logged workout within 48 hours
- Keep the checklist to five steps or fewer, completable in under 10 minutes total

### Non-Goals
- No video tutorials, rewards/points system, or social sharing in v1
- No personalization by fitness goal in v1; one checklist for everyone, personalization is the v2 question the data should answer

### Success Metrics
- Primary: share of new users logging a first workout within 48 hours rises from the current baseline (to be measured in week 1) by 10 percentage points within 60 days.
- Guardrail: checklist dismissal rate stays under 35 percent; day-1 uninstall rate does not increase.

### Risks and Open Questions
- Nag risk: the checklist appears once on the home screen, is dismissible in one tap, and a dismissed checklist can be reopened from Settings. It never uses push notifications in v1.
- Open question: is the first-workout drop about motivation or about the logging flow itself? If logging takes more than 3 taps, fix the flow before building the checklist.

## Scores

| Dimension | Draft | Revised |
|---|---|---|
| Problem specificity | 2 | 4 |
| Metric quality | 2 | 4 |
| Testability | 2 | 4 |
| Scope honesty | 1 | 5 |
| Risk honesty | 3 | 4 |

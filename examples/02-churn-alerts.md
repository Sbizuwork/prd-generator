# Example Run 02 — Churn-Risk Alerts for a Subscription App

*Sample run in demo mode.*

## Input

- **Feature idea:** Alert the growth team when a subscriber looks likely to cancel
- **Target user:** Growth PM at a consumer subscription app

## Draft PRD (pass 1, abridged)

### Problem Statement
Subscribers cancel without warning, and the team only learns about churn after it happens.

### Goals
- Predict which subscribers will cancel
- Give the team time to intervene

### Success Metrics
- Reduce churn
- Improve retention

### Risks and Open Questions
- The prediction model might not be accurate.

## Critique (pass 2)

1. **Problem Statement:** "Without warning" is doing all the work. Are there really no signals today, or are the signals scattered across systems nobody checks? The fix differs completely.
2. **Goals:** "Give the team time to intervene" assumes an intervention exists. What would the team actually do with an alert? If nothing is defined, the alert is trivia.
3. **Success Metrics:** No baseline, no target, no window. Also, alert quality needs its own metric: an alert that fires on everyone is useless even if churn drops for other reasons.
4. **Risks:** The only risk named is model accuracy. Missing: alert fatigue, and the risk of training users to expect save-offers, which teaches them to threaten cancellation.

## Revised PRD (pass 3, abridged)

### Problem Statement
Cancellation signals exist today (usage drops, failed payments, support contacts, plan downgrades) but live in four different tools. The growth team reviews them in a monthly report, by which time the subscriber has usually already cancelled. Assumption to validate: roughly 70 percent of cancellers show at least one signal 14 or more days before cancelling.

### Goals
- Surface at-risk subscribers while an intervention can still work (14+ days before predicted cancel)
- Ship with exactly two defined interventions at launch: a check-in message and a pause-plan offer. No alert ships without an action attached.

### Success Metrics
- Primary: save rate among alerted subscribers reaches 8 percent within 90 days (vs. an estimated 2 percent baseline from past manual outreach; validate in week 1).
- Guardrail metrics: alert precision at or above 40 percent (share of alerted subscribers who would have cancelled), and alert volume capped so no more than 5 percent of the base is flagged at once.

### Risks and Open Questions
- Alert fatigue: if precision drops below 30 percent, the team will stop trusting alerts. Mitigation: weekly precision report, automatic threshold tightening.
- Perverse incentive: repeated save-offers train subscribers to signal churn for discounts. Mitigation: one save-offer per subscriber per 12 months.
- Open question: which signal is strongest in our data? A 2-week analysis sprint precedes build.

## Scores

| Dimension | Draft | Revised |
|---|---|---|
| Problem specificity | 2 | 4 |
| Metric quality | 1 | 5 |
| Testability | 2 | 4 |
| Scope honesty | 1 | 4 |
| Risk honesty | 2 | 5 |

# Example Run 01 — Smart Meeting Scheduler

*Sample run in demo mode. Input, draft, critique, and revision shown in full.*

## Input

- **Feature idea:** A calendar that finds the best time for team meetings
- **Target user:** Project leads at growing teams

## Draft PRD (pass 1)

### Problem Statement
Scheduling meetings is time-consuming. Team members exchange many emails to find a time that works, and meetings often get delayed.

### Goals
- Make scheduling faster
- Reduce back-and-forth emails
- Help teams meet more efficiently

### Non-Goals
- Replacing the company's existing calendar system

### User Stories
- As a project lead, I want the calendar to suggest meeting times, so that I do not have to check everyone's availability manually.
- As a team member, I want to see my meetings in one place, so that I stay organized.

### Acceptance Criteria
- The system suggests suitable meeting times.
- Users can book a meeting from a suggestion.

### Success Metrics
- Increase scheduling efficiency
- Improve user satisfaction with scheduling

### Risks and Open Questions
- Integration with existing calendar providers may be complex.

## Critique (pass 2)

1. **Problem Statement:** The user is named but the problem is asserted, not observed. How much time is actually lost, per meeting request? Without a cost, there is no case for building this.
2. **Goals:** All three goals restate the same idea ("faster scheduling") in different words. None is falsifiable.
3. **Non-Goals:** One non-goal, and it is the obvious one. Real exclusions are missing: external guests, recurring meetings, rooms/equipment booking, time-zone handling.
4. **User Stories:** The second story ("see my meetings in one place") is generic calendar functionality, not this feature.
5. **Acceptance Criteria:** "Suggests suitable meeting times" is untestable. Suitable how, within what response time, for how many attendees?
6. **Success Metrics:** No targets, no time window, and "user satisfaction" has no measurement method named.
7. **Risks:** Only a technical risk. The adoption risk is unaddressed: why would a team lead trust an algorithm's suggestion over their own judgment of who can be inconvenienced?

## Revised PRD (pass 3)

### Problem Statement
Project leads at growing teams (10 to 50 people) coordinate most cross-functional meetings. Each request typically takes 3 to 5 messages over 1 to 2 days to land, because the lead manually checks 4 to 8 calendars and negotiates exceptions (focus blocks, part-time schedules, time zones). Assumption to validate: leads handle roughly 6 such requests a week, losing about 2 hours weekly to scheduling alone.

### Goals
- Cut the elapsed time from meeting request to confirmed booking
- Reduce messages per booking
- Produce suggestions leads accept without manual changes most of the time

### Non-Goals
- Scheduling with external guests outside the company directory (v2)
- Recurring meeting series management (v2)
- Room and equipment booking
- Replacing the underlying calendar provider; this reads from Google Calendar and Outlook and writes confirmed events back

### User Stories
- As a project lead, I want to enter attendees and a duration and receive ranked time suggestions, so that I can book in one action instead of comparing calendars myself.
- As a project lead, I want suggestions to respect focus blocks and working hours, so that I do not have to re-check each suggestion.
- As an attendee, I want to see why a time was suggested, so that I can trust or override it.

### Acceptance Criteria
- Given 2 to 10 attendees and a duration, the system returns at least 3 ranked suggestions within 2 seconds.
- Suggestions never overlap an existing event or a focus block on any attendee's calendar.
- A lead can confirm a suggestion in one click, and the event appears on all attendees' calendars within 30 seconds.
- Each suggestion shows a one-line reason (for example, "Only slot this week with no focus-block conflicts").

### Success Metrics
- Primary: median time from request to confirmed booking falls from about 1.5 days to under 4 working hours within 60 days of launch (assumption, to validate against baseline in week 1).
- Supporting: messages per booking drop by 50 percent; suggestion acceptance rate (booked with no manual time change) reaches 60 percent or higher.

### Risks and Open Questions
- Adoption risk: leads may not trust suggestions for senior attendees whose calendars understate their real constraints. Mitigation: show reasons, make override one click, never auto-book.
- Data risk: calendars with private or free/busy-only events produce bad suggestions. Open question: how are private events treated in ranking?
- Dependency: read/write access to Google Calendar and Outlook APIs at company scale.

## Scores (rubric from docs/eval-notes.md)

| Dimension | Draft | Revised |
|---|---|---|
| Problem specificity | 2 | 4 |
| Metric quality | 1 | 4 |
| Testability | 1 | 5 |
| Scope honesty | 2 | 5 |
| Risk honesty | 2 | 4 |

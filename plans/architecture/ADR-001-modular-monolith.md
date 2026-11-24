# ADR-001: Modular monolith architecture

- **Status:** Accepted
- **Date:** November 2026

## Context
ResearchNest needs accounts, academic data, search, community editing, moderation, an application tracker, social features and notifications. The professor asked us to consider both microservices and a monolith. Our team has two developers and one semester. Expected traffic is small (see [capacity estimate](capacity-and-load-testing.md)).

## Options
| | Monolith | Microservices |
| --- | --- | --- |
| Structure | One program, one deployment, one database | Many small programs, deployed separately, often one database each |
| Strengths | Simple to build, test, debug and deploy; data consistency is easy | Each part scales and deploys on its own; failures are isolated |
| Weaknesses | The whole app scales together; one large codebase | Network calls between services, distributed data, much more setup and testing |
| Fit for us | Good: small team, small traffic, shared data | Too costly for two people and one semester |

## Decision
We build a **modular monolith**: one Django backend divided into modules (`accounts`, `academics`, `claims`, `community`, `applications`, `social`, `notifications`, `imports`). Modules talk through clear interfaces, not through each other's internal code. Heavy background work (OpenAlex import, reminders, post expiry) runs in a **separate worker process** that uses the same code and database.

## Consequences
- Faster development, one deployment, one database with transactions.
- To scale, we run more copies of the same stateless backend behind a load balancer.
- **Path to microservices:** because modules are separated, these can be split off first if the user base grows: (1) search and matching, (2) OpenAlex import worker, (3) notifications and email.

# Plans: project documents

| Folder | Contents |
| --- | --- |
| [srs/](srs/) | Software Requirements Specification (Word) and the feature list |
| [rtm/](rtm/) | Requirements Traceability Matrix (Word), test plan, frontend requirements coverage |
| [usecase/](usecase/) | Descriptions of use cases UC001 to UC015 |
| [architecture/](architecture/) | Architecture decision (modular monolith), cloud-native checklist, capacity estimate, API endpoints, database schema |
| [img/](img/) | All diagrams: system and deployment architecture, ER, use case, sequence diagrams, Gantt chart; `ui/` holds interface screenshots |
| [pdf/](pdf/) | PDF copies of the SRS and RTM for reading in the browser |
| [project-management/](project-management/) | Team roles |

## Answers to the architecture questions from class
- **Cloud-supported architecture:** [img/deployment-architecture.png](img/deployment-architecture.png)
- **Monolith vs. microservices:** [architecture/ADR-001-modular-monolith.md](architecture/ADR-001-modular-monolith.md)
- **How many users at a time, how we know, how we handle it:** [architecture/capacity-and-load-testing.md](architecture/capacity-and-load-testing.md)
- **Is it cloud native?** [architecture/cloud-native-checklist.md](architecture/cloud-native-checklist.md)

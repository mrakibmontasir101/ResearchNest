# Test plan

The full list of 125 test cases (TC001 to TC125), one per requirement, is in the [RTM](../pdf/ResearchNest_RTM.pdf).

| Test level | Tool | What it covers |
| --- | --- | --- |
| Backend unit and API tests | Django test runner | Permissions, business rules (trusted editor, 3-report hide, 5-student threshold), privacy |
| Frontend build check | `npm run build` (TypeScript) | Type errors and build failures |
| Continuous integration | GitHub Actions | Runs the checks above on every push and Pull Request |
| Load tests | Locust | NFR-PERF-01 and NFR-PERF-02 |
| Manual tests | Checklist per use case | Usability and accessibility (NFR-USA) |

Test status is recorded in the RTM Status column: Not Verified, Passed or Failed.

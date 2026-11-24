# Capacity estimate and load testing

## 1. How many users at the same time?
We estimate peak **concurrent** users with Little's law: concurrent users = arrivals per minute × average visit length in minutes.

| Assumption (first year) | Value |
| --- | --- |
| Visitors per day | 2,000 |
| Share arriving in the busiest hour | 20% (400 users, about 6.7 per minute) |
| Average visit length | 10 minutes |
| **Peak concurrent users** | **6.7 × 10 ≈ 67** |

The SRS target for the demonstration version is **50 concurrent users** with search and profile requests under 2 seconds at the 95th percentile (NFR-PERF-01). During the class demo we expect about 20 to 40 users.

## 2. How do we know?
1. **Before launch:** the estimate above, based on our target users.
2. **Load testing:** Locust (`tests/load/`) simulates 50, 100 and 200 users and measures response times and errors.
3. **After launch:** server logs and analytics show real traffic.

## 3. How do we handle it?
- Search runs on our own database and a prepared index, never one OpenAlex call per result.
- Pagination and database indexes on frequently filtered fields.
- Caching of popular pages.
- Stateless backend: more copies can run behind a load balancer, and the platform can add copies automatically.
- CDN for frontend files.
- Background worker for imports, emails and reminders.
- Rate limiting against abuse.

## 4. Load-test results
| Simulated users | Median response | 95th percentile | Error rate | Result |
| --- | --- | --- | --- | --- |
| 50 | | | | To be run |
| 100 | | | | To be run |
| 200 | | | | To be run |

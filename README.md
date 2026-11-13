# Moore Equine — Internal Application (V1)

This repository contains the original backend implementation of an internal application developed for Moore Equine.

The application has since evolved through two major iterations:

- **V1 (this repository):** Standalone Express.js REST API.
- **V2 (`moore_next`):** Public repository containing the Next.js implementation.
- **V3:** Private monorepo currently used in production by employees daily.

## Tech Stack

- Express.js
- TypeScript
- Prisma
- PostgreSQL

## Project Goal

Provide a REST API for retrieving and transforming product metadata from the company's point-of-sale system, enabling the frontend to display visual analytics and support internal business operations.

## Architectural Evolution

The standalone API successfully supported the initial application. However, as the project's requirements evolved, several limitations became apparent:

- Maintaining consistent types across separate frontend and backend repositories introduced unnecessary development overhead.
- Many emerging business requirements were better suited to asynchronous, event-driven processing with SQS & Lambda than traditional request-response endpoints.
- Managing separate repositories increased the complexity of developing and maintaining shared business logic.

These considerations ultimately led to the adoption of next before settling into a monorepo, with shared TypeScript packages, centralized business logic, and AWS SQS, Lambda, and EventBridge for asynchronous workloads.

The current production implementation builds on the lessons learned from this initial version.

# Chronos Case Study
## Introduction
Chronos is an event-capturing framework for greenfield applications, and is built using NodeJS, Apache Kafka, TimescaleDB, and PipelineDB. It allows developers to easily capture and store user events on the client side to then perform data exploration in order to aid business logic. By using Apache Kafka, Chronos is a streaming system at its core and is thus easily expandable to the developer's needs. Further, Chronos is deployed using Docker and comes with a CLI that abstracts the difficulties in installing and running the system.

## What is Event Data?
### Event Data vs Entity Data
Very often, when we speak of "data" in an application, we generally tend to think of data that resides in a databases that is modeled after real world entities. This may be a shopping cart, a bank account, a character in an online video game, etc. In each of these cases, we are dealing with **entity data**, or data that describes the current state of some entity. This type of data is generally what comes to mind when we think of SQL and Relational Databases.

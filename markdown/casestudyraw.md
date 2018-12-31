# Case Study
## Introduction
Chronos is an event-capturing framework for greenfield applications, and is built using NodeJS, Apache Kafka, TimescaleDB, and PipelineDB. It allows developers to easily capture and store user events on the client side to then perform data exploration in order to aid business logic. By using Apache Kafka, Chronos is a streaming system at its core and is thus easily expandable to the developer's needs. Further, Chronos is deployed using Docker and comes with a CLI that abstracts the difficulties in installing and running the system.

When building Chronos we faced several difficulties. The first were the various challenges in sending event data to the API server including limited browser resources, security concerns, and payload size limitations. Second was the issue of code coupling, or making sure that Chronos could easily be expanded to fit a developers needs. Third, we had to overcome the difficulties with abstracting away any difficulties for the developer when working with Apache Kafka, including installation, configuration, and potential errors. Lastly, we had to overcome the difficulties in storing event data while still making data exploration possible for a large range of developers.

This case study will begin by describing what event data is and how it contrasts from entity data. Next, we will define what a greenfield application is and review some of the existing solutions for this area, and what some problems there are in using these systems. Lastly, we will describe how we went about building Chronos in order to solve these problems and how we overcame the challenges that presented themselves along the way.

## What is Event Data?
### Event Data vs Entity Data
Very often, when we speak of "data" in an application, we generally tend to think of data that resides in a databases that is modeled after real world entities. This may be a shopping cart, a bank account, a character in an online video game, etc. In each of these cases, we are dealing with **entity data**, or data that describes the current state of some entity. This type of data is generally what comes to mind when we think of SQL and Relational Databases.

Column Name | Value
--- | ---
id | 327
account_name | Bugman27
email | imabug@foo.bar
account_status | active
name | Franz Kafka
age | 53
_Typical example of entity data_

However, there is an emerging realization that while we genreally tend to think of applications as tracking entity data, that within an application there is always a constant stream of events that are taking place. An **event** in this case is any action that occurs in an application, such as a user clicking on a link, submitting a payment, creating a character, landing on a page, etc.

```json
{
  “eventType”: “pageview”,
  "timestamp": "2018 20:29:48 GMT-0600",
  "page URL": "www.example.com",
  "pageTitle": "Example Title",
  "user": {
    “userId”: “7689476946”,
     “userCountry”: “USA”,
     “userLanguage”: “en-us”,
     “userAgent”: “Chrome”,
     ...
}
```
_Example of a `pageview` event as a JSON object_

As such, **event data** is data that models each of these events. Unlike entity data which is core to the business logic of an application, event data is a kind of metadata, or data about data, which describes how an application is being used, and is usually not central to its business logic. In this case, if entity data is a noun which carries around state, then event data is a verb which describes an action.

Since entity data describes how an application is being used, capturing and analyzing this data provides a major competitive advantage since it can be used to positively iterate on a product and increase profits.\[1] However, if a developer wants to track event data, then unlike entity data, all the events would have to be stored since it is with the total set of events that one can analyze the data and draw conclusions. In other words, events are treated as immutable and are never updated and rarely deleted. The following table maps out the differences in this model between event and entity data thus far:\[2]

| Entity Data | Event Data |
| -------- | -------- |
| Strict schema | Felxible schema |
| Normalized | Denormalized |
| Shorter | Wider |
| Describes nouns | Describes verbs|
| Describes now | Describes trends over time |
| Updates | Appends |
|O(N) | O(N * K) |

While this is a good first attempt to model events, the key problem with ending here is that while there is definitely a legitimate distinction between event data and entity data, the two cannot be completely partitioned into unrelated categories. To understand why this is, we need to discuss the "theory of streams and tables" as concevied of by figures such as Martin Kleppmann, Jay Kreps, and Tyler Akidau.

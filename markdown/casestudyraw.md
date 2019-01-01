## API Server
Once the data reached the server, our first design was to iterate over the buffer of events and append the `metadata` object to each of them and then to write them directly to the database. What's nice about this design is that it's very straightforward and easy to understand, but we could already forsee potential problems.

### Code Coupling
Our API was now performing a few different actions: not only was it receiving data from the client side, but it was now massaging the data to the appropriate format and then writing it to the database. What this meant was that we were having to write code that tightly coupled the different pieces of our architecture together.

While this may not seem to bad at the moment, imagine a hypothetical system where data went through a web server to our application layer which was tightly coupled to our database (as was the case with Chronos at this time). Visually, it would look something like this:

![diagram 1](https://i.imgur.com/3OYAtGU.png)

If our application didn't intend to do anything beyond this, then perhaps this is an okay design choice. However, perhaps we add a Redis for caching popular queries and Hadoop HDFS for long term data storage.

![diagram 2](https://i.imgur.com/LGd9jkg.png)

Now our API server is having to write to various pieces of architecture, each of which will further couple our system. Further, we may need some workers for the various pieces to communicate to one another, which further entagles the entire system together. Even here it's not _too_ bad, but just add a bit more...

![diagram 3](https://i.imgur.com/rzAdQg2.png)

It's a mess! The pieces have become so entwined with one another that to have them communicate might involve a series of workers and other steps that, if any other part of the system fails, could also affect this communication. This problem will just continue to grow as our application does as well.

The way to decouple the pieces of architecture from one another is to use a messaging queue as a central piece which facilitates the communication of the various parts of the system. The messaging queue uses a "Pub/Sub architecture" where producers of data send messages to a topic and consumers of data would read those messages from the same topic. This also modularizes our system so that it is easy to add new producers and consumers as we need them.

![diagram 4](https://i.imgur.com/uUTKpCy.png)

By switching to a queue, we were able to simplify the API for Chronos. Instead of writing coupling code which massaged the data in a particular way, we took any received data and put it into a topic to be consumed later on as needed.
```javascript
try {
    producer.send(topic, { json });
    res.send(JSON.stringify({"success": true}));
  } catch (e) {
    res.send(JSON.stringify({
      "success": false,
      "error": String(e)
    }));
  }
```

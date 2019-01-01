## Capturing Events
Chronos captures events on the client side by using a `tracker.js` file. The tracker itself is compiled from multiple files by using Browserify and automates the capturing of the following events:
* pageviews
* mouse movements
* mouse clicks
* link clicks
* key presses
* form submissions

In addition to this, the tracker captures metadata about the page in which the events occur, such as:
* the url of the page
* the title of the page
* the user agent
* the language of the browser
* whether cookies are allowed
* a uuid

The tracker first checks to see if a uuid exists within the `window.sessionStorage` object. If not, it creates one and stores it there.

While capturing most of these events did not prove difficult, we did encounter difficulties when capturing mouse movements. Our first attempt was to add an event listener to the `mousemove` event which would store the `x` and `y` coordinates of the mouse in an object. We then had a `setInterval()` call that checked every 10ms whether the mouse had moved from its previous position, and to both record it if it did and reset the current position to this new location
```javascript
let mousePos;
  let prevMousePos;

  document.addEventListener('mousemove', (event) => {
    mousePos = {
      x: event.clientX,
      y: event.clientY,
    }
  });

  setInterval(() => {
    const pos = mousePos;

    if (pos) {
      if (!prevMousePos || prevMousePos && pos !== prevMousePos) {
        console.log('ping');

        prevMousePos = pos;
      }
    }
  }, 100);
  let mousePos;
```
By using `setInterval()` we were able to standardize the amount of data we were capturing in the `mousemovement` event across browsers since each has their own implementation of the rate of capture.

However, when we began to try and send the events directly to the API, we began raising `net::ERR_INSUFFICIENT_RESOURCES` exceptions in certain browsers. We first attempted to reduce the granularity of the event to 20ms and then to 1000ms but kept running into the same error. Furthermore, on browsers that did not have this problem, the API began to choke on the sheer number of requests very quickly.

(graphic goes here)

A solution to this is to send the events in batch by storing them in a buffer and then sending the buffer when either a) it is full, or b) when the user begins to leave the page. Once we did this both the browser and the API stopped experiencing issues.

(graphic goes here)

### Payload Size
(server specs, etc)

In our the first design of our buffer, we sent each event over to the server as a JSON object. We tested the size of the events by sending a buffer with only link click events with the same values along with a consistent write key and metadata object. In this scenario, each event was roughly 92 bytes in size, and so a buffer containing 1,150 events would return a `413` error from the server.

(show graphic of buffer with JSON)

While a max buffer size of 1,150 events seems reasonable, we wanted to make sure to get as large of a payload as possible in order to ping the API less often. 1,150 events isn't as many as it may first seem when you remember that Chronos captures certain events such as key presses and mouse movements at a very small granularity. This problem will only increase in future iterations as Chronos captures even more events.

We were able to optimize the buffer by removing the keys of the JSON object and instead sending all of the values in a nested array. Since the value at index `0` is the name of the event, we could use that information on the server side to write the data to the appropriate table in the databases. By doing this, we reduced the size of each of the events to roughly 42 bytes, allowing us to increase the maximum buffer size to over 2,500 events (a 100%+ increase in payload).

(show graphic of buffer with arrays)

While our next thought was to serialize the data into binary, a key problem is that we could never guarantee the size of our buffer, nor the values of the metadata object, nor the write key. As such, optimizing on binary would be unfeasible. We could instead just serialize the entire UTF-16 string into binary, but the minimum byte size for each character would be 8 bits which ended up being no more effective than just sending the string as is.

### Beacon API and Error Handling
By default, the tracker sends the data to the API server by using the Beacon API. This API was designed with analytics and diagnostics in mind as it allows for data to be sent in an asynchronous `POST` request that is non-blocking and thus doesn't interfere with the user's experience of the application. However, the Beacon API doesn't support error handling since it doesn't usually require to receive a response from the server. To handle errors, Chronos also allows for the Fetch API to be used.

### Security Concerns
Since the tracker file lives on the client side, it presents inherent difficulties with security since the code can always be examined. As such, a malicious user can exploit the tracker to send corrupt data. However, we found from our research that this is an inherent difficulty within the field of web analytics:

> There’s no way to both allow clients to send data to Keen and prevent a malicious user of a client from sending bad data. This is an unfortunate reality. Google Analytics, Flurry, KissMetrics, etc., all have this problem. _[Keen IO](https://keen.io/docs/security/)_
>
As such, we provided two layers of security. The first is that we provide a write key which exists both on the server side and is imbedded withint the tracker when it is compiled. When data is sent to the server we use middleware to check if the write key in the client matches that of the server. If it doesn't, the request is rejected. This way, if a developer notices that bad data is coming through to the server, the api key can be re-generated and thus prevent the malicious writes from coming through.

The second layer of security is that another piece of middleware contains a listing of permitted host addresses that can write data to the server. If the incoming request comes from a host that isn't white listed, the server rejects the request. 

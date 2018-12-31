## Existing Solutions
Luckily, there are already existing solutions for a developer who wishes to capture, store, and analyze event data. However, many of these solutions are proprietary in nature and while they could be used for greenfield applications, they are better suited for larger or enterprise level applications. With these solutions we generally found the following problems:
1. Monetary costs
2. Data lives on the proprietary service's servers
3. Data may be sampled
4. You may not have access to your raw data
5. Manual implementation of events to capture

The justifications of these drawbacks should be straightforward:
1. Since greenfield applications are usually in a prototype or new phase, they likely don't have or want to spend a lot of money on proprietary solutions
2. With the growing concern about how people's data is being used, it's always a gamble to have your data hosted on a service's server that you don't have direct access to
3. Same problem as \#2
4. If you can only access data through an API and can never get at the raw data itself, not only does that limit what you can do with the data, but it makes it hard if not impossible to transfer it to another solution
5. Since a greenfield application doesn't yet know what events to capture, requiring manual implementation of event capturing is counter-intuitive

Of the various solutions, there were three that we found in particular better suited our use case: Yandex Metrica, Event Hub, and Countly Community Edition.

### Yandex Metrica
One existing solution is provided by [Yandex Metrica](https://metrica.yandex.com/about?), which is a product of the larger [Yandex](https://yandex.com/) company. Two of the standout advantages of Yandex Metrica is that they provide the ability to create "click maps", visual representations on a web page where a user clicked through, as well as heat maps that show which sections of your pages have the most activity. Yandex also has no fee associated with it.

While Yandex does require your data to live on their servers, they are required to respect European data privacy laws and also encrypt your data so it can't be used by other analytical services. Further, any data they look at for their own analytical purposes is done so in a way that your data remains anonymous.

One big drawback is that Yandex requires most event capturing to be manually implemented. Another problem is that while you do have access to your raw data, you can only access via their API, and so you have to extract and store your data manually.

### EventHub
Another solution for Greenfield applications is [EventHub](https://github.com/Codecademy/EventHub), which is an open source event tracking/storage system written in Java. It has some impressive analytical capabilities such as cohort and funneling queries, but it has little-to-no automatic tracking of events.

Two other drawbacks of EventHub are that it's timestamp is processing time only (i.e. it logs the timestamp when the data hits the server as opposed to when it occurs in the client). This is mitigated by the fact that any event capturing a developer implements can just include a client-side timestamp. However, the largest issue is that the project has been abandoned for 5 years now, so support would likely be totally absent.

### Countly Community Edition
Of the three choices, [Countly's community edition](https://github.com/Countly/countly-server) (open source) was the strongest option. Countly allows not only for a quick manual setup on your own server, but also provides a one-click setup option for hosting your server on Digital Ocean. Their tracker is a JavaScrpit SDK that tracks the following events automatically:
* sessions
* pageviews (both for tradition websites and single page applications)
* link clicks (both on a link or those on a parent node)
* form submissions

Two other events, mouse clicks and mouse scrolls, are only automatically captured in the enterprise edition. Since Countly must be ran on a server you own, you have access to all of your own data (which is stored in MongoDB), and they also provide a UI for visualizing and exploring your data.

The largest drawbacks to Countly are the limited number of events captured (anything else must be implemented manually) and that their pipeline setup is a direct connection from their API to their database (this is also true of EventHub). Why this latter design is problematic will be discussed below.

### Chronos
For Chronos to be an alternative in this space, it must solve the problems listed above as well as provide some benefits compared to the existing solutions. In the end, Chronos was able solve the 5 problems above:
1. Chronos is open source, and thus free to use
2. Data only exists on the server you host Chronos on and so you don't have to fear its security
3. Chronos will never sample your data since it's just an infrastructure
4. Chronos provides access to your raw data
5. Chronos provides a config file that specifies which events you'd like to capture: everything else is automated

In addition to this, we provided a way for Chronos to visualize any queries over the data. We also wanted to make sure that Chronos would be space efficient since a greenfield application shouldn't be spending lots of money on their own server to collect data. Below we detail how we went about building Chronos and the challenges we faced.

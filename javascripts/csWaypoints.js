document.addEventListener('DOMContentLoaded', () => {
  const removeActive = (titles) => {
    Array.prototype.forEach.call(titles, (title) => {
      title.classList.remove('active');
    });
  };

  const addActive = (title) => {
    if (!title.classList.contains('active')) {
      title.classList.add('active');
    }
  };

  const titles = document.querySelectorAll('#toc li.h2');

  document.querySelector('#toc').addEventListener('click', (event) => {
    const li = event.target;
    const data = li.dataset.element;
    const title = document.getElementById(data);

    if (data === 'introduction') {
      title.scrollIntoView({behavior: 'smooth', block: 'center'});
    } else {
      title.scrollIntoView({behavior: 'smooth', block: 'start'})
    }

  });

  let introWaypoint = new Waypoint({
    element: document.getElementById('introduction'),
    handler: () => {
      removeActive(titles);

      const tocReference = document.getElementById('introduction-toc');
      addActive(tocReference);
    }
  });

  let eventDataWaypoint = new Waypoint({
    element: document.getElementById('what-is-event-data-'),
    handler: (direction) => {
      removeActive(titles);
      let tocReference;

      if (direction === 'down') {
        tocReference = document.getElementById('what-is-event-data-toc');
      } else {
        tocReference = document.getElementById('introduction-toc');
      }

      addActive(tocReference);
    },
  });

  let manualWaypoint = new Waypoint({
    element: document.getElementById('manual-implementation'),
    handler: (direction) => {
      removeActive(titles);
      let tocReference;

      if (direction === 'down') {
        tocReference = document.getElementById('manual-implementation-toc');
      } else {
        tocReference = document.getElementById('what-is-event-data-toc');
      }

      addActive(tocReference);
    },
  });

  let solutionsWaypoint = new Waypoint({
    element: document.getElementById('existing-solutions'),
    handler: (direction) => {
      removeActive(titles);
      let tocReference;

      if (direction === 'down') {
        tocReference = document.getElementById('existing-solutions-toc');
      } else {
        tocReference = document.getElementById('manual-implementation-toc');
      }

      addActive(tocReference);
    },
  });

  let eventsWaypoint = new Waypoint({
    element: document.getElementById('capturing-events'),
    handler: (direction) => {
      removeActive(titles);
      let tocReference;

      if (direction === 'down') {
        tocReference = document.getElementById('capturing-events-toc');
      } else {
        tocReference = document.getElementById('existing-solutions-toc');
      }

      addActive(tocReference);
    },
  });

  let apiWaypoint = new Waypoint({
    element: document.getElementById('server-infrastructure'),
    handler: (direction) => {
      removeActive(titles);
      let tocReference;

      if (direction === 'down') {
        tocReference = document.getElementById('server-infrastructure-toc');
      } else {
        tocReference = document.getElementById('capturing-events-toc');
      }

      addActive(tocReference);
    },
  });

  let kafkaWaypoint = new Waypoint({
    element: document.getElementById('apache-kafka'),
    handler: (direction) => {
      removeActive(titles);
      let tocReference;

      if (direction === 'down') {
        tocReference = document.getElementById('apache-kafka-toc');
      } else {
        tocReference = document.getElementById('server-infrastructure-toc');
      }

      addActive(tocReference);
    },
  });

  let dockerWaypoint = new Waypoint({
    element: document.getElementById('docker'),
    handler: (direction) => {
      removeActive(titles);
      let tocReference;

      if (direction === 'down') {
        tocReference = document.getElementById('docker-toc');
      } else {
        tocReference = document.getElementById('apache-kafka-toc');
      }

      addActive(tocReference);
    },
  });

  let cliWaypoint = new Waypoint({
    element: document.getElementById('chronos-cli'),
    handler: (direction) => {
      removeActive(titles);
      let tocReference;

      if (direction === 'down') {
        tocReference = document.getElementById('chronos-cli-toc');
      } else {
        tocReference = document.getElementById('docker-toc');
      }

      addActive(tocReference);
    },
  });

  let storingEventDataWaypoint = new Waypoint({
    element: document.getElementById('storing-event-data'),
    handler: (direction) => {
      removeActive(titles);
      let tocReference;

      if (direction === 'down') {
        tocReference = document.getElementById('storing-event-data-toc');
      } else {
        tocReference = document.getElementById('chronos-cli-toc');
      }

      addActive(tocReference);
    },
  });

  let grafanaWaypoint = new Waypoint({
    element: document.getElementById('grafana'),
    handler: (direction) => {
      removeActive(titles);
      let tocReference;

      if (direction === 'down') {
        tocReference = document.getElementById('grafana-toc');
      } else {
        tocReference = document.getElementById('storing-event-data-toc');
      }

      addActive(tocReference);
    },
  });

  let futurePlansWaypoint = new Waypoint({
    element: document.getElementById('future-plans'),
    handler: (direction) => {
      removeActive(titles);
      let tocReference;

      if (direction === 'down') {
        tocReference = document.getElementById('future-plans-toc');
      } else {
        tocReference = document.getElementById('grafana-toc');
      }

      addActive(tocReference);
    },
  });

  let aboutUsWaypoint = new Waypoint({
    element: document.getElementById('about-us'),
    handler: (direction) => {
      removeActive(titles);
      let tocReference;

      if (direction === 'down') {
        tocReference = document.getElementById('about-us-toc');
      } else {
        tocReference = document.getElementById('future-plans-toc');
      }

      addActive(tocReference);
    },
  });

  let referencesWaypoint = new Waypoint({
    element: document.getElementById('references'),
    handler: (direction) => {
      removeActive(titles);
      let tocReference;

      if (direction === 'down') {
        tocReference = document.getElementById('references-toc');
      } else {
        tocReference = document.getElementById('about-us-toc');
      }

      addActive(tocReference);
    },
    offset: 50,
  });
})

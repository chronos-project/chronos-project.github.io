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

    if (data === 'devops') {
      title.scrollIntoView({behavior: 'smooth', block: 'center'});
    } else {
      title.scrollIntoView({behavior: 'smooth', block: 'start'})
    }

  });

  let w1 = new Waypoint({
    element: document.getElementById('devops'),
    handler: () => {
      removeActive(titles);

      const tocReference = document.getElementById('devops-toc');
      addActive(tocReference);
    }
  });

  let dockerWaypoint = new Waypoint({
    element: document.getElementById('docker'),
    handler: (direction) => {
      removeActive(titles);
      let tocReference;

      if (direction === 'down') {
        tocReference = document.getElementById('docker-toc');
      } else {
        tocReference = document.getElementById('devops-toc');
      }

      addActive(tocReference);
    },
  });

  let eventDataWaypoint = new Waypoint({
    element: document.getElementById('event-data-metadata-analytics'),
    handler: (direction) => {
      removeActive(titles);
      let tocReference;

      if (direction === 'down') {
        tocReference = document.getElementById('event-data-metadata-analytics-toc');
      } else {
        tocReference = document.getElementById('docker-toc');
      }

      addActive(tocReference);
    },
  });

  let eventDBWaypoint = new Waypoint({
    element: document.getElementById('event-data-metadata-analytics'),
    handler: (direction) => {
      removeActive(titles);
      let tocReference;

      if (direction === 'down') {
        tocReference = document.getElementById('event-series-time-series-databases-toc');
      } else {
        tocReference = document.getElementById('event-data-metadata-analytics-toc');
      }

      addActive(tocReference);
    },
  });

  let eventStreamingWaypoint = new Waypoint({
    element: document.getElementById('event-streaming-architecture'),
    handler: (direction) => {
      removeActive(titles);
      let tocReference;

      if (direction === 'down') {
        tocReference = document.getElementById('event-streaming-architecture-toc');
      } else {
        tocReference = document.getElementById('event-series-time-series-databases-toc');
      }

      addActive(tocReference);
    },
  });

  let kafkaWaypoint = new Waypoint({
    element: document.getElementById('kafka'),
    handler: (direction) => {
      removeActive(titles);
      let tocReference;

      if (direction === 'down') {
        tocReference = document.getElementById('kafka-toc');
      } else {
        tocReference = document.getElementById('event-streaming-architecture-toc');
      }

      addActive(tocReference);
    },
  });

  let testingWaypoint = new Waypoint({
    element: document.getElementById('testing-and-benchmarking'),
    handler: (direction) => {
      removeActive(titles);
      let tocReference;

      if (direction === 'down') {
        tocReference = document.getElementById('testing-and-benchmarking-toc');
      } else {
        tocReference = document.getElementById('kafka-toc');
      }

      addActive(tocReference);
    },
    offset: 50,
  });
})

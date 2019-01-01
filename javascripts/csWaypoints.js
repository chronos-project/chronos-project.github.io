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

  let w1 = new Waypoint({
    element: document.getElementById('introduction'),
    handler: () => {
      removeActive(titles);

      const tocReference = document.getElementById('introduction-toc');
      addActive(tocReference);
    }
  });

  let w2 = new Waypoint({
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

  let w3 = new Waypoint({
    element: document.getElementById('existing-solutions'),
    handler: (direction) => {
      removeActive(titles);
      let tocReference;

      if (direction === 'down') {
        tocReference = document.getElementById('existing-solutions-toc');
      } else {
        tocReference = document.getElementById('what-is-event-data-toc');
      }

      addActive(tocReference);
    },
  });

  let w4 = new Waypoint({
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

  let w5 = new Waypoint({
    element: document.getElementById('api-server'),
    handler: (direction) => {
      removeActive(titles);
      let tocReference;

      if (direction === 'down') {
        tocReference = document.getElementById('api-server-toc');
      } else {
        tocReference = document.getElementById('capturing-events-toc');
      }

      addActive(tocReference);
    },
  });

  let w6 = new Waypoint({
    element: document.getElementById('apache-kafka'),
    handler: (direction) => {
      removeActive(titles);
      let tocReference;

      if (direction === 'down') {
        tocReference = document.getElementById('apache-kafka-toc');
      } else {
        tocReference = document.getElementById('api-server-toc');
      }

      addActive(tocReference);
    },
  });
})

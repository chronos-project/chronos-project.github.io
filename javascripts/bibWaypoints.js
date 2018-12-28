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

  let w2 = new Waypoint({
    element: document.getElementById('docker'),
    handler: () => {
      removeActive(titles);

      const tocReference = document.getElementById('docker-toc');
      addActive(tocReference);
    },
  });
})

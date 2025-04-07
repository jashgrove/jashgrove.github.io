document.addEventListener('DOMContentLoaded', () => {
  const projectCards = document.querySelectorAll('.project-card');

  projectCards.forEach(card => {
    const aboutButton = card.querySelector('.btn-about');
    const closeButton = card.querySelector('.overlay-close');
    if (aboutButton) {
      aboutButton.addEventListener('click', () => {
        card.classList.add('overlay-active');
      });
    }
    if (closeButton) {
      closeButton.addEventListener('click', () => {
        card.classList.remove('overlay-active');
      });
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const contactBtn = document.getElementById('contactBtn');
  const modal = document.getElementById('contactModal');
  const modalClose = document.getElementById('modalClose');
  const contactForm = document.getElementById('contactForm');
  const formMessage = document.getElementById('formMessage');

  function closeModal() {
    modal.setAttribute('aria-hidden', 'true');
    modal.style.display = 'none';
    formMessage.innerHTML = '';
    contactBtn.focus();
  }

  if (contactBtn) {
    contactBtn.addEventListener('click', () => {
      modal.setAttribute('aria-hidden', 'false');
      modal.style.display = 'flex';
      const firstInput = modal.querySelector('#name');
      if (firstInput) firstInput.focus();
    });
  }

  if (modalClose) {
    modalClose.addEventListener('click', () => {
      closeModal();
    });
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(contactForm);

      fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(response => {
        if (response.ok) {
          formMessage.innerHTML = '<p style="color: blue;">Message sent successfully!</p>';
          contactForm.reset();
          setTimeout(() => {
            closeModal();
          }, 2000);
        } else {
          response.json().then(data => {
            if (data.errors) {
              formMessage.innerHTML = '<p style="color: red;">' + data.errors.map(error => error.message).join(", ") + '</p>';
            } else {
              formMessage.innerHTML = '<p style="color: red;">Oops! Something went wrong!</p>';
            }
          });
        }
      })
      .catch(error => {
        console.error('Error:', error);
        formMessage.innerHTML = '<p style="color: red;">Oops! Something went wrong!</p>';
      });
    });
  }
});

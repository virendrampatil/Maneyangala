/**
 * Main JavaScript for Vista Paradise Resort
 */

document.addEventListener('DOMContentLoaded', function () {
  // Navbar scroll effect
  const navbar = document.getElementById('mainNav');

  if (window.location.pathname.includes('gallery.html')) {
    navbar.classList.add('scrolled');
  } else {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
        navbar.classList.remove('navbar-hidden');
      } else {
        navbar.classList.remove('scrolled');
        navbar.classList.add('navbar-hidden');
      }
    });
  }

  // Social Float functionality
  const socialFloatToggle = document.querySelector('.social-float-toggle');
  const socialFloatItems = document.querySelector('.social-float-items');

  if (socialFloatToggle) {
    socialFloatToggle.addEventListener('click', function () {
      this.classList.toggle('active');
      socialFloatItems.classList.toggle('active');
    });
  }

  // Gallery filter functionality
  const filterButtons = document.querySelectorAll('.gallery-filter button');
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
      button.addEventListener('click', function () {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));

        // Add active class to clicked button
        this.classList.add('active');

        // Get filter value
        const filterValue = this.getAttribute('data-filter');

        // Filter gallery items
        galleryItems.forEach(item => {
          if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  // Gallery modal functionality
  const galleryModal = document.getElementById('galleryModal');
  const galleryCarousel = document.getElementById('galleryCarousel');
  const currentImageNumber = document.getElementById('currentImageNumber');
  const totalImages = document.getElementById('totalImages');

  if (galleryModal && galleryCarousel) {
    // Set total number of images
    const totalImageCount = galleryCarousel.querySelectorAll('.carousel-item').length;
    if (totalImages) {
      totalImages.textContent = totalImageCount;
    }

    // Handle modal show event
    galleryModal.addEventListener('show.bs.modal', function (event) {
      const clickedImage = event.relatedTarget;
      const imageId = clickedImage.getAttribute('data-image-id');

      // Find and activate the correct carousel item
      const carouselItems = galleryCarousel.querySelectorAll('.carousel-item');
      carouselItems.forEach((item, index) => {
        item.classList.remove('active');
        if (item.getAttribute('data-image-id') === imageId) {
          item.classList.add('active');
          // Update counter
          if (currentImageNumber) {
            currentImageNumber.textContent = index + 1;
          }
        }
      });
    });

    // Handle carousel slide events
    galleryCarousel.addEventListener('slide.bs.carousel', function (event) {
      const activeIndex = event.to;
      if (currentImageNumber) {
        currentImageNumber.textContent = activeIndex + 1;
      }
    });
  }

  // Accommodation modal functionality
  const accommodationModal = document.getElementById('accommodationModal');
  let roomCarouselInstance = null;

  // Room data
  const roomData = {
    'experience-stay': {
      title: 'Stay',
      description: 'Our house features five comfortable rooms, a playroom and a large open space on the first floor, ideal for gatherings and relaxation.',
      features: [
        'Rs 30,000 upto 15 pax',
        'Additional Rs 2,000 per pax',
        'Breakfast complimentary',
        'Lunch and Dinner on request (charged separately)',
      ],
      images: [
        'https://maneyangala.b-cdn.net/images/stay/BAT_5812.jpg',
        'https://maneyangala.b-cdn.net/images/stay/BAT_5840.jpg',
        'https://maneyangala.b-cdn.net/images/stay/BAT_5851.jpg',
        'https://maneyangala.b-cdn.net/images/stay/BAT_5902.jpg',
        'https://maneyangala.b-cdn.net/images/stay/BAT_5959.jpg',
        'https://maneyangala.b-cdn.net/images/stay/BAT_6060.jpg'
      ]
    },
    'experience-event': {
      title: 'Event Space',
      description: 'MANTAPA - Featuring a traditional design with terracotta tile roof, this open air structure is a perfect center piece for any event or retreat.<br>AMPHITHEATER- This serene amphitheater amidst our tall green trees is the ideal spot for hosting dreamy wedding events, off-beat corporate gatherings, fun sport meets or a rejuvenating yoga retreat!',
      features: [
        'Upto 24hrs - Rs 85,000',
        '100 chairs included',
        'Seating capacity: 250 pax',
        'Generator included',
        'Kitchen space available',
      ],
      images: [
        'https://maneyangala.b-cdn.net/images/event/BAT_5860.jpg',
        'https://maneyangala.b-cdn.net/images/event/IMG_5835.jpg',
        'https://maneyangala.b-cdn.net/images/event/BAT_5838.jpg',
        'https://maneyangala.b-cdn.net/images/event/BAT_5891.jpg',
        'https://maneyangala.b-cdn.net/images/event/BAT_6090.jpg'
      ]
    }
  };

  if (accommodationModal) {
    accommodationModal.addEventListener('show.bs.modal', function (event) {
      const button = event.relatedTarget;
      const roomType = button.getAttribute('data-room');
      const room = roomData[roomType];

      console.log('Modal opening for room:', roomType);
      console.log('Room data:', room);

      if (room) {
        // Update modal title
        const modalTitle = document.getElementById('accommodationModalLabel');
        if (modalTitle) {
          modalTitle.textContent = room.title;
        }

        // Update description
        const roomDescription = document.getElementById('roomDescription');
        if (roomDescription) {
          roomDescription.innerHTML = room.description;
        }

        // Update features
        const roomFeatures = document.getElementById('roomFeatures');
        if (roomFeatures) {
          roomFeatures.innerHTML = room.features.map(feature => `
          <li class="d-flex align-items-start mb-2">
            <i class="fas fa-circle-dot text-primary me-3 mt-1"></i>
            <span>${feature}</span>
          </li>
        `).join('');
        }

        // Update carousel images
        const carouselInner = document.getElementById('roomCarouselInner');
        if (carouselInner) {
          carouselInner.innerHTML = room.images.map((image, index) => `
          <div class="carousel-item ${index === 0 ? 'active' : ''}">
            <img src="${image}" class="d-block w-100 rounded" alt="${room.title} - Image ${index + 1}" style="height: 400px; object-fit: cover;">
          </div>
        `).join('');
        }
      } else {
        console.error('Room data not found for:', roomType);
      }
    });

    // Clean up carousel instance when modal is hidden
    accommodationModal.addEventListener('hidden.bs.modal', function () {
      if (roomCarouselInstance) {
        roomCarouselInstance.dispose();
        roomCarouselInstance = null;
        console.log('Carousel disposed');
      }
    });
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      // Skip links that don't actually link to anything
      if (this.getAttribute('href') === '#') return;

      e.preventDefault();

      // Get the target element
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        // Scroll to the target
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Account for fixed navbar
          behavior: 'smooth'
        });

        // If on mobile, close the navbar
        const navbarToggler = document.querySelector('.navbar-toggler');
        const navbarCollapse = document.querySelector('.navbar-collapse');

        if (navbarCollapse.classList.contains('show')) {
          navbarToggler.click();
        }
      }
    });
  });

  // Initialize tooltips and popovers if using Bootstrap's JS components
  if (typeof bootstrap !== 'undefined') {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    popoverTriggerList.map(function (popoverTriggerEl) {
      return new bootstrap.Popover(popoverTriggerEl);
    });
  }
});

document.getElementById('btn-download').addEventListener('click', function () {
  const pdfUrl = '..\\Maneyangala_Brochure.pdf';

  // Create an anchor element
  const anchor = document.createElement('a');
  anchor.href = pdfUrl;
  anchor.download = 'Maneyangala_Brochure.pdf';
  document.body.appendChild(anchor);

  // Simulate a click on the anchor to trigger the download
  anchor.click();

  // Clean up by removing the anchor
  document.body.removeChild(anchor);
});
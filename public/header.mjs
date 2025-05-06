// header.mjs

const NAV_LINKS = [
    { name: 'Home', href: 'index.html' },
    { name: 'Projects', href: 'projects.html' },
  ];
  
  function createHeader() {
    const header = document.createElement('header');
  
    // Top section with name and menu button
    const navContent = document.createElement('div');
    navContent.id = 'nav-content';
  
    const title = document.createElement('h1');
    title.textContent = 'Martin Wise';
  
    const menuButton = document.createElement('button');
    menuButton.id = 'nav-button';
    menuButton.textContent = 'Menu';
  
    navContent.appendChild(title);
    navContent.appendChild(menuButton);
    header.appendChild(navContent);
  
    // Nav links (initially visible for desktop, hidden for mobile)
    const navLinksContainer = document.createElement('nav');
    navLinksContainer.id = 'nav-links';
  
    NAV_LINKS.forEach(linkData => {
      const link = document.createElement('a');
      link.href = linkData.href;
      link.textContent = linkData.name;
      navLinksContainer.appendChild(link);
    });
  
    header.appendChild(navLinksContainer);
  
    // Mobile nav functionality
    let navVisible = false;
  
    function updateNavVisibility() {
      navLinksContainer.style.display = navVisible ? 'flex' : 'none';
    }
  
    // Show/hide menu on button click
    menuButton.addEventListener('click', (event) => {
      event.stopPropagation(); // Don't trigger body click
      navVisible = !navVisible;
      updateNavVisibility();
    });
  
    // Hide menu when clicking outside
    document.body.addEventListener('click', (event) => {
      if (!header.contains(event.target)) {
        navVisible = false;
        updateNavVisibility();
      }
    });
  
    // Ensure nav is hidden initially on small screens
    function checkScreenSize() {
      if (window.innerWidth <= 800) {
        navVisible = false;
        updateNavVisibility();
      } else {
        navVisible = true;
        updateNavVisibility();
      }
    }
  
    window.addEventListener('resize', checkScreenSize);
    checkScreenSize();
  
    return header;
  }
  
  // Replace static <header> in HTML with dynamic one
  document.addEventListener('DOMContentLoaded', () => {
    const oldHeader = document.querySelector('header');
    if (oldHeader) {
      const newHeader = createHeader();
      oldHeader.replaceWith(newHeader);
    }
  });
  
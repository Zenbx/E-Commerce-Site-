(function() {
      'use strict';
      
      const header = document.querySelector('.header');
      const footer = document.querySelector('.footer');
      const body = document.body;
      
      if (!header || !footer) {
        console.warn('Header ou footer non trouvé');
        return;
      }
      
      body.classList.add('has-fixed-header');
      
      const triggerDistance = 300;
      
      function handleScroll() {
        const scrollPosition = window.scrollY + window.innerHeight;
        const footerPosition = footer.getBoundingClientRect().top + window.scrollY;
        const distanceToFooter = footerPosition - scrollPosition;
        
        if (distanceToFooter <= triggerDistance) {
          const progress = Math.max(0, Math.min(1, distanceToFooter / triggerDistance));
          const translateY = -100 * (1 - progress);
          header.style.transform = `translateY(${translateY}%)`;
          header.style.opacity = String(progress);
        } else {
          header.style.transform = 'translateY(0)';
          header.style.opacity = '1';
        }
      }
      
      let ticking = false;
      
      function requestTick() {
        if (!ticking) {
          requestAnimationFrame(function() {
            handleScroll();
            ticking = false;
          });
          ticking = true;
        }
      }
      
      window.addEventListener('scroll', requestTick, { passive: true });
      window.addEventListener('resize', requestTick, { passive: true });
      
      handleScroll();
    })();
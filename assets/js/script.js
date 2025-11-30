'use strict';

/**
 * navbar variables
 */

const navOpenBtn = document.querySelector("[data-menu-open-btn]");
const navCloseBtn = document.querySelector("[data-menu-close-btn]");
const navbar = document.querySelector("[data-navbar]");
const overlay = document.querySelector("[data-overlay]");

const navElemArr = [navOpenBtn, navCloseBtn, overlay];

for (let i = 0; i < navElemArr.length; i++) {

  navElemArr[i].addEventListener("click", function () {

    navbar.classList.toggle("active");
    overlay.classList.toggle("active");
    document.body.classList.toggle("active");

  });

}



/**
 * header sticky
 */

const header = document.querySelector("[data-header]");

window.addEventListener("scroll", function () {

  window.scrollY >= 10 ? header.classList.add("active") : header.classList.remove("active");

});



/**
 * go top
 */

const goTopBtn = document.querySelector("[data-go-top]");

window.addEventListener("scroll", function () {

  window.scrollY >= 500 ? goTopBtn.classList.add("active") : goTopBtn.classList.remove("active");

});

/*-----------------------------------*\
 * #REVIEW RATING CALCULATOR
\*-----------------------------------*/

/**
 * Filmlane Official Script
 * Includes: Rating Calculation, Sorting, and See More/Less
 */

document.addEventListener('DOMContentLoaded', function() {

  /* ======================================================
     1. CALCULATE AVERAGE RATING & PROGRESS BARS
     ====================================================== */
  function calculateAverageRating() {
    // 1. Select ONLY cards that actually have data inside
    const cards = document.querySelectorAll('.review-card[data-rating]');
    const totalCards = cards.length;
    
    // Reset Counts
    let totalScore = 0;
    let starCounts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  
    // Loop through cards to gather data
    cards.forEach(card => {
      const ratingAttr = card.getAttribute('data-rating');
      const rating = ratingAttr ? parseFloat(ratingAttr) : 0;
      
      if (!isNaN(rating) && rating > 0) {
        totalScore += rating;
        
        let roundedRating = Math.round(rating); 
        if(roundedRating < 1) roundedRating = 1;
        if(roundedRating > 5) roundedRating = 5;
        
        starCounts[roundedRating]++;

        // Update individual card stars to match data-rating
        const starContainer = card.querySelector('.rating-wrapper');
        if (starContainer) {
            let cardStarHTML = '';
            for (let i = 1; i <= 5; i++) {
                if (rating >= i) {
                    cardStarHTML += '<ion-icon name="star"></ion-icon>';
                } else if (rating >= i - 0.5) {
                    cardStarHTML += '<ion-icon name="star-half-outline"></ion-icon>';
                } else {
                    cardStarHTML += '<ion-icon name="star-outline"></ion-icon>';
                }
            }
            starContainer.innerHTML = cardStarHTML;
        }
      }
    });
  
    // Update Left Side (Average)
    const avgScoreElement = document.getElementById('avg-score');
    const avgStarsElement = document.getElementById('avg-stars');
    const totalCountElement = document.getElementById('total-reviews-count');
  
    if (avgScoreElement && totalCards > 0) {
      const average = (totalScore / totalCards).toFixed(1); // e.g. "4.5"
      avgScoreElement.textContent = average;
      totalCountElement.textContent = `${totalCards} Ratings`;
  
      // --- NEW: LOGIC FOR HALF STARS ---
      let starHTML = '';
      for (let i = 1; i <= 5; i++) {
        if (average >= i) {
          // Full Star (e.g., if avg is 4.5, i=1,2,3,4 are full)
          starHTML += '<ion-icon name="star"></ion-icon>';
        } else if (average >= i - 0.5) {
          // Half Star (e.g., if avg is 4.5, i=5 is half)
          starHTML += '<ion-icon name="star-half-outline"></ion-icon>';
        } else {
          // Empty Star
          starHTML += '<ion-icon name="star-outline"></ion-icon>';
        }
      }
      avgStarsElement.innerHTML = starHTML;
      // ---------------------------------

    } else if (avgScoreElement) {
      avgScoreElement.textContent = "0.0";
      totalCountElement.textContent = "No Ratings";
    }
  
    // Update Right Side (Blue Bars)
    for (let i = 1; i <= 5; i++) {
      const bar = document.getElementById(`bar-${i}`);
      if (bar) {
        if (totalCards > 0) {
          const percentage = (starCounts[i] / totalCards) * 100;
          bar.style.width = `${percentage}%`;
        } else {
          bar.style.width = '0%';
        }
      }
    }
  }
  
  // Run calculation immediately
  calculateAverageRating();


  /* ======================================================
     2. SORTING FUNCTIONALITY (Highest / Lowest)
     ====================================================== */
  const filterButtons = document.querySelectorAll('.filter-btn[data-sort]');
  const reviewGrid = document.querySelector('.review-grid');

  if (filterButtons.length > 0 && reviewGrid) {
    
    filterButtons.forEach(btn => {
      btn.addEventListener('click', function() {
        
        // Visual: Update active button
        filterButtons.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
    
        // Logic: Sort the cards
        const sortType = this.getAttribute('data-sort');
        const cards = Array.from(document.querySelectorAll('.review-card'));
    
        cards.sort((a, b) => {
          const ratingA = parseFloat(a.getAttribute('data-rating')) || 0;
          const ratingB = parseFloat(b.getAttribute('data-rating')) || 0;
    
          if (sortType === 'highest') {
            return ratingB - ratingA; // High to Low
          } else {
            return ratingA - ratingB; // Low to High
          }
        });
    
        // Clear grid and re-append in new order
        reviewGrid.innerHTML = '';
        cards.forEach(card => {
          reviewGrid.appendChild(card);
        });

      });
    });
  }


  /* ======================================================
     3. "SEE MORE" BUTTON LOGIC
     ====================================================== */
  const cards = document.querySelectorAll('.review-card');

  cards.forEach(card => {
    const text = card.querySelector('.review-text');
    const btn = card.querySelector('.see-more-btn');

    if (text && btn) {
      // Check if text is long enough to need a button
      if (text.scrollHeight > text.clientHeight) {
        btn.style.display = 'inline-block';
      } else {
        btn.style.display = 'none';
      }

      // Click event
      btn.addEventListener('click', function() {
        text.classList.toggle('expanded');
        this.textContent = text.classList.contains('expanded') ? 'See Less' : 'See More';
      });
    }
  });

});

/*-----------------------------------*\
 * #SCROLL REVEAL ANIMATION LOOP
\*-----------------------------------*/

const revealElements = document.querySelectorAll(".reveal");

const scrollReveal = function () {
  for (let i = 0; i < revealElements.length; i++) {
    
    // Height of the window
    const windowHeight = window.innerHeight;
    // Distance from top of viewport to the element
    const elementTop = revealElements[i].getBoundingClientRect().top;
    // How much of the element must be visible before triggering (100px)
    const elementVisible = 100; 

    if (elementTop < windowHeight - elementVisible) {
      revealElements[i].classList.add("active");
    }
  }
}

// Listen for scroll events
window.addEventListener("scroll", scrollReveal);
// Trigger once on load to show elements already on screen
window.addEventListener("load", scrollReveal);

/*-----------------------------------*\
 * #LOAD EXTERNAL REVIEWS
\*-----------------------------------*/

function loadExternalReviews() {
  // 1. Find all cards that have a 'data-review-file' attribute
  const cards = document.querySelectorAll('.review-card[data-review-file]');

  cards.forEach(card => {
    const fileName = card.getAttribute('data-review-file');
    const textElement = card.querySelector('.review-text');
    const btn = card.querySelector('.see-more-btn');

    // 2. Fetch the text file
    fetch(`./assets/reviews/${fileName}`)
      .then(response => {
        if (!response.ok) throw new Error("Review file not found");
        return response.text();
      })
      .then(text => {
        // 3. Inject the text into the HTML
        textElement.textContent = text;

        // 4. IMPORTANT: Re-check if we need the "See More" button
        // We do this here because the text size just changed!
        if (textElement.scrollHeight > textElement.clientHeight) {
          btn.style.display = 'inline-block';
        } else {
          btn.style.display = 'none';
        }
      })
      .catch(error => {
        console.error('Error:', error);
        textElement.textContent = "Could not load review text.";
      });
  });
}

// Run this function when the page loads
window.addEventListener('load', loadExternalReviews);

/*-----------------------------------*\
 * #REVIEW POPUP MODAL LOGIC
\*-----------------------------------*/

document.addEventListener('DOMContentLoaded', function() {
  
  // Define variables INSIDE this function so we know HTML is ready
  const reviewModalOverlay = document.getElementById('review-modal-overlay');
  const modalUserImg = document.getElementById('modal-user-img');
  const modalUserName = document.getElementById('modal-user-name');
  const modalUserRating = document.getElementById('modal-user-rating');
  const modalReviewText = document.getElementById('modal-review-text');
  const closeReviewBtn = document.querySelector('.close-review-btn');

  // Safety Check: If modal doesn't exist, stop to prevent errors
  if (!reviewModalOverlay) return;

  // Function to open/close modal
  function toggleReviewModal(show) {
    if (show) {
      reviewModalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden'; 
    } else {
      reviewModalOverlay.classList.remove('active');
      document.body.style.overflow = 'visible'; 
    }
  }

  // Close when clicking outside
  reviewModalOverlay.addEventListener('click', (e) => {
    if (e.target === reviewModalOverlay) toggleReviewModal(false);
  });

  // Close when clicking the X button
  if (closeReviewBtn) {
    closeReviewBtn.addEventListener('click', () => toggleReviewModal(false));
  }

  // Initialize Expand Buttons
  function initExpandButtons() {
    const expandBtns = document.querySelectorAll('.expand-btn');

    expandBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        const card = this.closest('.review-card');
        
        // Extract Data
        const imgSrc = card.querySelector('.avatar img').src;
        const name = card.querySelector('.username').textContent;
        const ratingHtml = card.querySelector('.rating-wrapper').innerHTML;
        const fullText = card.querySelector('.review-text').textContent;

        // Populate Modal
        if(modalUserImg) modalUserImg.src = imgSrc;
        if(modalUserName) modalUserName.textContent = name;
        if(modalUserRating) modalUserRating.innerHTML = ratingHtml;
        if(modalReviewText) modalReviewText.textContent = fullText;

        // Show Modal
        toggleReviewModal(true);
      });
    });
  }

  // Run initialization
  initExpandButtons();
});

/*-----------------------------------*\
 * #CUSTOM SHARE MODAL LOGIC
\*-----------------------------------*/

// Variables for the Share Modal
const shareModal = document.getElementById('share-modal-overlay');
const shareInput = document.getElementById('share-link-input');
const copyModalBtn = document.getElementById('copy-modal-btn');

// Social Link Elements
const sFb = document.getElementById('s-fb');
const sTw = document.getElementById('s-tw');
const sWa = document.getElementById('s-wa');
const sPin = document.getElementById('s-pin');
const sMail = document.getElementById('s-mail');

// Toggle Modal Visibility (Required for the Close Button X)
function toggleShareModal(show) {
  if (show) {
    shareModal.classList.add('active');
  } else {
    shareModal.classList.remove('active');
  }
}

// Close modal when clicking outside the box
if (shareModal) {
  shareModal.addEventListener('click', (e) => {
    if (e.target === shareModal) toggleShareModal(false);
  });
}

// Initialize Share & Copy Actions
function initReviewActions() {
  const copyBtns = document.querySelectorAll('.copy-btn');
  const shareBtns = document.querySelectorAll('.share-btn');

  // 1. SIMPLE COPY BUTTON (On the card itself)
  copyBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const card = this.closest('.review-card');
      // Fallback: if review text is loading, don't copy
      const textEl = card.querySelector('.review-text');
      if (!textEl) return;
      
      const text = textEl.textContent;
      
      // Use Clipboard API
      navigator.clipboard.writeText(text).then(() => {
        const icon = this.querySelector('ion-icon');
        const originalIcon = icon.getAttribute('name');
        
        // Visual Feedback
        icon.setAttribute('name', 'checkmark-outline');
        setTimeout(() => icon.setAttribute('name', originalIcon), 2000);
      }).catch(err => console.error('Copy failed:', err));
    });
  });

  // 2. SHARE BUTTON (Opens the Modal)
  shareBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const card = this.closest('.review-card');
      const text = card.querySelector('.review-text').textContent;
      
      // Get current page URL
      const url = window.location.href; 
      
      // Set the input value in the modal
      if (shareInput) shareInput.value = url;

      // Update Social Links dynamically
      const msg = encodeURIComponent(`Check out this review: "${text.substring(0, 100)}..."`);
      const encUrl = encodeURIComponent(url);

      if(sFb) sFb.href = `https://www.facebook.com/sharer/sharer.php?u=${encUrl}`;
      if(sTw) sTw.href = `https://twitter.com/intent/tweet?text=${msg}&url=${encUrl}`;
      if(sWa) sWa.href = `https://api.whatsapp.com/send?text=${msg}%20${encUrl}`;
      if(sPin) sPin.href = `https://pinterest.com/pin/create/button/?url=${encUrl}&description=${msg}`;
      if(sMail) sMail.href = `mailto:?subject=Movie Review&body=${msg}%0A${encUrl}`;

      // Open Modal
      toggleShareModal(true);
    });
  });
}

// 3. COPY BUTTON INSIDE MODAL
if (copyModalBtn) {
  copyModalBtn.addEventListener('click', () => {
    shareInput.select();
    shareInput.setSelectionRange(0, 99999); // Mobile compatibility
    navigator.clipboard.writeText(shareInput.value).then(() => {
      copyModalBtn.textContent = "Copied!";
      copyModalBtn.classList.add('copied');
      setTimeout(() => {
        copyModalBtn.textContent = "Copy";
        copyModalBtn.classList.remove('copied');
      }, 2000);
    });
  });
}

/*-----------------------------------*\
 * #ABOUT FILM POPUP LOGIC
\*-----------------------------------*/

// 1. Select Elements
const aboutLink = document.getElementById('about-film-link');
const aboutModal = document.getElementById('about-modal-overlay');
const closeAboutBtn = document.getElementById('close-about-btn');

// 2. Open Modal Function
if (aboutLink && aboutModal) {
  aboutLink.addEventListener('click', function(e) {
    e.preventDefault(); // Stop page from jumping to top
    aboutModal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Stop background scroll
  });
}

// 3. Close Modal Function (X button)
if (closeAboutBtn) {
  closeAboutBtn.addEventListener('click', function() {
    aboutModal.classList.remove('active');
    document.body.style.overflow = 'visible';
  });
}

// 4. Close when clicking background
if (aboutModal) {
  aboutModal.addEventListener('click', function(e) {
    if (e.target === aboutModal) {
      aboutModal.classList.remove('active');
      document.body.style.overflow = 'visible';
    }
  });
}


/*-----------------------------------*\
 * #REFERENCES POPUP LOGIC
\*-----------------------------------*/

// 1. Select Elements
const refsLink = document.getElementById('references-link');
const refsModal = document.getElementById('references-modal-overlay');
const closeRefsBtn = document.getElementById('close-references-btn');

// 2. Open Modal Function
if (refsLink && refsModal) {
  refsLink.addEventListener('click', function(e) {
    e.preventDefault(); 
    refsModal.classList.add('active');
    document.body.style.overflow = 'hidden'; 
  });
}

// 3. Close Modal Function (X button)
if (closeRefsBtn) {
  closeRefsBtn.addEventListener('click', function() {
    refsModal.classList.remove('active');
    document.body.style.overflow = 'visible';
  });
}

// 4. Close when clicking background
if (refsModal) {
  refsModal.addEventListener('click', function(e) {
    if (e.target === refsModal) {
      refsModal.classList.remove('active');
      document.body.style.overflow = 'visible';
    }
  });
}

/*-----------------------------------*\
 * #MEMBERS POPUP LOGIC
\*-----------------------------------*/

// 1. Select Elements
const memLink = document.getElementById('members-link');
const memModal = document.getElementById('members-modal-overlay');
const closeMemBtn = document.getElementById('close-members-btn');

// 2. Open Modal Function
if (memLink && memModal) {
  memLink.addEventListener('click', function(e) {
    e.preventDefault(); 
    memModal.classList.add('active');
    document.body.style.overflow = 'hidden'; 
  });
}

// 3. Close Modal Function (X button)
if (closeMemBtn) {
  closeMemBtn.addEventListener('click', function() {
    memModal.classList.remove('active');
    document.body.style.overflow = 'visible';
  });
}

// 4. Close when clicking background
if (memModal) {
  memModal.addEventListener('click', function(e) {
    if (e.target === memModal) {
      memModal.classList.remove('active');
      document.body.style.overflow = 'visible';
    }
  });
}


// Run on load
window.addEventListener('load', initReviewActions);



/*-----------------------------------*\
 * #DOWNLOAD BUTTON CHECKER
\*-----------------------------------*/

function initDownloadCheck() {
  // Select the service button (and any other download buttons you want to check)
  const downloadBtns = document.querySelectorAll('.service-btn, .download-btn');

  downloadBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
      const link = this.getAttribute('href');

      // Check if the link is missing, empty, or just a placeholder '#'
      if (!link || link === '#' || link === 'javascript:void(0)') {
        e.preventDefault(); // Stop the browser from doing anything
        alert("No link available"); // Show the popup message
      }
    });
  });
}

// Run on load
window.addEventListener('load', initDownloadCheck);
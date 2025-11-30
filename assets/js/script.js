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
    const cards = document.querySelectorAll('.review-card');
    const totalCards = cards.length;
    
    // Reset Counts
    let totalScore = 0;
    let starCounts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  
    // Loop through cards to gather data
    cards.forEach(card => {
      // Get rating safely
      const ratingAttr = card.getAttribute('data-rating');
      const rating = ratingAttr ? parseFloat(ratingAttr) : 0;
      
      if (!isNaN(rating) && rating > 0) {
        totalScore += rating;
        
        // Count specific stars (Rounding ensures 4.5 goes to 5 bucket or 4 bucket as you prefer)
        let roundedRating = Math.round(rating); 
        if(roundedRating < 1) roundedRating = 1;
        if(roundedRating > 5) roundedRating = 5;
        
        starCounts[roundedRating]++;
      }
    });
  
    // Update Left Side (Average)
    const avgScoreElement = document.getElementById('avg-score');
    const avgStarsElement = document.getElementById('avg-stars');
    const totalCountElement = document.getElementById('total-reviews-count');
  
    if (avgScoreElement && totalCards > 0) {
      const average = (totalScore / totalCards).toFixed(1);
      avgScoreElement.textContent = average;
      totalCountElement.textContent = `${totalCards} Ratings`;
  
      // Generate Stars for Average
      let starHTML = '';
      for (let i = 1; i <= 5; i++) {
        if (i <= Math.round(average)) {
          starHTML += '<ion-icon name="star"></ion-icon>';
        } else {
          starHTML += '<ion-icon name="star-outline"></ion-icon>';
        }
      }
      avgStarsElement.innerHTML = starHTML;
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
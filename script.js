
/* =========================================================
   Dynamic padding to avoid header overlap
   ========================================================= */
function adjustMainPadding() {
    var header = document.getElementById('header');
    var main   = document.getElementById('container');
    if (header && main) {
        main.style.paddingTop = header.offsetHeight + 'px';
    }
}

/* =========================================================
   Enhanced Screen Orientation Check with iOS Fix
   ========================================================= */
var suggestionDismissed = false;


function closeSuggestion() {
    var suggestion = document.getElementById('landscape-suggestion');
    if (suggestion) {
        suggestion.style.display = 'none';
        // This saves a "dismissed" flag for the current browser session
        sessionStorage.setItem('suggestionDismissed', 'true');
    }
}


/* Update your existing checkOrientation function */

function checkOrientation() {
    // Check if the user already clicked "Close" during this visit
    if (sessionStorage.getItem('suggestionDismissed') === 'true') {
        return; 
    }

    setTimeout(function() {
        var suggestion = document.getElementById('landscape-suggestion');
        if (!suggestion) return;

        if (window.innerWidth < 1000 && window.innerHeight > window.innerWidth) {
            suggestion.style.display = 'flex';
        } else {
            suggestion.style.display = 'none';
        }
    }, 150); 
}


window.addEventListener('load', checkOrientation);
window.addEventListener('resize', checkOrientation);
// Specifically listen for orientation changes on mobile
window.addEventListener('orientationchange', checkOrientation);




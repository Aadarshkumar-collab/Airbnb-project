(() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
  
        form.classList.add('was-validated')
      }, false)
    })
  })()

// Live search: debounced AJAX update of listings while typing
document.addEventListener('DOMContentLoaded', () => {
  const input = document.querySelector('input[name="q"]');
  const info = document.getElementById('search-info');
  const grid = document.getElementById('listings-grid');
  if (!input || !grid) return; // nothing to do on pages without listings

  let controller = null;
  function escapeHtml(str) {
    if (!str) return '';
    return String(str).replace(/[&<>"'`]/g, s => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','\'':'&#39;','`':'&#96;'})[s]);
  }

  function debounce(fn, wait = 300) {
    let t;
    return (...args) => {
      clearTimeout(t);
      t = setTimeout(() => fn(...args), wait);
    };
  }

  async function doSearch(q) {
    if (controller) controller.abort();
    controller = new AbortController();
    try {
      const url = '/listings/search?q=' + encodeURIComponent(q);
      const res = await fetch(url, { headers: { 'Accept': 'application/json' }, signal: controller.signal });
      if (!res.ok) return;
      const data = await res.json();

      // Update search info
      if (data.query && data.query.trim() !== '') {
        info.innerHTML = `<h3>Showing results for "${escapeHtml(data.query)}"</h3>`;
        if (Array.isArray(data.allListings) && data.allListings.length === 0) {
          info.innerHTML += `<p class="text-muted">No listings found for "${escapeHtml(data.query)}".</p>`;
        }
      } else {
        info.innerHTML = '';
      }

      // Build listings HTML
      const html = (data.allListings || []).map(l => {
        const img = l.image && l.image.url ? l.image.url : '/images/logo.png';
        const price = l.price ? `&#8377; ${Number(l.price).toLocaleString('en-IN')}/Night` : '';
        const title = escapeHtml(l.title || 'Untitled');
        return `<a href="/listings/${l._id}" class="listing-link"><div class="card col listing-card"><img src="${img}" class="card-img-top" alt="listing_image" style="height: 20rem"/><div class="card-body"><p class="card-text"><b>${title}</b> <br /> ${price} <i class="tax-info">&nbsp; &nbsp; +18% GST</i></p></div></div></a>`;
      }).join('');

      grid.innerHTML = html;
    } catch (err) {
      if (err.name === 'AbortError') return; // expected when typing quickly
      console.error('Search error', err);
    }
  }

  const onInput = debounce((e) => doSearch(e.target.value), 300);
  input.addEventListener('input', onInput);
});
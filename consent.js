/*
  Cookie consent for Drop Everything And Go.
  Nothing that sets non-essential cookies (Google Analytics, Travelpayouts)
  loads until the visitor presses Accept. Declining is remembered and
  nothing is loaded. Include on every page with:
    <script src="consent.js" defer></script>          (root pages)
    <script src="../consent.js" defer></script>       (pages in a folder)
  Add data-travelpayouts="1" to the tag on pages that use Travelpayouts.
*/
(function () {
  var GA_ID = 'G-S59LVL96RN';
  var me = document.currentScript;
  var useTP = me && me.getAttribute('data-travelpayouts') === '1';
  var root = me ? me.getAttribute('src').replace(/consent\.js.*$/, '') : '';

  function get() { try { return localStorage.getItem('ck'); } catch (e) { return null; } }
  function set(v) { try { localStorage.setItem('ck', v); } catch (e) {} }

  function loadTrackers() {
    if (window.__deagLoaded) return;
    window.__deagLoaded = true;
    var g = document.createElement('script');
    g.async = true;
    g.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(g);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { dataLayer.push(arguments); };
    gtag('js', new Date());
    gtag('config', GA_ID, { anonymize_ip: true });
    if (useTP) {
      var t = document.createElement('script');
      t.async = true;
      t.src = 'https://emrldtp.com/NTIxMTA3.js?t=521107';
      document.head.appendChild(t);
    }
  }

  function banner() {
    var c = document.getElementById('ck');
    if (!c) {
      c = document.createElement('div');
      c.className = 'ck';
      c.id = 'ck';
      c.innerHTML =
        '<p class="ck-text">We use analytics and affiliate cookies to see how the site is used. ' +
        'Nothing non-essential loads unless you accept. <a href="' + root + 'privacy.html#cookies">Cookie policy</a></p>' +
        '<div class="ck-btns"><button class="ck-acc" type="button">Accept</button>' +
        '<button class="ck-dec" type="button">Decline</button></div>';
      document.body.appendChild(c);
    }
    var acc = c.querySelector('.ck-acc'), dec = c.querySelector('.ck-dec');
    if (acc) acc.onclick = window.ckAccept;
    if (dec) dec.onclick = window.ckDecline;
    return c;
  }

  window.ckAccept = function () { set('y'); loadTrackers(); var c = document.getElementById('ck'); if (c) c.classList.remove('vis'); };
  window.ckDecline = function () { set('n'); var c = document.getElementById('ck'); if (c) c.classList.remove('vis'); };
  // Lets the privacy page offer a "change my choice" link.
  window.ckReset = function () { try { localStorage.removeItem('ck'); } catch (e) {} banner().classList.add('vis'); };

  var choice = get();
  if (choice === 'y') {
    loadTrackers();
    banner();
  } else {
    var c = banner();
    if (choice !== 'n') setTimeout(function () { c.classList.add('vis'); }, 1200);
  }
})();

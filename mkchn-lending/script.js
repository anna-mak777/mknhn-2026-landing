/* =================================================================
   МКЧН-2026 Лендинг — scripts
   • Форма «Запросить КП на МКЧН-2027» → Formspree + заготовка CRM
   • Мобильное меню (burger)
   ================================================================= */

(function(){
  'use strict';

  // ============== MOBILE MENU ==============
  var burger = document.getElementById('burger');
  var mobileMenu = document.getElementById('mobile-menu');
  var mobileMenuClose = document.getElementById('mobile-menu-close');

  function closeMenu(){
    mobileMenu.classList.remove('open');
    burger.classList.remove('open');
    document.body.style.overflow = '';
  }
  function openMenu(){
    mobileMenu.classList.add('open');
    burger.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  if(burger && mobileMenu){
    burger.addEventListener('click', function(){
      mobileMenu.classList.contains('open') ? closeMenu() : openMenu();
    });
    if(mobileMenuClose) mobileMenuClose.addEventListener('click', closeMenu);
    mobileMenu.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', closeMenu);
    });
    document.addEventListener('keydown', function(e){
      if(e.key === 'Escape' && mobileMenu.classList.contains('open')) closeMenu();
    });
  }

  // ============== KP REQUEST FORM ==============
  var form = document.getElementById('kp-request-form');
  if(!form) return;

  var wrapper = form.closest('.kp-form-wrapper');
  var success = document.getElementById('kp-success');
  var error   = document.getElementById('kp-error');
  var btn     = form.querySelector('button[type="submit"]');
  var btnLabel= form.querySelector('.btn-label');
  var original= btnLabel ? btnLabel.textContent : 'Отправить';
  var sendAnother = document.getElementById('kp-send-another');

  if(sendAnother) sendAnother.addEventListener('click', function(){
    wrapper.classList.remove('submitted');
    success.classList.remove('show');
    error.classList.remove('show');
    form.reset();
  });

  // ============== CRM WEBHOOK (опционально) ==============
  // Когда разработчик CRM даст webhook URL — впишите сюда.
  // Пример: var CRM_WEBHOOK_URL = 'https://crm.proftreker.ru/api/leads';
  var CRM_WEBHOOK_URL = null;

  function buildCrmPayload(formData){
    var payload = {
      project: 'МКЧН-2027',
      source:  'landing-mkchn-2026',
      submittedAt: new Date().toISOString(),
      pageUrl: location.href
    };
    formData.forEach(function(v, k){
      if(k.indexOf('_') !== 0) payload[k] = v;  // пропускаем служебные
    });
    return payload;
  }

  form.addEventListener('submit', function(e){
    e.preventDefault();
    form.classList.add('sending');
    btn.disabled = true;
    if(btnLabel) btnLabel.textContent = 'Отправляем…';

    var formData = new FormData(form);
    var requests = [
      fetch(form.action, {
        method:  'POST',
        headers: {'Accept': 'application/json'},
        body:    formData
      })
    ];

    if(CRM_WEBHOOK_URL){
      requests.push(
        fetch(CRM_WEBHOOK_URL, {
          method:  'POST',
          headers: {'Content-Type':'application/json'},
          body:    JSON.stringify(buildCrmPayload(formData))
        }).catch(function(err){
          console.warn('CRM webhook failed:', err);
        })
      );
    }

    Promise.all(requests)
      .then(function(results){
        var formspreeOk = results[0] && results[0].ok;
        if(formspreeOk){
          wrapper.classList.add('submitted');
          success.classList.add('show');
          form.reset();
          // Scroll к success-блоку
          success.scrollIntoView({behavior:'smooth', block:'center'});
        } else {
          wrapper.classList.add('submitted');
          error.classList.add('show');
        }
      })
      .catch(function(){
        wrapper.classList.add('submitted');
        error.classList.add('show');
      })
      .finally(function(){
        form.classList.remove('sending');
        btn.disabled = false;
        if(btnLabel) btnLabel.textContent = original;
      });
  });
})();

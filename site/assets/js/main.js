(function () {
  'use strict';

  var WHATSAPP_NUMBER = '5551991213724';
  var CITY_NAME = 'São Francisco de Paula';
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.addEventListener('DOMContentLoaded', function () {
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: prefersReducedMotion ? 0 : 800,
        easing: 'ease-in-out',
        once: true,
        offset: 80,
        disable: prefersReducedMotion
      });
    }

    initMobileMenu();
    initScrollEffects();
    initSmoothScroll();
    initWhatsAppForm();
    initAttractionButtons();
    initParticles();
    initCounters();
    initFaq();
    initWhatsAppFloat();
    initFormValidation();
    initPhoneMask();
    initDateMin();
  });

  function initMobileMenu() {
    var menuToggle = document.getElementById('menu-toggle');
    var navMenu = document.getElementById('nav-menu');
    if (!menuToggle || !navMenu) return;

    menuToggle.addEventListener('click', function () {
      var isOpen = navMenu.classList.toggle('active');
      menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      var spans = menuToggle.querySelectorAll('span');
      if (isOpen) {
        spans[0].style.transform = 'rotate(45deg) translate(7px, 7px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
      } else {
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
      }
    });

    navMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navMenu.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        var spans = menuToggle.querySelectorAll('span');
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
      });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.focus();
      }
    });
  }

  function initScrollEffects() {
    var header = document.getElementById('header');
    var navLinks = document.querySelectorAll('.nav-link');
    var sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', function () {
      if (header) header.classList.toggle('scrolled', window.scrollY > 50);
      var current = '';
      sections.forEach(function (section) {
        if (window.scrollY >= section.offsetTop - 150) current = section.getAttribute('id');
      });
      navLinks.forEach(function (link) {
        link.classList.toggle('active', link.getAttribute('href') === '#' + current);
      });
    });
  }

  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener('click', function (e) {
        var href = this.getAttribute('href');
        if (href === '#' || href.length <= 1) return;
        var target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        var header = document.getElementById('header');
        var offset = header ? header.offsetHeight : 0;
        window.scrollTo({
          top: target.offsetTop - offset - 16,
          behavior: prefersReducedMotion ? 'auto' : 'smooth'
        });
      });
    });
  }

  function initAttractionButtons() {
    document.querySelectorAll('[data-atracao]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var atracao = btn.getAttribute('data-atracao');
        var el = document.getElementById('atracao');
        if (atracao && el) setTimeout(function () { el.value = atracao; }, 400);
      });
    });
  }

  function initWhatsAppForm() {
    var form = document.getElementById('whatsapp-form');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var fields = ['nome', 'telefone', 'data-visita'];
      var valid = true;
      fields.forEach(function (id) {
        var el = document.getElementById(id);
        if (el && !validateField(el)) valid = false;
      });
      if (!valid) return;

      var nome = document.getElementById('nome').value.trim();
      var telefone = document.getElementById('telefone').value.trim();
      var dataVisita = document.getElementById('data-visita').value;
      var pessoas = document.getElementById('pessoas').value || 'Não informado';
      var atracao = document.getElementById('atracao').value || 'Roteiro geral';
      var hospedagem = document.getElementById('hospedagem').value || 'Não informado';
      var obs = document.getElementById('observacoes').value.trim() || 'Nenhuma';

      var msg = 'Olá! Gostaria de agendar uma visita a ' + CITY_NAME + '.\n\n';
      msg += '• Nome: ' + nome + '\n';
      msg += '• Telefone: ' + telefone + '\n';
      msg += '• Data prevista: ' + formatDateBR(dataVisita) + '\n';
      msg += '• Número de pessoas: ' + pessoas + '\n';
      msg += '• Atração/roteiro: ' + atracao + '\n';
      msg += '• Precisa de hospedagem: ' + hospedagem + '\n';
      msg += '• Observações: ' + obs + '\n\n';
      msg += 'Aguardo retorno!';

      window.open('https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(msg), '_blank');
      form.reset();
    });
  }

  function formatDateBR(isoDate) {
    if (!isoDate) return '';
    var p = isoDate.split('-');
    return p[2] + '/' + p[1] + '/' + p[0];
  }

  function initWhatsAppFloat() {
    var float = document.getElementById('whatsapp-float');
    if (!float) return;
    float.addEventListener('click', function (e) {
      e.preventDefault();
      var contact = document.getElementById('contato');
      if (contact) contact.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    });
  }

  function initParticles() {
    if (prefersReducedMotion) return;
    var container = document.getElementById('particles');
    if (!container) return;
    for (var i = 0; i < 30; i++) {
      var p = document.createElement('span');
      p.style.cssText = 'position:absolute;width:4px;height:4px;background:rgba(255,255,255,0.3);border-radius:50%;left:' + Math.random() * 100 + '%;top:' + Math.random() * 100 + '%;animation:floatParticle ' + (3 + Math.random() * 4) + 's ease-in-out infinite;animation-delay:' + Math.random() * 2 + 's';
      container.appendChild(p);
    }
  }

  function initCounters() {
    if (prefersReducedMotion) {
      document.querySelectorAll('[data-count]').forEach(function (el) {
        el.textContent = el.getAttribute('data-count');
      });
      return;
    }
    var observed = false;
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && !observed) {
          observed = true;
          document.querySelectorAll('[data-count]').forEach(function (el) {
            animateCount(el);
          });
        }
      });
    }, { threshold: 0.3 });
    var stats = document.querySelector('.hero-stats');
    if (stats) observer.observe(stats);
  }

  function animateCount(el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    var duration = 2000;
    var start = performance.now();
    function step(now) {
      var progress = Math.min((now - start) / duration, 1);
      el.textContent = Math.floor(progress * target);
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target;
    }
    requestAnimationFrame(step);
  }

  function initFaq() {
    document.querySelectorAll('.faq-question').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var expanded = btn.getAttribute('aria-expanded') === 'true';
        var answer = document.getElementById(btn.getAttribute('aria-controls'));
        btn.setAttribute('aria-expanded', expanded ? 'false' : 'true');
        if (answer) answer.hidden = expanded;
      });
    });
  }

  function initFormValidation() {
    document.querySelectorAll('.form-group input, .form-group select, .form-group textarea').forEach(function (input) {
      input.addEventListener('blur', function () { validateField(input); });
      input.addEventListener('input', function () {
        if (input.classList.contains('error')) validateField(input);
      });
    });
  }

  function validateField(field) {
    var valid = true;
    if (field.required && !field.value.trim()) valid = false;
    if (field.type === 'tel' && field.value.trim() && field.value.replace(/\D/g, '').length < 10) valid = false;
    field.classList.toggle('error', !valid);
    var group = field.closest('.form-group');
    var err = group && group.querySelector('.field-error');
    if (err) err.textContent = valid ? '' : 'Campo obrigatório ou inválido';
    return valid;
  }

  function initPhoneMask() {
    var tel = document.getElementById('telefone');
    if (!tel) return;
    tel.addEventListener('input', function () {
      var v = tel.value.replace(/\D/g, '').slice(0, 11);
      if (v.length <= 10) {
        tel.value = v.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3').replace(/-$/, '');
      } else {
        tel.value = v.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3').replace(/-$/, '');
      }
    });
  }

  function initDateMin() {
    var dateEl = document.getElementById('data-visita');
    if (!dateEl) return;
    var today = new Date().toISOString().split('T')[0];
    dateEl.setAttribute('min', today);
  }
})();

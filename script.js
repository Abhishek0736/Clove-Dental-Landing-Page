/* ========== NOTIFICATION SYSTEM ========== */
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <span class="notification-icon">${type === 'success' ? '✓' : type === 'error' ? '✗' : 'i'}</span>
    <span class="notification-text">${message}</span>
  `;
  document.body.appendChild(notification);
  
  setTimeout(() => notification.classList.add('show'), 10);
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

/* ========== SECTION 1: NAVIGATION BAR ========== */
document.addEventListener('DOMContentLoaded', () => {
  const btnAppointment = document.querySelector('.btn-appointment');
  const btnCall = document.querySelector('.btn-call');
  
  if (btnAppointment) {
    btnAppointment.addEventListener('click', () => {
      showNotification('Scrolling to appointment form...', 'info');
      const appointmentSection = document.querySelector('.appointment-section');
      if (appointmentSection) {
        appointmentSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setTimeout(() => {
          const nameField = document.querySelector('.appointment-section #name');
          if (nameField) nameField.focus();
        }, 600);
      }
    });
  }
  
  if (btnCall) {
    btnCall.addEventListener('click', () => {
      const phoneNumber = btnCall.textContent.trim().replace(/[^0-9]/g, '');
      showNotification('Initiating call to ' + phoneNumber, 'info');
      setTimeout(() => {
        window.location.href = `tel:${phoneNumber}`;
      }, 500);
    });
  }
  
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 50) {
      navbar.style.boxShadow = '0 4px 12px rgba(0,0,0,.1)';
    } else {
      navbar.style.boxShadow = '0 2px 8px rgba(0,0,0,.08)';
    }
  });
});

/* ========== CAPTCHA GENERATION ========== */
function generateCaptcha() {
  const captcha = Math.floor(1000 + Math.random() * 9000);
  const captchaElements = document.querySelectorAll('#captchaValue');
  captchaElements.forEach(el => el.textContent = captcha);
  return captcha;
}

/* ========== SECTION 2: HERO SECTION WITH CONSULTATION FORM ========== */
document.addEventListener('DOMContentLoaded', () => {
  generateCaptcha();
  
  const heroForm = document.getElementById('consultationForm');
  const heroMsg = document.getElementById('formMessage');
  const heroName = document.getElementById('name');
  const heroMobile = document.getElementById('mobile');
  const heroCaptcha = document.getElementById('captchaInput');
  const heroAgree = document.getElementById('agree');
  
  if (heroForm) {
    heroForm.addEventListener('submit', (e) => {
      e.preventDefault();
      heroMsg.textContent = '';
      heroMsg.className = 'message';
      
      const name = heroName.value.trim();
      const mobile = heroMobile.value.trim();
      const captcha = heroCaptcha.value.trim();
      const captchaValue = heroForm.querySelector('#captchaValue').textContent.trim();
      const agreed = heroAgree.checked;
      
      if (!name) {
        heroMsg.textContent = 'Please enter your name';
        heroMsg.classList.add('error');
        heroName.focus();
        return;
      }
      
      if (!mobile || !/^[0-9]{10}$/.test(mobile)) {
        heroMsg.textContent = 'Please enter a valid 10-digit mobile number';
        heroMsg.classList.add('error');
        heroMobile.focus();
        return;
      }
      
      if (!captcha) {
        heroMsg.textContent = 'Please enter the captcha';
        heroMsg.classList.add('error');
        heroCaptcha.focus();
        return;
      }
      
      if (captcha !== captchaValue) {
        heroMsg.textContent = 'Incorrect captcha. Please try again';
        heroMsg.classList.add('error');
        generateCaptcha();
        heroCaptcha.value = '';
        heroCaptcha.focus();
        return;
      }
      
      if (!agreed) {
        heroMsg.textContent = 'Please agree to terms and privacy policy';
        heroMsg.classList.add('error');
        return;
      }
      
      showNotification('Form Submitted Successfully!', 'success');
      heroMsg.textContent = 'Thank you! Your consultation request has been submitted successfully.';
      heroMsg.classList.add('success');
      heroForm.reset();
      generateCaptcha();
      
      setTimeout(() => {
        heroMsg.textContent = '';
        heroMsg.className = 'message';
      }, 5000);
    });
    
    if (heroMobile) {
      heroMobile.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/[^0-9]/g, '').slice(0, 10);
      });
    }
    
    if (heroCaptcha) {
      heroCaptcha.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/[^0-9]/g, '').slice(0, 4);
      });
    }
  }
  
  const appointmentForm = document.getElementById('appointmentForm');
  const appointmentMsg = appointmentForm?.querySelector('#formMessage');
  const appointmentName = appointmentForm?.querySelector('#name');
  const appointmentPhone = appointmentForm?.querySelector('#phone');
  const appointmentCaptcha = appointmentForm?.querySelector('#captchaInput');
  const appointmentAgree = appointmentForm?.querySelector('#agree');
  
  if (appointmentForm) {
    appointmentForm.addEventListener('submit', (e) => {
      e.preventDefault();
      appointmentMsg.textContent = '';
      appointmentMsg.className = 'message';
      
      const name = appointmentName.value.trim();
      const phone = appointmentPhone.value.trim();
      const captcha = appointmentCaptcha.value.trim();
      const captchaValue = appointmentForm.querySelector('#captchaValue').textContent.trim();
      const agreed = appointmentAgree.checked;
      
      if (!name) {
        appointmentMsg.textContent = 'Please enter your name';
        appointmentMsg.classList.add('error');
        appointmentName.focus();
        return;
      }
      
      if (!phone || !/^[0-9]{10}$/.test(phone)) {
        appointmentMsg.textContent = 'Please enter a valid 10-digit phone number';
        appointmentMsg.classList.add('error');
        appointmentPhone.focus();
        return;
      }
      
      if (!captcha) {
        appointmentMsg.textContent = 'Please enter the captcha';
        appointmentMsg.classList.add('error');
        appointmentCaptcha.focus();
        return;
      }
      
      if (captcha !== captchaValue) {
        appointmentMsg.textContent = 'Incorrect captcha. Please try again';
        appointmentMsg.classList.add('error');
        generateCaptcha();
        appointmentCaptcha.value = '';
        appointmentCaptcha.focus();
        return;
      }
      
      if (!agreed) {
        appointmentMsg.textContent = 'Please agree to terms and privacy policy';
        appointmentMsg.classList.add('error');
        return;
      }
      
      showNotification('Appointment Booked Successfully!', 'success');
      appointmentMsg.textContent = 'Thank you! Your appointment request has been submitted successfully.';
      appointmentMsg.classList.add('success');
      appointmentForm.reset();
      generateCaptcha();
      
      setTimeout(() => {
        appointmentMsg.textContent = '';
        appointmentMsg.className = 'message';
      }, 5000);
    });
    
    if (appointmentPhone) {
      appointmentPhone.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/[^0-9]/g, '').slice(0, 10);
      });
    }
    
    if (appointmentCaptcha) {
      appointmentCaptcha.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/[^0-9]/g, '').slice(0, 4);
      });
    }
  }
});

/* ========== SMOOTH SCROLL ========== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const navHeight = document.querySelector('.navbar')?.offsetHeight || 0;
      window.scrollTo({
        top: target.offsetTop - navHeight,
        behavior: 'smooth'
      });
    }
  });
});

/* ========== SECTION 3: STATS STRIP WITH ANIMATED MARQUEE ========== */
const track = document.querySelector('.stats-track');
if (track) {
  const clone = track.cloneNode(true);
  track.parentElement.appendChild(clone);
  clone.classList.add('stats-track--clone');
  
  const statsMarquee = document.querySelector('.stats-marquee');
  if (statsMarquee) {
    statsMarquee.addEventListener('mouseenter', () => {
      track.style.animationPlayState = 'paused';
      clone.style.animationPlayState = 'paused';
    });
    statsMarquee.addEventListener('mouseleave', () => {
      track.style.animationPlayState = 'running';
      clone.style.animationPlayState = 'running';
    });
  }
  
  document.querySelectorAll('.stat-item').forEach(item => {
    item.style.cursor = 'pointer';
    item.addEventListener('click', () => {
      const statText = item.querySelector('.stat-text').textContent.trim();
      showNotification(statText, 'info');
    });
  });
}

/* ========== SECTION 4: ROOT CANAL TREATMENT CARDS ========== */
const rctButtons = document.querySelectorAll('.rct-btn');
rctButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const treatment = btn.getAttribute('data-treatment') || 'this treatment';
    showNotification('Selected: ' + treatment, 'info');
    
    const appointmentSection = document.querySelector('.appointment-section');
    if (appointmentSection) {
      appointmentSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setTimeout(() => {
        const nameField = document.querySelector('.appointment-section #name');
        if (nameField) {
          nameField.focus();
          nameField.setAttribute('placeholder', `Book ${treatment}`);
        }
      }, 600);
    }
  });
});

document.querySelectorAll('.rct-card').forEach(card => {
  card.style.transition = 'all 0.3s ease';
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-5px)';
    card.style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)';
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0)';
    card.style.boxShadow = 'none';
  });
});

/* ========== SECTION 5: PATIENT TESTIMONIALS (REAL SMILES) ========== */
const smilesGrid = document.querySelector('.smiles-grid');
if (smilesGrid) {
  smilesGrid.addEventListener('mouseenter', () => {
    smilesGrid.style.animationPlayState = 'paused';
  });
  smilesGrid.addEventListener('mouseleave', () => {
    smilesGrid.style.animationPlayState = 'running';
  });
}

document.querySelectorAll('.smile-card').forEach(card => {
  card.style.cursor = 'pointer';
  card.style.transition = 'all 0.3s ease';
  
  card.addEventListener('click', () => {
    const name = card.querySelector('.patient-name')?.textContent;
    const city = card.querySelector('.patient-city')?.textContent;
    showNotification(name + ' from ' + city, 'info');
    
    card.style.transform = 'scale(0.98)';
    setTimeout(() => {
      card.style.transform = 'scale(1)';
    }, 200);
  });
  
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-8px) scale(1.02)';
    card.style.boxShadow = '0 12px 24px rgba(0,0,0,0.15)';
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0) scale(1)';
    card.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
  });
});



/* ========== FOOTER SECTION ========== */
document.querySelectorAll('.footer-link').forEach(link => {
  link.style.transition = 'all 0.3s ease';
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const linkText = link.textContent.trim();
    showNotification('Opening ' + linkText + '...', 'info');
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      showNotification(linkText + ' page would open in production', 'info');
    }, 1000);
  });
  
  link.addEventListener('mouseenter', () => {
    link.style.color = '#f68a20';
    link.style.transform = 'translateX(5px)';
  });
  link.addEventListener('mouseleave', () => {
    link.style.color = '#ffffff';
    link.style.transform = 'translateX(0)';
  });
});

const footerLogo = document.querySelector('.footer-logo');
if (footerLogo) {
  footerLogo.style.cursor = 'pointer';
  footerLogo.style.transition = 'all 0.3s ease';
  footerLogo.addEventListener('click', () => {
    showNotification('Scrolling to top...', 'info');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  
  footerLogo.addEventListener('mouseenter', () => {
    footerLogo.style.transform = 'scale(1.05)';
  });
  footerLogo.addEventListener('mouseleave', () => {
    footerLogo.style.transform = 'scale(1)';
  });
}

/* ========== WELCOME MESSAGE ========== */
setTimeout(() => {
  showNotification('Welcome to Clove Dental!', 'success');
}, 500);

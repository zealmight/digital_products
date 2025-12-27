// ==========================================
// ÇOK DİLLİ SİSTEM (Multi-Language System)
// ==========================================
// Bu bölüm sitenin Türkçe ve İngilizce dillerinde
// dinamik olarak içerik değiştirmesini sağlar.

// Tüm dillerdeki çeviri metinlerini tutan merkezi obje
const translations = {
    tr: {
        'Ana Sayfa': 'Ana Sayfa',
        'Hizmetler': 'Hizmetler',
        'Yetenekler': 'Yetenekler',
        'Fiyatlandırma': 'Fiyatlandırma',
        'Tüm hakları saklıdır.': 'Tüm hakları saklıdır.'
    },
    en: {
        'Ana Sayfa': 'Home',
        'Hizmetler': 'Services',
        'Yetenekler': 'Features',
        'Fiyatlandırma': 'Pricing',
        'Tüm hakları saklıdır.': 'All rights reserved.'
    }
};

// Tarayıcı hafızasından veya varsayılan olarak Türkçe dilini al
let currentLang = localStorage.getItem('preferredLanguage') || 'tr';

// ==========================================
// SAYFA YÜKLENDİĞİNDE ÇALIŞACAK FONKSİYONLAR
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    initLanguage();        // Dil sistemini hazırla
    initTheme();           // Tema (Karanlık/Aydınlık) sistemini hazırla
    initMobileMenu();      // Mobil menü etkileşimlerini ayarla
    initScrollAnimations(); // Kaydırma animasyonlarını başlat
    initSmoothScroll();    // Yumuşak kaydırma özelliğini ekle
});

// ==========================================
// DİL SİSTEMİNİ BAŞLAT
// ==========================================
function initLanguage() {
    const langDropdown = document.getElementById('langDropdown');
    const langToggle = langDropdown.querySelector('.lang-toggle');
    const langOptions = langDropdown.querySelectorAll('.lang-option');

    // Dil menüsünü aç/kapat
    langToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        langDropdown.classList.toggle('active');
    });

    // Sayfa dışına tıklandığında menüyü kapat
    document.addEventListener('click', () => {
        langDropdown.classList.remove('active');
    });

    // Dil seçeneklerine tıklama olayı ekle
    langOptions.forEach(option => {
        option.addEventListener('click', () => {
            const lang = option.dataset.lang;
            if (lang !== currentLang) {
                switchLanguage(lang, true); // true: sayfa yeniden yüklensin
            }
            langDropdown.classList.remove('active');
        });
    });

    // Başlangıç dilini uygula (yeniden yükleme yapmadan)
    switchLanguage(currentLang, false);
}

// ==========================================
// DİLİ DEĞİŞTİR VE KAYDET
// ==========================================
function switchLanguage(lang, shouldReload = false) {
    currentLang = lang;
    localStorage.setItem('preferredLanguage', lang);

    // Menüdeki aktif dil işaretlemesini güncelle
    const langOptions = document.querySelectorAll('.lang-option');
    const currentLangText = document.querySelector('.current-lang-text');

    langOptions.forEach(option => {
        if (option.dataset.lang === lang) {
            option.classList.add('active');
            if (currentLangText) {
                currentLangText.textContent = lang.toUpperCase();
            }
        } else {
            option.classList.remove('active');
        }
    });

    applyLanguage(lang);

    // Eğer istenmişse sayfayı yenile
    if (shouldReload) {
        window.location.reload();
    }
}

// ==========================================
// DİLİ TÜM HTML ELEMENTLERİNE UYGULA
// ==========================================
function applyLanguage(lang) {
    // data-[dil] özniteliğine (attribute) sahip tüm öğeleri bul
    const elements = document.querySelectorAll(`[data-${lang}]`);

    elements.forEach(element => {
        const text = element.getAttribute(`data-${lang}`);

        // Öğe türüne göre metni yerleştir
        if (element.tagName === 'TITLE') {
            document.title = text;
        } else if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            element.placeholder = text;
        } else {
            element.textContent = text;
        }
    });

    // Statik çevirileri (translations objesinden) güncelle
    // Not: Bu kısım data- özniteliklerinin yetmediği yerler içindir.
}

// ==========================================
// TEMA SİSTEMİ (Dark/Light Mode)
// ==========================================
let currentTheme = localStorage.getItem('preferredTheme') || 'dark';

function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    applyTheme(currentTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            toggleTheme();
        });
    }
}

// Temayı değiştir ve kaydet
function toggleTheme() {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('preferredTheme', currentTheme);
    applyTheme(currentTheme);
}

// Temayı CSS sınıfı olarak uygula
function applyTheme(theme) {
    if (theme === 'light') {
        document.body.classList.add('light-theme');
    } else {
        document.body.classList.remove('light-theme');
    }
}

// ==========================================
// MOBİL MENÜ MANTIĞI
// ==========================================
function initMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navLinks = document.querySelector('.nav-menu');

    if (mobileMenuToggle && navLinks) {
        // Hamburger ikonuna tıklandığında menüyü aç/kapat
        mobileMenuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileMenuToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.replace('fa-bars', 'fa-times');
            } else {
                icon.classList.replace('fa-times', 'fa-bars');
            }
        });

        // Bir menü linkine tıklandığında menüyü otomatik kapat
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    navLinks.classList.remove('active');
                    const icon = mobileMenuToggle.querySelector('i');
                    if (icon) icon.classList.replace('fa-times', 'fa-bars');
                }
            });
        });
    }
}

// ==========================================
// YUMUŞAK KAYDIRMA (Smooth Scroll)
// ==========================================
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href && href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    // Navbar yüksekliğini hesaba kat
                    const navbarHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = target.offsetTop - navbarHeight;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// ==========================================
// SCROLL ANİMASYONLARI VE NAVBAR EFEKTİ
// ==========================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    // Kartlar ekrana girdiğinde 'visible' sınıfını ekle
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.service-card, .feature-category, .pricing-card');
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // Sayfa aşağı kaydırıldığında navbar görünümünü değiştir
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
}

// Sayfa yenilendiğinde en üste odaklan
window.addEventListener('load', () => {
    window.scrollTo(0, 0);
});

// Ekran boyutu değiştiğinde açık kalan mobil menüyü temizle
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        if (window.innerWidth > 768) {
            const navLinks = document.querySelector('.nav-menu');
            if (navLinks) navLinks.classList.remove('active');
            const icon = document.querySelector('.mobile-menu-toggle i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    }, 250);
});

// ==========================================
// ÇOK DİLLİ SİSTEM (Multi-Language System)
// ==========================================
// Bu bölüm sitenin Türkçe ve İngilizce arasında geçiş yapmasını sağlar

// Dil çevirilerini tutan obje - Her metin için TR ve EN versiyonu var
const translations = {
    tr: {
        // Navbar (Üst menü) metinleri
        'Ana Sayfa': 'Ana Sayfa',
        'Hizmetler': 'Hizmetler',
        'Yetenekler': 'Yetenekler',
        'İletişim': 'İletişim',

        // Hero Section (Ana giriş bölümü) metinleri
        '✨ Dijital Çözümler': '✨ Dijital Çözümler',
        'Müşteri İhtiyaçlarına Yönelik': 'Müşteri İhtiyaçlarına Yönelik',
        'Dijital Ürünler Tasarlıyorum': 'Dijital Ürünler Tasarlıyorum',
        'Lynto Kodlama ile işletmeniz için özel dijital çözümler geliştiriyorum. Fatura takip sistemlerinden AI destekli chatbot\'lara kadar, ihtiyacınıza özel uygulamalar.': 'Lynto coding ile işletmeniz için özel dijital çözümler geliştiriyorum. Fatura takip sistemlerinden AI destekli chatbot\'lara kadar, ihtiyacınıza özel uygulamalar.',
        'Hizmetleri Keşfet': 'Hizmetleri Keşfet',
        'İletişime Geç': 'İletişime Geç',

        // Services (Hizmetler) bölümü metinleri
        'Hizmet Kategorileri': 'Hizmet Kategorileri',
        'İşletmeniz için özel olarak tasarlanmış dijital çözümler': 'İşletmeniz için özel olarak tasarlanmış dijital çözümler',

        // Footer (Alt bilgi) metinleri
        'Müşteri ihtiyaçlarına yönelik dijital çözümler': 'Müşteri ihtiyaçlarına yönelik dijital çözümler',
        'Hızlı Linkler': 'Hızlı Linkler',
        'Sosyal Medya': 'Sosyal Medya',
        'Tüm hakları saklıdır.': 'Tüm hakları saklıdır.'
    },
    en: {
        // İngilizce çeviriler - Aynı anahtarlar, farklı değerler
        'Ana Sayfa': 'Home',
        'Hizmetler': 'Services',
        'Yetenekler': 'Features',
        'İletişim': 'Contact',


        '✨ Dijital Çözümler': '✨ Digital Solutions',
        'Müşteri İhtiyaçlarına Yönelik': 'Customer-Focused',
        'Dijital Ürünler Tasarlıyorum': 'Digital Product Design',
        'Lynto coding ile işletmeniz için özel dijital çözümler geliştiriyorum. Fatura takip sistemlerinden AI destekli chatbot\'lara kadar, ihtiyacınıza özel uygulamalar.': 'I develop custom digital solutions for your business with Lynto coding. From invoice tracking systems to AI-powered chatbots, applications tailored to your needs.',
        'Hizmetleri Keşfet': 'Explore Services',
        'İletişime Geç': 'Get in Touch',

        'Hizmet Kategorileri': 'Service Categories',
        'İşletmeniz için özel olarak tasarlanmış dijital çözümler': 'Digital solutions specially designed for your business',

        'Müşteri ihtiyaçlarına yönelik dijital çözümler': 'Customer-focused digital solutions',
        'Hızlı Linkler': 'Quick Links',
        'Sosyal Medya': 'Social Media',
        'Tüm hakları saklıdır.': 'All rights reserved.'
    }
};

// Mevcut dili localStorage'dan al veya varsayılan olarak 'tr' kullan
// localStorage: Tarayıcıda veri saklama alanı - sayfa yenilendiğinde kaybolmaz
let currentLang = localStorage.getItem('preferredLanguage') || 'tr';

// ==========================================
// SAYFA YÜKLENDİĞİNDE ÇALIŞACAK FONKSİYONLAR
// ==========================================
// DOMContentLoaded: HTML tamamen yüklendiğinde tetiklenir
document.addEventListener('DOMContentLoaded', () => {
    // Tüm başlangıç fonksiyonlarını sırayla çalıştır
    initLanguage();          // Dil sistemini başlat
    initTheme();             // Tema sistemini başlat (dark/light)
    initMobileMenu();        // Mobil menü işlevlerini başlat
    initScrollAnimations();  // Scroll animasyonlarını başlat
    initSmoothScroll();      // Yumuşak kaydırma özelliğini başlat
});

// ==========================================
// DİL SİSTEMİNİ BAŞLAT
// ==========================================
function initLanguage() {
    // Dil toggle butonunu HTML'den seç
    const langToggle = document.getElementById('langToggle');
    // Butonun içindeki tüm dil seçeneklerini (TR/EN) seç
    const langOptions = langToggle.querySelectorAll('.lang-option');

    // Her dil seçeneğini kontrol et ve aktif olanı işaretle
    langOptions.forEach(option => {
        // Eğer seçeneğin dili mevcut dil ile eşleşiyorsa
        if (option.dataset.lang === currentLang) {
            option.classList.add('active');     // 'active' class'ını ekle (CSS'te farklı görünür)
        } else {
            option.classList.remove('active');  // Değilse 'active' class'ını kaldır
        }
    });

    // Mevcut dili sayfaya uygula (tüm metinleri değiştir)
    applyLanguage(currentLang);

    // Her dil seçeneğine tıklama olayı ekle
    langOptions.forEach(option => {
        option.addEventListener('click', (e) => {
            e.stopPropagation();  // Olayın parent elementlere yayılmasını engelle
            const newLang = option.dataset.lang;  // Tıklanan seçeneğin dilini al
            // Eğer yeni dil mevcut dilden farklıysa
            if (newLang !== currentLang) {
                switchLanguage(newLang);  // Dili değiştir
            }
        });
    });
}

// ==========================================
// DİLİ DEĞİŞTİR
// ==========================================
function switchLanguage(lang) {
    currentLang = lang;  // Global dil değişkenini güncelle
    // Yeni dili localStorage'a kaydet (tarayıcı hafızası)
    localStorage.setItem('preferredLanguage', lang);

    // Aktif dil işaretini güncelle (görsel feedback)
    const langOptions = document.querySelectorAll('.lang-option');
    langOptions.forEach(option => {
        if (option.dataset.lang === lang) {
            option.classList.add('active');     // Seçili dili vurgula
        } else {
            option.classList.remove('active');  // Diğerlerini normal yap
        }
    });

    // Yeni dili sayfaya uygula
    applyLanguage(lang);
}

// ==========================================
// DİLİ TÜM ELEMENTLERE UYGULA
// ==========================================
function applyLanguage(lang) {
    // data-tr ve data-en attribute'larına sahip tüm elementleri bul
    // Bu elementler çift dilli içeriğe sahip olan elementlerdir
    const elements = document.querySelectorAll('[data-tr][data-en]');

    // Her element için işlem yap
    elements.forEach(element => {
        // Seçili dile göre metni al (örn: data-tr veya data-en)
        const text = element.getAttribute(`data-${lang}`);

        // Element tipine göre içeriği güncelle
        if (element.tagName === 'TITLE') {
            // Eğer <title> elementi ise, sayfa başlığını değiştir
            document.title = text;
        } else if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            // Eğer input veya textarea ise, placeholder'ı değiştir
            element.placeholder = text;
        } else if (element.tagName === 'LABEL') {
            // Eğer label ise, textContent'i değiştir
            element.textContent = text;
        } else {
            // Diğer tüm elementler için textContent'i değiştir
            element.textContent = text;
        }
    });
}

// ==========================================
// TEMA SİSTEMİ (Dark/Light Mode)
// ==========================================
// Kullanıcının koyu/açık tema tercihi

// Mevcut temayı localStorage'dan al veya varsayılan olarak 'dark' kullan
let currentTheme = localStorage.getItem('preferredTheme') || 'dark';

// ==========================================
// TEMA SİSTEMİNİ BAŞLAT
// ==========================================
function initTheme() {
    // Tema toggle butonunu HTML'den seç
    const themeToggle = document.getElementById('themeToggle');

    // Mevcut temayı uygula (sayfa yüklendiğinde)
    applyTheme(currentTheme);

    // Tema değiştirme butonuna tıklama olayı ekle
    themeToggle.addEventListener('click', () => {
        toggleTheme();  // Temayı değiştir
    });
}

// ==========================================
// TEMAYI DEĞİŞTİR
// ==========================================
function toggleTheme() {
    // Eğer mevcut tema 'dark' ise 'light' yap, değilse 'dark' yap
    // Bu bir ternary operator (kısa if-else) kullanımıdır
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';

    // Yeni temayı localStorage'a kaydet
    localStorage.setItem('preferredTheme', currentTheme);

    // Yeni temayı uygula
    applyTheme(currentTheme);
}

// ==========================================
// TEMAYI UYGULA
// ==========================================
function applyTheme(theme) {
    // Eğer tema 'light' ise
    if (theme === 'light') {
        // body elementine 'light-theme' class'ını ekle
        // CSS'te bu class için özel renkler tanımlı
        document.body.classList.add('light-theme');
    } else {
        // Değilse (dark tema), 'light-theme' class'ını kaldır
        document.body.classList.remove('light-theme');
    }
}

// ==========================================
// MOBİL MENÜ
// ==========================================
// Küçük ekranlarda hamburger menü işlevi

function initMobileMenu() {
    // Mobil menü toggle butonunu seç (hamburger ikonu)
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    // Navigasyon linklerini içeren container'ı seç
    const navLinks = document.querySelector('.nav-links');

    // Toggle butonuna tıklama olayı ekle
    mobileMenuToggle.addEventListener('click', () => {
        // 'active' class'ını ekle/çıkar (toggle)
        // Bu class menüyü gösterir/gizler
        navLinks.classList.toggle('active');

        // İkonu değiştir (hamburger ↔ X)
        const icon = mobileMenuToggle.querySelector('i');
        if (navLinks.classList.contains('active')) {
            // Menü açıksa, X ikonu göster
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            // Menü kapalıysa, hamburger ikonu göster
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Nav link'lere tıklandığında menüyü kapat
    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            // Sadece mobil görünümde (768px ve altı) menüyü kapat
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('active');  // Menüyü kapat
                const icon = mobileMenuToggle.querySelector('i');
                icon.classList.remove('fa-times');    // X ikonunu kaldır
                icon.classList.add('fa-bars');        // Hamburger ikonunu ekle
            }
        });
    });
}

// ==========================================
// YUMUŞAK KAYDIRMA (Smooth Scroll)
// ==========================================
// Anchor linklere tıklandığında yumuşak kaydırma efekti

function initSmoothScroll() {
    // # ile başlayan tüm linkleri seç (anchor linkler)
    const links = document.querySelectorAll('a[href^="#"]');

    // Her link için işlem yap
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            // Link'in href attribute'unu al
            const href = link.getAttribute('href');

            // Sadece # ile başlayan ve boş olmayan href'ler için
            if (href && href !== '#') {
                e.preventDefault();  // Varsayılan link davranışını engelle

                // Hedef elementi bul (örn: #home, #services)
                const target = document.querySelector(href);

                if (target) {
                    // Navbar'ın yüksekliğini al (scroll yaparken üstte kalmasın)
                    const navbarHeight = document.querySelector('.navbar').offsetHeight;
                    // Hedef pozisyonu hesapla (navbar yüksekliğini çıkar)
                    const targetPosition = target.offsetTop - navbarHeight;

                    // Yumuşak kaydırma ile hedefe git
                    window.scrollTo({
                        top: targetPosition,      // Hedef pozisyon
                        behavior: 'smooth'        // Yumuşak kaydırma efekti
                    });
                }
            }
        });
    });
}

// ==========================================
// SCROLL ANİMASYONLARI
// ==========================================
// Sayfa kaydırıldığında elementlerin görünmesi

function initScrollAnimations() {
    // Intersection Observer ayarları
    // Bu API, elementlerin görünürlüğünü takip eder
    const observerOptions = {
        threshold: 0.1,                    // Elementin %10'u göründüğünde tetikle
        rootMargin: '0px 0px -50px 0px'   // Alt kısımdan 50px önce tetikle
    };

    // Observer (gözlemci) oluştur
    const observer = new IntersectionObserver((entries) => {
        // Her gözlemlenen element için
        entries.forEach(entry => {
            // Eğer element görünür hale geldiyse
            if (entry.isIntersecting) {
                // 'visible' class'ını ekle (CSS'te animasyon tanımlı)
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Animasyon eklenecek elementleri seç
    // service-card, feature-category ve pricing-card'lar
    const animatedElements = document.querySelectorAll('.service-card, .feature-category, .pricing-card');

    // Her element için
    animatedElements.forEach(el => {
        el.classList.add('fade-in');  // Başlangıç animasyon class'ını ekle
        observer.observe(el);         // Elementi gözlemlemeye başla
    });

    // ==========================================
    // NAVBAR SCROLL EFEKTİ
    // ==========================================
    // Sayfa kaydırıldığında navbar'ın arka planını değiştir

    let lastScroll = 0;  // Son scroll pozisyonunu tut
    const navbar = document.querySelector('.navbar');

    // Scroll olayını dinle
    window.addEventListener('scroll', () => {
        // Mevcut scroll pozisyonunu al
        const currentScroll = window.pageYOffset;

        // Eğer 100px'den fazla kaydırıldıysa
        if (currentScroll > 100) {
            // Navbar'ı daha koyu yap ve gölge ekle
            navbar.style.background = 'rgba(15, 23, 42, 0.95)';
            navbar.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.2)';
        } else {
            // Değilse, orijinal haline döndür
            navbar.style.background = 'rgba(30, 41, 59, 0.7)';
            navbar.style.boxShadow = 'none';
        }

        lastScroll = currentScroll;  // Son pozisyonu güncelle
    });
}

// ==========================================
// YARDIMCI FONKSİYONLAR (Utility Functions)
// ==========================================

// Sayfa tamamen yüklendiğinde scroll pozisyonunu en üste al
window.addEventListener('load', () => {
    window.scrollTo(0, 0);  // x: 0, y: 0 (en üst)
});

// ==========================================
// PENCERE YENİDEN BOYUTLANDIRILDIĞINDA
// ==========================================
// Mobil menünün otomatik kapanması için

let resizeTimer;  // Timer değişkeni (debounce için)

window.addEventListener('resize', () => {
    // Önceki timer'ı temizle
    clearTimeout(resizeTimer);

    // 250ms sonra çalışacak yeni timer oluştur
    // Bu, resize olayının çok sık tetiklenmesini önler (debounce)
    resizeTimer = setTimeout(() => {
        // Eğer ekran genişliği 768px'den büyükse (desktop)
        if (window.innerWidth > 768) {
            const navLinks = document.querySelector('.nav-links');
            navLinks.classList.remove('active');  // Mobil menüyü kapat

            const icon = document.querySelector('.mobile-menu-toggle i');
            if (icon) {
                icon.classList.remove('fa-times');  // X ikonunu kaldır
                icon.classList.add('fa-bars');      // Hamburger ikonunu ekle
            }
        }
    }, 250);  // 250 milisaniye bekle
});

// ==========================================
// KOD AÇIKLAMALARI - GENEL KAVRAMLAR
// ==========================================

/*
1. DEĞIŞKENLER (Variables):
   - const: Değiştirilemez değişken (constant)
   - let: Değiştirilebilir değişken
   - var: Eski tip değişken (artık kullanılmıyor)

2. FONKSİYONLAR (Functions):
   - function name() {}: Klasik fonksiyon tanımlama
   - () => {}: Arrow function (ok fonksiyonu) - modern yöntem

3. EVENT LISTENERS (Olay Dinleyiciler):
   - addEventListener(): Bir olayı dinle (click, scroll, resize vb.)
   - Kullanıcı etkileşimlerini yakalamak için kullanılır

4. DOM MANİPÜLASYONU:
   - querySelector(): Tek bir element seç
   - querySelectorAll(): Birden fazla element seç
   - classList.add/remove/toggle(): Class ekle/çıkar/değiştir
   - textContent: Elementin metin içeriği
   - getAttribute/setAttribute: Attribute al/ayarla

5. LOCALSTORAGE:
   - Tarayıcıda veri saklama
   - getItem(): Veri al
   - setItem(): Veri kaydet
   - Sayfa yenilendiğinde kaybolmaz

6. INTERSECTION OBSERVER:
   - Elementlerin görünürlüğünü takip eder
   - Scroll animasyonları için kullanılır
   - Performance açısından çok verimli

7. TERNARY OPERATOR:
   - koşul ? doğruysa : yanlışsa
   - Kısa if-else yapısı

8. ARROW FUNCTIONS:
   - () => {}: Modern fonksiyon yazım şekli
   - Daha kısa ve okunabilir

9. TEMPLATE LITERALS:
   - `data-${lang}`: String içinde değişken kullanma
   - Backtick (`) ile yazılır

10. FOREACH:
    - Array'deki her eleman için işlem yap
    - Modern döngü yöntemi
*/

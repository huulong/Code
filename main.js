(function() {
    // // Vô hiệu hóa chuột phải
    // document.addEventListener('contextmenu', function(e) {
    //     e.preventDefault();
    // });

    // // Vô hiệu hóa phím tắt phổ biến
    // document.addEventListener('keydown', function(e) {
    //     // Chặn F12
    //     if (e.keyCode === 123) {
    //         e.preventDefault();
    //         return false;
    //     }
        
    //     // Chặn Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C
    //     if (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74 || e.keyCode === 67)) {
    //         e.preventDefault();
    //         return false;
    //     }
        
    //     // Chặn Ctrl+U (View Source)
    //     if (e.ctrlKey && e.keyCode === 85) {
    //         e.preventDefault();
    //         return false;
    //     }
    // });

    // // Vô hiệu hóa DevTools
    // function detectDevTools() {
    //     const widthThreshold = window.outerWidth - window.innerWidth > 160;
    //     const heightThreshold = window.outerHeight - window.innerHeight > 160;
        
    //     if(widthThreshold || heightThreshold) {
    //         document.body.innerHTML = 'DevTools detected!';
    //         window.location.href = 'about:blank';
    //     }
    // }

    // setInterval(detectDevTools, 1000);

    // Chống copy
    document.addEventListener('copy', function(e) {
        e.preventDefault();
        return false;
    });

    // Chống select text
    document.addEventListener('selectstart', function(e) {
        e.preventDefault();
        return false;
    });

    // Mã hóa strings
    function encode(str) {
        return btoa(encodeURIComponent(str));
    }

    // Obfuscate code
    const _0x1a2b3c = {
        init: function() {
            this._0x4d5e6f();
        },
        _0x4d5e6f: function() {
            // Your original code here
        }
    };

    // Self-executing function để che giấu scope
    !function(w,d,t) {
        _0x1a2b3c.init();
    }(window, document, setTimeout);

    // Console warning
    console.log(
        '%cStop!', 
        'color: red; font-size: 30px; font-weight: bold;'
    );
    console.log(
        '%cThis is a browser feature intended for developers. If someone told you to copy-paste something here, it is likely a scam.', 
        'font-size: 16px;'
    );

})();

document.addEventListener('DOMContentLoaded', () => {
    // Initialize language from localStorage or default to Vietnamese
    const currentLang = localStorage.getItem('preferredLanguage') || 'vi';
    changeLanguage(currentLang);

    // Language Switcher Event Listeners
    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const lang = btn.getAttribute('data-lang');
            
            // Update UI
            document.querySelectorAll('#current-lang').forEach(el => {
                el.textContent = lang.toUpperCase();
            });

            // Hide dropdowns
            document.querySelectorAll('#lang-dropdown, #mobile-lang-dropdown').forEach(dropdown => {
                dropdown.classList.add('hidden');
            });

            // Change language
            changeLanguage(lang);
        });
    });

    // Function to change language
    function changeLanguage(lang) {
        console.log('Changing language to:', lang); // Debug log

        // Save preference
        localStorage.setItem('preferredLanguage', lang);
        
        // Update HTML lang attribute
        document.documentElement.lang = lang;

        // Update all translatable elements
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            if (translations[lang] && translations[lang][key]) {
                console.log(`Updating ${key} to ${translations[lang][key]}`); // Debug log
                
                // Check if element has child with 'relative' class (for special buttons)
                const relativeSpan = element.querySelector('.relative');
                if (relativeSpan) {
                    relativeSpan.textContent = translations[lang][key];
                } else {
                    element.textContent = translations[lang][key];
                }
            }
        });
    }

    // Mobile Menu Toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    let isOpen = false;
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            isOpen = !isOpen;
            mobileMenu.classList.toggle('hidden');
        });
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (isOpen && mobileMenuButton && mobileMenu && !mobileMenuButton.contains(e.target) && !mobileMenu.contains(e.target)) {
            isOpen = false;
            mobileMenu.classList.add('hidden');
        }
    });
    
    // Close menu when clicking on a link
    if (mobileMenu) {
        const mobileMenuLinks = mobileMenu.querySelectorAll('a');
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', () => {
                isOpen = false;
                mobileMenu.classList.add('hidden');
            });
        });
    }

    // Language Switcher (Desktop & Mobile)
    const langToggle = document.getElementById('lang-toggle');
    const langDropdown = document.getElementById('lang-dropdown');
    let isLangOpen = false;
    
    if (langToggle && langDropdown) {
        langToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            isLangOpen = !isLangOpen;
            langDropdown.classList.toggle('hidden');
        });
        
        document.addEventListener('click', () => {
            if (isLangOpen) {
                isLangOpen = false;
                langDropdown.classList.add('hidden');
            }
        });
        
        langDropdown.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }
    
    // Mobile Language Switcher
    const mobileLangToggle = document.getElementById('mobile-lang-toggle');
    const mobileLangDropdown = document.getElementById('mobile-lang-dropdown');
    let isMobileLangOpen = false;
    
    if (mobileLangToggle && mobileLangDropdown) {
        mobileLangToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            isMobileLangOpen = !isMobileLangOpen;
            mobileLangDropdown.classList.toggle('hidden');
        });
        
        document.addEventListener('click', () => {
            if (isMobileLangOpen) {
                isMobileLangOpen = false;
                mobileLangDropdown.classList.add('hidden');
            }
        });
        
        mobileLangDropdown.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }

    // FAQ Functionality
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            if (question) {
                question.addEventListener('click', () => {
                    const currentlyActive = document.querySelector('.faq-item.active');
                    if (currentlyActive && currentlyActive !== item) {
                        currentlyActive.classList.remove('active');
                    }
                    item.classList.toggle('active');
                });
            }
        });
    }

    // Category Filter
    const categoryBtns = document.querySelectorAll('.category-btn');
    if (categoryBtns && faqItems) {
        categoryBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                categoryBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                btn.classList.add('active');
                
                const category = btn.dataset.category;
                faqItems.forEach(item => {
                    if (category === 'all' || item.dataset.category === category) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

    // Search Functionality
    const searchInput = document.getElementById('faq-search');
    if (searchInput && faqItems) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            faqItems.forEach(item => {
                const question = item.querySelector('.faq-question span:last-child')?.textContent.toLowerCase();
                const answer = item.querySelector('.faq-answer')?.textContent.toLowerCase();
                
                if (question?.includes(searchTerm) || answer?.includes(searchTerm)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }

    // Helpful Button Functionality
    const helpfulBtns = document.querySelectorAll('.helpful-btn');
    if (helpfulBtns) {
        helpfulBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const countElement = btn.closest('.faq-item')?.querySelector('.helpful-count');
                if (countElement) {
                    let count = parseInt(countElement.textContent);
                    countElement.textContent = `${count + 1} người thấy hữu ích`;
                    countElement.classList.add('updated');
                    setTimeout(() => countElement.classList.remove('updated'), 1000);
                    btn.disabled = true;
                }
            });
        });
    }

    // Share Functionality
    const shareBtns = document.querySelectorAll('.share-btn');
    if (shareBtns) {
        shareBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const faqItem = this.closest('.faq-item');
                const question = faqItem?.querySelector('.faq-question span')?.textContent;
                const answer = faqItem?.querySelector('.faq-answer-content')?.textContent;
                
                if (question && answer) {
                    if (navigator.share) {
                        navigator.share({
                            title: 'FAQ - HuuLong Academy',
                            text: `${question}\n\n${answer}`,
                            url: window.location.href
                        });
                    } else {
                        // Fallback copy to clipboard
                        navigator.clipboard.writeText(`${question}\n\n${answer}`);
                        alert('Đã sao chép vào clipboard!');
                    }
                }
            });
        });
    }

    // Hiển thị popup khi trang web load
    // Kiểm tra xem người dùng đã chọn không hiển thị lại chưa
    const permanentlyHidden = localStorage.getItem('devNoticePermHidden');
    
    // Nếu chưa chọn không hiển thị lại, thì hiện popup
    if (!permanentlyHidden) {
        showDevNotice();
    }

    // Navbar Scroll Effect
    const navbar = document.querySelector('nav');
    const navLinks = document.querySelectorAll('.nav-link');
    const logoText = document.querySelector('.logo-text');

    function updateNavbar() {
        if (window.scrollY > 50) {
            // Khi scroll xuống
            navbar.classList.add('scrolled');
            navbar.classList.remove('glassmorphism');
            navbar.classList.add('bg-white', 'shadow-md');
            // Cập nhật màu chữ
            navLinks.forEach(link => {
                link.classList.remove('text-white', 'hover:text-pink-200');
                link.classList.add('text-gray-800', 'hover:text-blue-600');
            });
        } else {
            // Khi ở đầu trang
            navbar.classList.remove('scrolled');
            navbar.classList.add('glassmorphism');
            navbar.classList.remove('bg-white', 'shadow-md');
            // Khôi phục màu chữ ban đầu
            navLinks.forEach(link => {
                link.classList.add('text-white', 'hover:text-pink-200');
                link.classList.remove('text-gray-800', 'hover:text-blue-600');
            });
        }
    }

    // Gọi function khi scroll
    window.addEventListener('scroll', updateNavbar);
    // Gọi function khi load trang
    updateNavbar();
});

// Hiển thị popup
function showDevNotice() {
    const notice = document.getElementById('dev-notice');
    notice.classList.remove('hidden');
    setTimeout(() => {
        notice.querySelector('.transform').classList.add('scale-100');
        notice.querySelector('.transform').classList.remove('scale-95', 'opacity-0');
    }, 10);
}

// Đóng popup
function closeDevNotice(type = 'understand') {
    const notice = document.getElementById('dev-notice');
    notice.querySelector('.transform').classList.add('scale-95', 'opacity-0');
    notice.querySelector('.transform').classList.remove('scale-100');
    
    setTimeout(() => {
        notice.classList.add('hidden');
    }, 300);

    // Nếu người dùng chọn không hiển thị lại
    if (type === 'never') {
        localStorage.setItem('devNoticePermHidden', 'true');
    }
    // Nếu chọn "Đã hiểu" thì không cần lưu gì cả, popup sẽ hiện lại ở lần tải trang tiếp theo
}

// Language translations
const translations = {
    vi: {
        // Navigation
        home: "Trang Chủ",
        courses: "Khóa Học",
        about: "Về Chúng Tôi",
        blog: "Blog",
        login: "Đăng Nhập",
        register: "Đăng Ký Ngay",

        // Hero Section
        hero_title: "HuuLong Academy",
        hero_subtitle: "Kiến Tạo Tương Lai Số - Định Hình Thế Hệ GenZ",
        explore_projects: "Khám Phá Dự Án",
        github_profile: "GitHub Profile",

        // About Section
        about_title: "Về Chúng Tôi",
        about_description: "HuuLong Academy là nền tảng giáo dục công nghệ hàng đầu, tập trung vào việc đào tạo và phát triển kỹ năng cho thế hệ GenZ.",
        students: "Học viên",
        courses_count: "Khóa học",

        // Features Section
        why_choose_us: "Tại Sao Chọn Chúng Tôi?",
        practical_learning: "Học Thực Tế",
        practical_description: "Trải nghiệm học tập thực tế với các dự án từ doanh nghiệp",
        mentoring: "Mentor 1-1",
        mentoring_description: "Được hướng dẫn trực tiếp bởi các chuyên gia trong ngành",
        certification: "Chứng Chỉ",
        certification_description: "Nhận chứng chỉ có giá trị từ các đối tác doanh nghiệp",
        opportunities: "Cơ Hội",
        opportunities_description: "Kết nối trực tiếp với cơ hội việc làm từ đối tác",

        // Projects Section
        featured_projects: "Dự Án Tiêu Biểu",
        web_apps: "Ứng Dụng Web",
        web_description: "Các dự án web đa nền tảng, áp dụng công nghệ tiên tiến như React, Vue và Node.js.",
        mobile_apps: "Ứng Dụng Di Động",
        mobile_description: "Giải pháp ứng dụng di động sáng tạo sử dụng Flutter và React Native.",
        ai_projects: "Dự Án AI",
        ai_description: "Các giải pháp trí tuệ nhân tạo tiên tiến sử dụng Machine Learning và Deep Learning.",
        view_on_github: "Xem Trên GitHub",

        // Skills Section
        professional_skills: "Kỹ Năng Chuyên Môn",
        web_development: "Phát Triển Web",
        mobile_development: "Phát Triển Ứng Dụng Di Động",
        ai_ml: "AI & Machine Learning",

        // Services Section
        our_services: "Dịch Vụ Của Chúng Tôi",
        web_dev_service: "Phát Triển Web",
        web_dev_description: "Chúng tôi cung cấp dịch vụ phát triển web tùy chỉnh với công nghệ mới nhất.",
        mobile_dev_service: "Phát Triển Ứng Dụng Di Động",
        mobile_dev_description: "Giải pháp ứng dụng di động sáng tạo cho cả iOS và Android.",
        ai_service: "AI & Machine Learning",
        ai_service_description: "Chúng tôi cung cấp các giải pháp AI tiên tiến để tối ưu hóa quy trình kinh doanh.",

        // Contact Section
        contact_us: "Liên Hệ Với Chúng Tôi",
        contact_description: "Hãy để lại thông tin, chúng tôi sẽ liên hệ với bạn sớm nhất c thể.",
        address: "Hà Thọ Lộc, Hương Thuỷ, TP.Huế",
        email: "info@huulongacademy.com",

        // Footer
        about_footer: "Về Chúng Tôi",
        quick_links: "Liên Kết Nhanh",
        contact_info: "Thông Tin Liên Hệ",
        newsletter: "Đăng Ký Nhận Tin",
        newsletter_description: "Nhận thông tin mới nhất về khóa học và công nghệ",
        subscribe: "Đăng Ký",
        copyright: "© 2024 HuuLong Academy. All rights reserved.",
        //FAQ
        faq_title: "Câu Hỏi Thường Gặp",
        search_placeholder: "Tìm kiếm câu hỏi...",
        all: "Tất cả",
        general: "Chung",
        courses: "Khóa học",
        payment: "Thanh toán",
        faq_question_1: "HuuLong Academy có những khóa học nào?",
        helpful_count: "14 người thấy hữu ích",
        faq_answer_1_intro: "Chúng tôi cung cấp các khóa học về:",
        course_1: "Lập trình web (Frontend & Backend)",
        course_2: "Phát triển ứng dụng di động",
        course_3: "Trí tuệ nhân tạo & Machine Learning",
        helpful: "Hữu ích",
        share: "Chia sẻ",
        load_more: "Xem thêm câu hỏi",
        no_answer_found: "Không tìm thấy câu trả lời bạn cần?",
        contact_support: "Liên hệ hỗ trợ",
        notice_title: "Thông Báo Phát Triển",
        notice_subtitle: "Phiên bản Beta 1.0",
        notice_message: "Chào mừng bạn đến với HuuLong Academy! Chúng tôi đang trong quá trình phát triển để mang đến trải nghiệm học tập tốt nhất cho bạn.",
        notice_features: "Một số tính năng đang được hoàn thiện và sẽ sớm ra mắt trong thời gian tới. Mọi góp ý xin vui lòng liên hệ với chúng tôi qua chat hoặc email.",
        notice_remind: "Không hiển thị lại",
        notice_understand: "Đã hiểu"
    },
    en: {
        // Navigation
        home: "Home",
        courses: "Courses",
        about: "About Us",
        blog: "Blog",
        login: "Login",
        register: "Register Now",

        // Hero Section
        hero_title: "HuuLong Academy",
        hero_subtitle: "Building Digital Future - Shaping GenZ",
        explore_projects: "Explore Projects",
        github_profile: "GitHub Profile",

        // About Section
        about_title: "About Us",
        about_description: "HuuLong Academy is a leading technology education platform, focusing on training and developing skills for Generation Z.",
        students: "Students",
        courses_count: "Courses",

        // Features Section
        why_choose_us: "Why Choose Us?",
        practical_learning: "Practical Learning",
        practical_description: "Real-world learning experience with enterprise projects",
        mentoring: "1-1 Mentoring",
        mentoring_description: "Direct guidance from industry experts",
        certification: "Certification",
        certification_description: "Receive valuable certificates from business partners",
        opportunities: "Opportunities",
        opportunities_description: "Direct connection to job opportunities from partners",

        // Projects Section
        featured_projects: "Featured Projects",
        web_apps: "Web Applications",
        web_description: "Cross-platform web projects using advanced technologies like React, Vue, and Node.js.",
        mobile_apps: "Mobile Applications",
        mobile_description: "Creative mobile solutions using Flutter and React Native.",
        ai_projects: "AI Projects",
        ai_description: "Advanced artificial intelligence solutions using Machine Learning and Deep Learning.",
        view_on_github: "View on GitHub",

        // Skills Section
        professional_skills: "Professional Skills",
        web_development: "Web Development",
        mobile_development: "Mobile Development",
        ai_ml: "AI & Machine Learning",

        // Services Section
        our_services: "Our Services",
        web_dev_service: "Web Development",
        web_dev_description: "We provide custom web development services with the latest technologies.",
        mobile_dev_service: "Mobile Development",
        mobile_dev_description: "Creative mobile solutions for both iOS and Android.",
        ai_service: "AI & Machine Learning",
        ai_service_description: "We provide advanced AI solutions to optimize business processes.",

        // Contact Section
        contact_us: "Contact Us",
        contact_description: "Leave your information, we will contact you as soon as possible.",
        address: "Ha Tho Loc, Huong Thuy, Hue City",
        email: "info@huulongacademy.com",

        // Footer
        about_footer: "About Us",
        quick_links: "Quick Links",
        contact_info: "Contact Info",
        newsletter: "Newsletter",
        newsletter_description: "Get the latest updates about courses and technology",
        subscribe: "Subscribe",
        copyright: "© 2024 HuuLong Academy. All rights reserved.",
        //FAQ
        faq_title: "Frequently Asked Questions",
        search_placeholder: "Search questions...",
        all: "All",
        general: "General",
        courses: "Courses",
        payment: "Payment",
        faq_question_1: "What courses does HuuLong Academy offer?",
        helpful_count: "14 people found this helpful",
        faq_answer_1_intro: "We offer courses in:",
        course_1: "Web Development (Frontend & Backend)",
        course_2: "Mobile App Development",
        course_3: "AI & Machine Learning",
        helpful: "Helpful",
        share: "Share",
        load_more: "Load more questions",
        no_answer_found: "Couldn't find the answer you need?",
        contact_support: "Contact Support",
        notice_title: "Thông Báo Phát Triển",
        notice_subtitle: "Phiên bản Beta 1.0",
        notice_message: "Welcome to HuuLong Academy! We are in the process of developing to bring you the best learning experience.",
        notice_features: "Some features are still being finalized and will be released soon. Please feel free to contact us through chat or email for any suggestions or feedback.",
        notice_remind: "Remind me later",
        notice_understand: "I understand",
        notice_title: "Development Notice",
        notice_subtitle: "Beta Version 1.0",
        notice_message: "Welcome to HuuLong Academy! We are currently in development to bring you the best learning experience.",
        notice_features: "Some features are being finalized and will be launched soon. Please feel free to contact us via chat or email for any feedback.",
        notice_remind: "Don't show again",
        notice_understand: "I Understand"
    }
};

// Video Background Controls
document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('bgVideo');
    const soundButton = document.getElementById('soundControl');
    const soundIcon = soundButton.querySelector('i');
    const volumeSlider = document.getElementById('volumeSlider');
    const volumeControl = document.getElementById('volumeControl');

    if (video && soundButton && volumeSlider) {
        // Video starts unmuted with low volume
        video.muted = false;
        volumeSlider.value = 0.2;  // Set slider to 20%
        video.volume = volumeSlider.value;  // Set video volume to 20%
        
        // Show volume control by default since audio is playing
        volumeControl.classList.remove('hidden');
        volumeControl.classList.add('md:flex');

        // Toggle mute/unmute
        soundButton.addEventListener('click', () => {
            video.muted = !video.muted;
            updateSoundIcon();
            
            // Show/hide volume slider when unmuted/muted
            if (!video.muted) {
                volumeControl.classList.remove('hidden');
                volumeControl.classList.add('md:flex');
            } else {
                volumeControl.classList.add('hidden');
                volumeControl.classList.remove('md:flex');
            }
        });

        // Volume slider control
        volumeSlider.addEventListener('input', (e) => {
            video.volume = e.target.value;
            video.muted = false; // Unmute when volume is changed
            updateSoundIcon();
        });

        // Update sound icon based on volume and mute state
        function updateSoundIcon() {
            if (video.muted || video.volume === 0) {
                soundIcon.className = 'fas fa-volume-mute text-xl';
            } else if (video.volume < 0.5) {
                soundIcon.className = 'fas fa-volume-down text-xl';
            } else {
                soundIcon.className = 'fas fa-volume-up text-xl';
            }
        }

        // Initial icon update
        updateSoundIcon();
    }
});

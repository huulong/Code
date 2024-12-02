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
    const menuSpans = mobileMenuButton.querySelectorAll('span');
    
    let isOpen = false;
    
    mobileMenuButton.addEventListener('click', () => {
        isOpen = !isOpen;
        
        // Toggle menu visibility
        mobileMenu.classList.toggle('hidden');
        
        // Animate hamburger icon
        if (isOpen) {
            menuSpans[0].style.transform = 'rotate(45deg) translate(0.3rem, 0.3rem)';
            menuSpans[1].style.opacity = '0';
            menuSpans[2].style.transform = 'rotate(-45deg) translate(0.3rem, -0.3rem)';
        } else {
            menuSpans[0].style.transform = 'rotate(0) translate(0, 0)';
            menuSpans[1].style.opacity = '1';
            menuSpans[2].style.transform = 'rotate(0) translate(0, 0)';
        }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (isOpen && !mobileMenuButton.contains(e.target) && !mobileMenu.contains(e.target)) {
            isOpen = false;
            mobileMenu.classList.add('hidden');
            menuSpans[0].style.transform = 'rotate(0) translate(0, 0)';
            menuSpans[1].style.opacity = '1';
            menuSpans[2].style.transform = 'rotate(0) translate(0, 0)';
        }
    });
    
    // Close menu when clicking on a link
    const mobileMenuLinks = mobileMenu.querySelectorAll('a');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            isOpen = false;
            mobileMenu.classList.add('hidden');
            menuSpans[0].style.transform = 'rotate(0) translate(0, 0)';
            menuSpans[1].style.opacity = '1';
            menuSpans[2].style.transform = 'rotate(0) translate(0, 0)';
        });
    });

    // Language Switcher (Desktop & Mobile)
    const langToggle = document.getElementById('lang-toggle');
    const langDropdown = document.getElementById('lang-dropdown');
    
    if (langToggle && langDropdown) {
        let isLangOpen = false;
        
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
    
    if (mobileLangToggle && mobileLangDropdown) {
        let isMobileLangOpen = false;
        
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
});

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
        contact_description: "Hãy để lại thông tin, chúng tôi sẽ liên hệ với bạn sớm nhất có thể.",
        address: "123 Đường ABC, Quận XYZ, TP.HCM",
        email: "info@huulongacademy.com",

        // Footer
        about_footer: "Về Chúng Tôi",
        quick_links: "Liên Kết Nhanh",
        contact_info: "Thông Tin Liên Hệ",
        newsletter: "Đăng Ký Nhận Tin",
        newsletter_description: "Nhận thông tin mới nhất về khóa học và công nghệ",
        subscribe: "Đăng Ký",
        copyright: "© 2024 HuuLong Academy. All rights reserved."
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
        address: "123 ABC Street, XYZ District, HCMC",
        email: "info@huulongacademy.com",

        // Footer
        about_footer: "About Us",
        quick_links: "Quick Links",
        contact_info: "Contact Info",
        newsletter: "Newsletter",
        newsletter_description: "Get the latest updates about courses and technology",
        subscribe: "Subscribe",
        copyright: "© 2024 HuuLong Academy. All rights reserved."
    }
};
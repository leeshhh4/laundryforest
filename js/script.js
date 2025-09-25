// jQuery

$(function () {
    $("#m_link").click(function () {
        $(this).toggleClass('open');

        const currentMargin = $("#m_gnb_wrap").css('margin-left');

        if (currentMargin === '0px' || currentMargin === '0vw') {
            $("#m_gnb_wrap").css({
                'margin-left': '-50vw',
                'transition': 'margin-left 0.5s'
            });
        } else {
            $("#m_gnb_wrap").css({
                'margin-left': '0vw',
                'transition': 'margin-left 0.5s'
            });
        }
    });


    // fqa
    $(".answer").hide();
    $(".question").click(function () {
        $(this).next().slideToggle()
        $(this).children().children('img').toggleClass('turn')
    });
});



// -------------------------------------------------------------
// JavaScript
// -------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {

    const allNavLinks = document.querySelectorAll('.gnb a, .m_gnb a');

    allNavLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            // 모든 메뉴 항목에서 active 클래스 제거
            document.querySelectorAll('.gnb li, .m_gnb li').forEach(item => {
                item.classList.remove('active');
            });

            // 클릭된 메뉴 항목에 active 클래스 추가
            const parentLi = this.closest('li');
            if (parentLi) {
                parentLi.classList.add('active');
            }

            // 부드러운 스크롤 이동
            const targetId = this.getAttribute('href').split('#')[1];
            if (targetId) {
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            }

            // 모바일 메뉴 닫기 (선택 사항)
            $("#m_gnb_wrap").css({
                'margin-left': '0vw',
                'transition': 'margin-left 0.5s'
            });
        });
    });

    // graph anmation
    const graphWrap = document.querySelector('.graph_wrap');
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    observer.observe(graphWrap);


    // city
    const districts = {
        'city': ['구/군'],
        'seoul': ['강남구', '강동구', '강북구', '강서구', '관악구', '광진구', '구로구', '금천구', '노원구', '도봉구', '동대문구', '동작구', '마포구', '서대문구', '서초구', '성동구', '성북구', '송파구', '양천구', '영등포구', '용산구', '은평구', '종로구', '중구', '중랑구'],
        'busan': ['강서구', '금정구', '기장군', '남구', '동구', '동래구', '부산진구', '북구', '사상구', '사하구', '서구', '수영구', '연제구', '영도구', '중구', '해운대구'],
        'daegu': ['남구', '달서구', '달성군', '동구', '북구', '서구', '수성구', '중구'],
        'incheon': ['강화군', '계양구', '남동구', '동구', '미추홀구', '부평구', '서구', '연수구', '옹진군', '중구'],
        'gwanju': ['광산구', '남구', '동구', '북구', '서구'],
        'ulsan': ['남구', '동구', '북구', '울주군', '중구'],
        'ggd': ['가평군', '고양시', '과천시', '광명시', '광주시', '구리시', '군포시', '김포시', '남양주시', '동두천시', '부천시', '성남시', '수원시', '시흥시', '안산시', '안성시', '안양시', '양주시', '양평군', '여주시', '연천군', '오산시', '용인시', '의왕시', '의정부시', '이천시', '파주시', '평택시', '포천시', '하남시', '화성시'],
        'chungcheong': ['계룡시', '공주시', '금산군', '논산시', '당진시', '보령시', '부여군', '서산시', '서천군', '아산시', '예산군', '천안시', '청양군', '태안군', '홍성군', '청주시', '충주시', '제천시', '보은군', '옥천군', '영동군', '증평군', '진천군', '괴산군', '음성군', '단양군'],
        'gyeongsang': ['경산시', '경주시', '고령군', '구미시', '김천시', '문경시', '봉화군', '상주시', '성주군', '안동시', '영덕군', '영양군', '영주시', '영천시', '예천군', '울릉군', '울진군', '의성군', '청도군', '청송군', '칠곡군', '포항시', '거제시', '거창군', '김해시', '남해군', '밀양시', '산청군', '양산시', '의령군', '진주시', '창녕군', '창원시', '통영시', '하동군', '함안군', '함양군', '합천군'],
        'jeolla': ['강진군', '고흥군', '곡성군', '광양시', '구례군', '나주시', '담양군', '목포시', '무안군', '보성군', '순천시', '신안군', '여수시', '영광군', '영암군', '완도군', '장성군', '장흥군', '진도군', '함평군', '해남군', '화순군', '고창군', '군산시', '김제시', '남원시', '무주군', '부안군', '순창군', '완주군', '익산시', '임실군', '장수군', '전주시', '정읍시', '진안군'],
        'gangwon': ['강릉시', '고성군', '동해시', '삼척시', '속초시', '양구군', '양양군', '영월군', '원주시', '인제군', '정선군', '철원군', '춘천시', '태백시', '평창군', '홍천군', '화천군', '횡성군'],
        'jeju': ['서귀포시', '제주시']
    };
    const OpenedCity = document.getElementById('OpenedCity');
    const OpenedDistrict = document.getElementById('Openeddistrict');
    OpenedCity.addEventListener('change', (event) => {
        const selectedCity = event.target.value;
        const districtList = districts[selectedCity] || [];
        OpenedDistrict.innerHTML = '';
        districtList.forEach(district => {
            const option = document.createElement('option');
            option.value = district;
            option.textContent = district;
            OpenedDistrict.appendChild(option);
        });
    });


    // popup
    const openPopupButton = document.querySelector('p.enter');
    const closePopupButton = document.querySelector('p.ok');
    const popup = document.querySelector('.s6_popup');
    openPopupButton.addEventListener('click', () => {
        popup.style.display = 'block';
    });
    closePopupButton.addEventListener('click', () => {
        popup.style.display = 'none';
    });
});


// -------------------------------------------------------------
// scroll
// -------------------------------------------------------------
window.addEventListener('scroll', function () {
    // top btn, bottom bar fixed
    const topBtn = document.getElementById('top_btn');
    const bottomBar = document.getElementById('bottom_bar');
    const scrollPosition = window.scrollY;
    if (scrollPosition > 400) {
        topBtn.classList.add('show');
        bottomBar.classList.add('show');
    } else {
        topBtn.classList.remove('show');
        bottomBar.classList.remove('show');
    }

    // header scrolled
    const header = document.getElementById('header');
    const headerLogo = document.querySelector('.logo img'); // h1 .logo 안의 img 선택

    if (scrollPosition > 900) {
        header.classList.add('scrolled');
        // 스크롤 시 로고 이미지 변경
        headerLogo.src = 'images/nav_visual/logo_b.svg';
    } else {
        header.classList.remove('scrolled');
        // 스크롤을 되돌리면 원래 로고 이미지로 복구
        headerLogo.src = 'images/nav_visual/logo.svg';
    }

    const sections = document.querySelectorAll('#visual_wrap, #sec01, #sec02, #sec04, #sec05, #sec08');
    const gnbLis = document.querySelectorAll('.gnb li');
    const mGnbLis = document.querySelectorAll('.m_gnb li');

    let currentSectionId = '';
    const headerHeight = 70;

    sections.forEach(section => {
        const sectionTop = section.offsetTop - headerHeight;
        if (window.scrollY >= sectionTop) {
            currentSectionId = section.getAttribute('id');
        }
    });

    // GNB 메뉴 활성화 로직
    gnbLis.forEach(li => {
        li.classList.remove('active');
        const link = li.querySelector('a');
        if (link && link.getAttribute('href').includes(currentSectionId)) {
            li.classList.add('active');
        }
    });

    // 모바일 GNB 메뉴 활성화 로직
    mGnbLis.forEach(li => {
        li.classList.remove('active');
        const link = li.querySelector('a');
        if (link && link.getAttribute('href').includes(currentSectionId)) {
            li.classList.add('active');
        }
    });
});

// -------------------------------------------------------------
// swiper slide
// -------------------------------------------------------------
var swiper = new Swiper(".mySwiper", {
    slidesPerView: 4,
    spaceBetween: 30,
    

    breakpoints: {
        1280: {
            slidesPerView: 4,
            spaceBetween: 20
        },
        1000: {
            slidesPerView: 3,
            spaceBetween: 20
        },
        700: {
            slidesPerView: 2,
            spaceBetween: 10
        },
        320: {
            slidesPerView: 1,
            spaceBetween: 10
        }
    }, 

    centeredSlides: true,
    loop: true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
});



// -------------------------------------------------------------
// 라이브러리 코드
// -------------------------------------------------------------




// map
kakao.maps.load(() => {
    const container = document.getElementById('map');
    const options = {
        center: new kakao.maps.LatLng(35.1011311, 129.0264028),
        level: 3
    };
    const map = new kakao.maps.Map(container, options);

    const stores = [
        { name: '부산남포점', latlng: new kakao.maps.LatLng(35.1011311, 129.0264028) },
        { name: '부산시청점', latlng: new kakao.maps.LatLng(35.176467, 129.076611) },
        { name: '서면1호점', latlng: new kakao.maps.LatLng(35.158584, 129.060134) }
    ];

    stores.forEach(store => {
        const marker = new kakao.maps.Marker({
            map: map,
            position: store.latlng,
            title: '빨래숲 ' + store.name
        });
    });

    const storeListItems = document.querySelectorAll('.map_store li');
    storeListItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            const position = stores[index].latlng;
            map.panTo(position);
        });
    });
});
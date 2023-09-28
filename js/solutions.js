let selectedService = 1;
let data = []



let lang;
if (localStorage.getItem('selectedLanguage')) {
  lang = localStorage.getItem('selectedLanguage');
  switchLanguage(lang);
} else {
  lang = 'en';
  localStorage.setItem('selectedLanguage', 'en');
  switchLanguage(lang);
}
function switchLanguage(langCode) {
  localStorage.setItem('selectedLanguage',langCode);
  lang = langCode;
  if(langCode == 'ar') {
    document.getElementById("home-nav-item").innerHTML = 'الرئسية';
    document.getElementById("about-nav-item").innerHTML = 'من نحن';
    document.getElementById("solution-nav-item").innerHTML = 'حلول';
    document.getElementById("service-nav-item").innerHTML = 'الخدمات';
    document.getElementById("contact-nav-item").innerHTML = 'التواصل';
    document.getElementById("download-nav-item").innerHTML = 'تنزيل';
    document.getElementById("lang-nav-item").innerHTML = 'اللغه';

  
  } else{
    document.getElementById("home-nav-item").innerHTML = 'Home';
    document.getElementById("about-nav-item").innerHTML = 'About us ';
    document.getElementById("solution-nav-item").innerHTML = 'Solutions';
    document.getElementById("service-nav-item").innerHTML = 'Services';
    document.getElementById("contact-nav-item").innerHTML = 'contacts';
    document.getElementById("download-nav-item").innerHTML = 'downloads';
    document.getElementById("lang-nav-item").innerHTML = 'Lang';
    
  }

  if ($('.mobile-menu').length) {

var mobileMenuContent = $('.main-header .main-menu .navigation').html();
$('.mobile-menu .navigation').children().remove();
$('.sticky-header .navigation').children().remove();

$('.mobile-menu .navigation').append(mobileMenuContent);
$('.sticky-header .navigation').append(mobileMenuContent);
$('.mobile-menu .close-btn').on('click', function () {
$('body').removeClass('mobile-menu-visible');
});

//Dropdown Button
$('.mobile-menu li.dropdown .dropdown-btn').on('click', function () {
$(this).prev('ul').slideToggle(500);
$(this).toggleClass('active');
});

//Menu Toggle Btn
$('.mobile-nav-toggler').on('click', function () {
$('body').addClass('mobile-menu-visible');
});

//Menu Toggle Btn
$('.mobile-menu .menu-backdrop, .mobile-menu .close-btn').on('click', function () {
$('body').removeClass('mobile-menu-visible');
});

}
    

getData();
}

function pageContent(id) {
  const item = data.find(item => item.id === (id || selectedService));
  _('h1#title').innerHTML = item.title;
  document.title = item.title;
  const features = item.features.map(item => `<li class='col-6 col-md-6'><i class="fas fa-check"></i>${item}</li>`).join('');
  return `<div class="services-details__content">
            <img src="img/solutions/view-solution.png" alt="" style='width:100%;height:100%;'/>
            <h3 class="mt-4 text-center">${item.title}</h3>
            <p>${item.desc}</p>
            <ul class='row'>
              ${features}
            </ul>
        </div>`;
}

function getData(){
  fetch(`assets/data/solutions/${lang}.json`).then(res => res.json()).then(res => {
    let tab = '';
    let content = '';
    data = res;
    res.forEach((item, index) => {
      tab +=
        `<li><a href="javascript:void(0)" ${item.id === selectedService ? 'class="current"' : ''} onclick="selectTab( ${item.id},event)"
          ><i class="fas fa-angle-right"></i><span>${item.title}</span></a></li>`;
    });
    _('ul#service-menu').innerHTML = tab;
    _('div#services_details_content').innerHTML = pageContent(selectedService);
  });
}

getData();
function selectTab(item, event) {
  selectedService = item;

  _('ul#service-menu').querySelectorAll('a').forEach(item => {
    item.classList.remove('current');
  });
  event.target.classList.add('current');

  _('div#services_details_content').innerHTML = pageContent(item);
}
let selectedService = 1;
let data = []

function pageContent(id) {
  const item = data.find(item => item.id === (id || selectedService));
  _('h1#title').innerHTML = item.title;
  document.title = item.title;
  return `<div class="services-details__content">
          <img src="${item.img}" alt="" style='width:100%;height:100%;'/>
          <h3 class="mt-4">${item.title}</h3>
          <p>${item.desc}</p>
        </div>`;
}
fetch('data/services.json').then(res => res.json()).then(res => {
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

function selectTab(item, event) {
  selectedService = item;

  _('ul#service-menu').querySelectorAll('a').forEach(item => {
    item.classList.remove('current');
  });
  event.target.classList.add('current');

  _('div#services_details_content').innerHTML = pageContent(item);
}
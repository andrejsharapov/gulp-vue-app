Vue.component('site-skill-list', {
    props: [ 'skills' ],
    template: `<div id="skillsLanguage" v-for="(item, index) in skills" :key="index"><div class="skill-container" v-for="(i, index) in item.banners" :key="index"><p class="lang_name">{{ i.langName }}</p><div class="skill-block"><img :src="'/static/skills/' + i.image" loading='lazy' :alt="i.langName"></div></div></div>`,
});

Vue.component('projects-list', {
    props: [ 'banners', 'selected' ],
    template: `<div class="grid-projects"><template v-for="(cd, index) in banners" :key="index"><div class="project"><h3>HTML5 Баннер <sup>{{ cd.title }}</sup></h3><div><strong>Дата:</strong> {{ cd.date }}</div><div><strong>Дедлайн:</strong> {{ cd.deadline }}</div><div class="project-image" :class="cd.cls"><iframe :src="cd.src" :id="cd.id" :class="cd.cls" frameborder="0" allowfullscreen="allowfullscreen"></div><div class="project-about"><small class="project-caption text-center">{{ cd.title }}<template v-if="cd.about"> — {{ cd.about }}</template></small></div></div></template></div>`
});
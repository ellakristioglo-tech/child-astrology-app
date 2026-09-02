(function consultationMethodFix(){
  'use strict';

  const STORAGE_KEY='childAstrologyConsultationHistory';
  const SELECTED_KEY='childAstrologyConsultationChild';
  const SIGNS=['aries','taurus','gemini','cancer','leo','virgo','libra','scorpio','sagittarius','capricorn','aquarius','pisces'];
  const LANGS=['ru','ua','en','nl'];

  const COPY={
    ru:{
      headings:{what:'Что отвечает на ваш вопрос',basis:'На чём основан ответ',try:'Что попробовать',watch:'На что обратить внимание'},
      emotion:{what:'Если ребёнку трудно успокоиться, сначала помогите снизить напряжение, а уже потом обсуждайте поведение. Это соответствует 6-шаговому методу: наблюдение → контакт → понимание → поддержка.',basis:'Для эмоциональной реакции используем Луну как дополнительную астрологическую подсказку, а реальные наблюдения остаются главным ориентиром.',try:['Назовите чувство коротко и спокойно.','Дайте безопасный способ разрядки: движение, вода, тишина или объятие, если ребёнку это подходит.','После успокоения обсудите только один следующий шаг.'],watch:'Если реакции резко усиливаются, долго не проходят или мешают обычной жизни, не объясняйте это только картой.'},
      fear:{what:'Тревога требует не «успокоить любой ценой», а понять, чего именно ребёнок боится: события, неизвестности, ошибки или реакции взрослого.',basis:'По 6-шаговому методу сначала наблюдаем и создаём безопасный контакт. Луна помогает выбрать более мягкий способ поддержки, но не определяет причину тревоги.',try:['Спросите: «Что именно сейчас самое страшное?»','Заранее проговорите понятный план действий.','Дайте маленький безопасный опыт вместо фразы «не бойся».'],watch:'Устойчивая тревога может быть связана со стрессом, перегрузкой, конфликтами или здоровьем и требует реального наблюдения.'},
      communication:{what:'Для разговора важнее не количество слов, а форма подачи. Меркурий в методике используется как подсказка к тому, как ребёнку легче слышать и обрабатывать информацию.',basis:'Ответ опирается на раздел «Обучение по Меркурию» и 6-шаговый метод общения без оценки и давления.',try:['Начните с наблюдения, а не обвинения.','Говорите по одной мысли за раз.','Задайте один вопрос и дайте время ответить.'],watch:'Если ребёнок закрывается, сначала восстановите ощущение безопасности разговора, а причину обсуждайте позже.'},
      health:{what:'По натальной карте нельзя определить болезнь или диагноз. В методике здесь полезно только наблюдение за изменениями привычного состояния ребёнка.',basis:'Используем шаг «Наблюдать»: сон, аппетит, энергия, боль, температура, поведение и длительность изменений.',try:['Записывайте изменения 7–14 дней, если ситуация не срочная.','Отмечайте, когда и после чего появляется симптом.','При повторении или ухудшении покажите записи врачу.'],watch:'При сильной боли, затруднённом дыхании, судорогах, нарушении сознания или резком ухудшении нужна медицинская помощь.'},
      learningLead:'По разделу «Обучение по Меркурию» для этого положения:',
      sportLead:'По разделу «Спорт по Марсу» для этого положения:',
      tipsLead:'Из «10 советов родителям» дополнительно подходит:',
      suitable:'Подходящие варианты',avoid:'Лучше избегать',qualities:'Сильные стороны',learningHow:'Как лучше объяснять',learningTips:'Практический подход'
    },
    ua:{
      headings:{what:'Що відповідає на ваше запитання',basis:'На чому ґрунтується відповідь',try:'Що спробувати',watch:'На що звернути увагу'},
      emotion:{what:'Якщо дитині важко заспокоїтися, спочатку допоможіть знизити напруження, а вже потім обговорюйте поведінку. Це відповідає 6-кроковому методу: спостереження → контакт → розуміння → підтримка.',basis:'Для емоційної реакції використовуємо Місяць як додаткову астрологічну підказку, а реальні спостереження залишаються головним орієнтиром.',try:['Коротко й спокійно назвіть почуття.','Дайте безпечний спосіб розрядки: рух, вода, тиша або обійми, якщо це підходить дитині.','Після заспокоєння обговоріть лише один наступний крок.'],watch:'Якщо реакції різко посилюються, довго не минають або заважають звичайному життю, не пояснюйте це лише картою.'},
      fear:{what:'Тривога потребує не «заспокоїти будь-якою ціною», а зрозуміти, чого саме дитина боїться: події, невідомості, помилки чи реакції дорослого.',basis:'За 6-кроковим методом спочатку спостерігаємо й створюємо безпечний контакт. Місяць допомагає обрати м’якший спосіб підтримки, але не визначає причину тривоги.',try:['Запитайте: «Що саме зараз найстрашніше?»','Заздалегідь проговоріть зрозумілий план дій.','Дайте маленький безпечний досвід замість фрази «не бійся».'],watch:'Стійка тривога може бути пов’язана зі стресом, перевантаженням, конфліктами або здоров’ям і потребує реального спостереження.'},
      communication:{what:'Для розмови важливіша не кількість слів, а форма подачі. Меркурій у методиці використовується як підказка до того, як дитині легше чути й обробляти інформацію.',basis:'Відповідь спирається на розділ «Навчання за Меркурієм» і 6-кроковий метод спілкування без оцінювання та тиску.',try:['Почніть зі спостереження, а не звинувачення.','Говоріть по одній думці за раз.','Поставте одне запитання й дайте час відповісти.'],watch:'Якщо дитина закривається, спочатку відновіть відчуття безпеки в розмові, а причину обговорюйте пізніше.'},
      health:{what:'За натальною картою не можна визначити хворобу чи діагноз. У методиці тут корисне лише спостереження за змінами звичного стану дитини.',basis:'Використовуємо крок «Спостерігати»: сон, апетит, енергія, біль, температура, поведінка й тривалість змін.',try:['Записуйте зміни 7–14 днів, якщо ситуація не термінова.','Відмічайте, коли й після чого з’являється симптом.','Якщо це повторюється або погіршується, покажіть записи лікарю.'],watch:'За сильної болі, утрудненого дихання, судом, порушення свідомості або різкого погіршення потрібна медична допомога.'},
      learningLead:'За розділом «Навчання за Меркурієм» для цього положення:',
      sportLead:'За розділом «Спорт за Марсом» для цього положення:',
      tipsLead:'Із «10 порад батькам» додатково підходить:',
      suitable:'Підходящі варіанти',avoid:'Краще уникати',qualities:'Сильні сторони',learningHow:'Як краще пояснювати',learningTips:'Практичний підхід'
    },
    en:{
      headings:{what:'Answer to your question',basis:'What the answer is based on',try:'What to try',watch:'What to watch'},
      emotion:{what:'When a child struggles to calm down, reduce tension first and discuss behaviour afterwards. This follows the 6-step method: observe → connect → understand → support.',basis:'The Moon is used only as an additional reflection cue. Real-life observation remains the main guide.',try:['Name the feeling briefly and calmly.','Offer a safe release such as movement, water, quiet time or a hug if welcomed.','After the child settles, discuss only one next step.'],watch:'If reactions become much stronger, last a long time or interfere with daily life, do not explain them only through the chart.'},
      fear:{what:'Anxiety is not best handled by trying to stop it immediately. First clarify what the child fears: the event, uncertainty, making a mistake or an adult’s reaction.',basis:'The 6-step method starts with observation and safe contact. The Moon may suggest a gentler support style but does not identify the cause of anxiety.',try:['Ask: “What feels scariest right now?”','Explain the plan in advance.','Offer one small safe experience instead of saying “don’t be afraid”.'],watch:'Persistent anxiety can relate to stress, overload, conflict or health and should be observed in real life.'},
      communication:{what:'In conversation, the form of the message matters more than the number of words. Mercury is used as a cue for how the child may process information more easily.',basis:'This answer follows the “Learning by Mercury” guide and the 6-step method of communication without judgement or pressure.',try:['Start with an observation, not an accusation.','Give one idea at a time.','Ask one question and allow time to answer.'],watch:'If the child shuts down, restore safety in the conversation first and discuss causes later.'},
      health:{what:'A birth chart cannot identify illness or diagnosis. The useful method here is observation of changes from the child’s usual state.',basis:'Use the “Observe” step: sleep, appetite, energy, pain, temperature, behaviour and duration of changes.',try:['Keep notes for 7–14 days when the situation is not urgent.','Record when a symptom appears and what happened around it.','If it repeats or worsens, show the notes to a clinician.'],watch:'Severe pain, breathing difficulty, seizures, altered consciousness or sudden deterioration require medical help.'},
      learningLead:'From the “Learning by Mercury” guide for this placement:',
      sportLead:'From the “Sports by Mars” guide for this placement:',
      tipsLead:'From “10 tips for parents”, this also fits:',
      suitable:'Suitable options',avoid:'Better to avoid',qualities:'Strengths',learningHow:'How to explain',learningTips:'Practical approach'
    },
    nl:{
      headings:{what:'Antwoord op je vraag',basis:'Waarop het antwoord is gebaseerd',try:'Wat je kunt proberen',watch:'Waarop je kunt letten'},
      emotion:{what:'Als een kind moeilijk tot rust komt, help dan eerst de spanning te verlagen en bespreek gedrag pas daarna. Dit volgt de 6-stappenmethode: observeren → verbinden → begrijpen → ondersteunen.',basis:'De Maan wordt alleen als extra reflectiepunt gebruikt. Waarnemingen in het dagelijks leven blijven leidend.',try:['Benoem het gevoel kort en rustig.','Bied een veilige ontlading: bewegen, water, rust of een knuffel als het kind dat prettig vindt.','Bespreek na het kalmeren slechts één volgende stap.'],watch:'Als reacties veel sterker worden, lang aanhouden of het dagelijks leven verstoren, verklaar dit dan niet alleen vanuit de horoscoop.'},
      fear:{what:'Angst vraagt niet om “zo snel mogelijk stoppen”, maar om te begrijpen waarvoor het kind precies bang is: de gebeurtenis, onzekerheid, een fout of de reactie van een volwassene.',basis:'De 6-stappenmethode begint met observeren en veilig contact. De Maan kan een zachtere ondersteuningsstijl suggereren maar bepaalt niet de oorzaak van angst.',try:['Vraag: “Wat voelt nu het spannendst?”','Leg het plan vooraf duidelijk uit.','Bied een kleine veilige ervaring in plaats van “je hoeft niet bang te zijn”.'],watch:'Aanhoudende angst kan samenhangen met stress, overbelasting, conflicten of gezondheid en vraagt om echte observatie.'},
      communication:{what:'Bij een gesprek is de vorm belangrijker dan de hoeveelheid woorden. Mercurius wordt gebruikt als aanwijzing voor hoe een kind informatie mogelijk makkelijker verwerkt.',basis:'Dit antwoord volgt “Leren via Mercurius” en de 6-stappenmethode voor communicatie zonder oordeel of druk.',try:['Begin met een waarneming, niet met een beschuldiging.','Geef één gedachte tegelijk.','Stel één vraag en geef tijd om te antwoorden.'],watch:'Als het kind dichtklapt, herstel eerst de veiligheid in het gesprek en bespreek de oorzaak later.'},
      health:{what:'Een geboortehoroscoop kan geen ziekte of diagnose vaststellen. De bruikbare methode hier is alleen het observeren van veranderingen ten opzichte van de normale toestand van het kind.',basis:'Gebruik de stap “Observeren”: slaap, eetlust, energie, pijn, temperatuur, gedrag en duur van veranderingen.',try:['Houd 7–14 dagen notities bij als de situatie niet dringend is.','Noteer wanneer een klacht optreedt en wat eraan voorafging.','Als het terugkomt of erger wordt, laat de notities aan een arts zien.'],watch:'Ernstige pijn, ademhalingsproblemen, stuipen, veranderd bewustzijn of plotselinge verslechtering vereisen medische hulp.'},
      learningLead:'Uit de methode “Leren via Mercurius” voor deze stand:',
      sportLead:'Uit de methode “Sport via Mars” voor deze stand:',
      tipsLead:'Uit “10 tips voor ouders” past ook:',
      suitable:'Geschikte opties',avoid:'Beter vermijden',qualities:'Sterke kanten',learningHow:'Hoe uitleggen',learningTips:'Praktische aanpak'
    }
  };

  const currentLang=()=>LANGS.includes(window.currentLanguage)?window.currentLanguage:(LANGS.includes(localStorage.getItem('language'))?localStorage.getItem('language'):'nl');
  const escText=(v)=>String(v??'');
  const selectedId=()=>document.getElementById('consultantChild')?.value||localStorage.getItem(SELECTED_KEY)||'';
  const getHistory=(id)=>{try{const all=JSON.parse(localStorage.getItem(STORAGE_KEY)||'{}');return Array.isArray(all[String(id)])?all[String(id)]:[];}catch(_){return[];}};
  const saveHistory=(id,items)=>{let all={};try{all=JSON.parse(localStorage.getItem(STORAGE_KEY)||'{}')||{};}catch(_){}all[String(id)]=items.slice(-30);localStorage.setItem(STORAGE_KEY,JSON.stringify(all));};

  function childById(id){try{return children.find(c=>String(c.id)===String(id));}catch(_){return null;}}
  function chartFor(child){try{return window.calculateChildNatalChart?.(child,false)||null;}catch(_){return null;}}
  function signKey(chart,planet){const index=chart?.positions?.[planet]?.sign;return Number.isInteger(index)?SIGNS[index]:null;}
  function childTip(lang,chart){const key=signKey(chart,'Sun');const entry=key&&typeof tipsTranslations!=='undefined'?tipsTranslations?.[lang]?.[key]:null;return entry?.tips?.[0]||'';}

  function standardText(lang,topic,chart){
    const c=COPY[lang]||COPY.nl;
    const block=c[topic];
    const extra=childTip(lang,chart);
    return `${c.headings.what}\n${block.what}\n\n${c.headings.basis}\n${block.basis}${extra?`\n\n${c.tipsLead}\n${extra}`:''}\n\n${c.headings.try}\n${block.try.map((x,i)=>`${i+1}. ${x}`).join('\n')}\n\n${c.headings.watch}\n${block.watch}`;
  }

  function learningText(lang,chart){
    const c=COPY[lang]||COPY.nl;
    const key=signKey(chart,'Mercury');
    const entry=key&&typeof learningTranslations!=='undefined'?learningTranslations?.[lang]?.[key]:null;
    if(!entry)return standardText(lang,'communication',chart);
    const extra=childTip(lang,chart);
    return `${c.headings.what}\n${c.learningLead}\n${entry.title}\n\n${c.learningHow}\n${entry.how}\n\n${c.learningTips}\n${entry.tips}${extra?`\n\n${c.tipsLead}\n${extra}`:''}`;
  }

  function sportText(lang,chart){
    const c=COPY[lang]||COPY.nl;
    const key=signKey(chart,'Mars');
    const entry=key&&typeof sportsTranslations!=='undefined'?sportsTranslations?.[lang]?.[key]:null;
    if(!entry)return standardText(lang,'emotion',chart);
    return `${c.headings.what}\n${c.sportLead}\n${entry.title}\n\n${c.suitable}\n${entry.suitable}\n\n${c.qualities}\n${entry.qualities}\n\n${c.avoid}\n${entry.avoid}`;
  }

  function answerFor(topic,lang,chart){
    if(topic==='learning')return learningText(lang,chart);
    if(topic==='sport')return sportText(lang,chart);
    if(topic==='communication'){
      const c=COPY[lang]||COPY.nl;
      const base=standardText(lang,'communication',chart);
      const key=signKey(chart,'Mercury');
      const entry=key&&typeof learningTranslations!=='undefined'?learningTranslations?.[lang]?.[key]:null;
      return entry?`${base}\n\n${c.learningLead}\n${entry.title}\n${entry.tips}`:base;
    }
    return standardText(lang,topic,chart);
  }

  function classify(question){
    const q=String(question||'').toLowerCase();
    const groups=[
      ['fear',/трев|страх|боится|боїть|трив|ляка|anxi|fear|afraid|angst|bang/],
      ['learning',/уч|учеб|школ|урок|объясн|материал|обуч|навчан|поясн|матеріал|уваг|learn|school|study|explain|material|homework|leren|uitleg|lesstof|aandacht/],
      ['sport',/спорт|движ|секц|трен|рух|sport|movement|training|beweging/],
      ['communication',/говор|общ|слуш|разгов|спілк|слух|розмов|talk|communicat|listen|prat|luister|contact|gesprek/],
      ['emotion',/эмоц|злит|плач|успоко|истер|почут|плак|заспок|emotion|angry|calm|cry|boos|kalm|huil|rust/],
      ['health',/самочув|самопочут|wellbeing|welzijn/]
    ];
    return groups.find(([,re])=>re.test(q))?.[0]||'';
  }

  function shouldLeaveToSafety(question){
    const q=String(question||'').toLowerCase();
    return /самоуб|суицид|насили|не дыш|задых|судорог|діагноз|диагноз|лечен|лікуван|лекар|ліки|аутиз|adhd|сдвг|темпера|боль|біль|сып|висип|каш|рвот|блюв|тошнот|нудот|паспорт|виза|суд|опек|право на|адвокат|suicid|abuse|cannot breathe|seizure|diagnos|treat|medicat|fever|pain|rash|cough|vomit|passport|visa|court|custody|zelfmoord|geweld|ademt niet|stuip|diagnos|behandel|geneesmiddel|koorts|pijn|uitslag|hoest|braken|paspoort|visum|rechtbank|voogd/.test(q);
  }

  function submit(topic,question){
    const id=selectedId();
    const child=childById(id);
    if(!id||!child||!topic||!question)return false;
    const chart=chartFor(child);
    if(!chart)return false;
    const lang=currentLang();
    const createdAt=new Date().toISOString();
    const history=getHistory(id);
    history.push(
      {role:'user',text:question,createdAt},
      {role:'method',type:'method-guidance-v3',topic,language:lang,text:answerFor(topic,lang,chart),createdAt}
    );
    saveHistory(id,history);
    document.dispatchEvent(new CustomEvent('app:consultation-question',{detail:{topic}}));
    const input=document.getElementById('consultantQuestion');if(input)input.value='';
    window.showSection?.('consultation');
    return true;
  }

  document.addEventListener('click',(event)=>{
    const chip=event.target.closest('.consultant-chip');
    if(chip){
      const topic=chip.dataset.topic;
      const question=chip.textContent.trim();
      if(['emotion','fear','learning','communication','sport','health'].includes(topic)){
        event.preventDefault();event.stopImmediatePropagation();submit(topic,question);
      }
      return;
    }
    const send=event.target.closest('#consultantSend');
    if(send){
      const input=document.getElementById('consultantQuestion');
      const question=input?.value.trim()||'';
      if(!question||shouldLeaveToSafety(question))return;
      const topic=classify(question);
      if(topic){event.preventDefault();event.stopImmediatePropagation();submit(topic,question);}
    }
  },true);

  document.addEventListener('keydown',(event)=>{
    if(event.target?.id!=='consultantQuestion'||event.key!=='Enter'||!(event.ctrlKey||event.metaKey))return;
    const question=event.target.value.trim();
    if(!question||shouldLeaveToSafety(question))return;
    const topic=classify(question);
    if(topic){event.preventDefault();event.stopImmediatePropagation();submit(topic,question);}
  },true);
})();

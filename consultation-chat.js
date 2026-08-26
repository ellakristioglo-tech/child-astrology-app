(function () {
  'use strict';

  const STORAGE_KEY = 'childAstrologyConsultationHistory';
  const selectedKey = 'childAstrologyConsultationChild';
  const SIGN_ELEMENTS = ['fire','earth','air','water','fire','earth','air','water','fire','earth','air','water'];
  const SIGN_MODALITIES = ['cardinal','fixed','mutable','cardinal','fixed','mutable','cardinal','fixed','mutable','cardinal','fixed','mutable'];
  const PLANET_BY_TOPIC = {emotion:'Moon',fear:'Moon',learning:'Mercury',communication:'Mercury',sport:'Mars',health:'Moon',other:'Sun'};
  const SIGN_NAMES = {
    ru:['Овен','Телец','Близнецы','Рак','Лев','Дева','Весы','Скорпион','Стрелец','Козерог','Водолей','Рыбы'],
    ua:['Овен','Телець','Близнюки','Рак','Лев','Діва','Терези','Скорпіон','Стрілець','Козоріг','Водолій','Риби'],
    en:['Aries','Taurus','Gemini','Cancer','Leo','Virgo','Libra','Scorpio','Sagittarius','Capricorn','Aquarius','Pisces'],
    nl:['Ram','Stier','Tweelingen','Kreeft','Leeuw','Maagd','Weegschaal','Schorpioen','Boogschutter','Steenbok','Waterman','Vissen']
  };
  const PLANETS = {
    ru:{Sun:'Солнце',Moon:'Луна',Mercury:'Меркурий',Venus:'Венера',Mars:'Марс',Saturn:'Сатурн'},
    ua:{Sun:'Сонце',Moon:'Місяць',Mercury:'Меркурій',Venus:'Венера',Mars:'Марс',Saturn:'Сатурн'},
    en:{Sun:'Sun',Moon:'Moon',Mercury:'Mercury',Venus:'Venus',Mars:'Mars',Saturn:'Saturn'},
    nl:{Sun:'Zon',Moon:'Maan',Mercury:'Mercurius',Venus:'Venus',Mars:'Mars',Saturn:'Saturnus'}
  };
  const ASPECTS = {
    ru:{conjunction:'соединение',sextile:'секстиль',square:'квадрат',trine:'трин',opposition:'оппозиция'},
    ua:{conjunction:'з’єднання',sextile:'секстиль',square:'квадрат',trine:'трин',opposition:'опозиція'},
    en:{conjunction:'conjunction',sextile:'sextile',square:'square',trine:'trine',opposition:'opposition'},
    nl:{conjunction:'conjunctie',sextile:'sextiel',square:'vierkant',trine:'driehoek',opposition:'oppositie'}
  };

  const UI = {
    ru:{
      title:'Помощник для родителя', intro:'Задайте вопрос о выбранном ребёнке. Ответ учитывает рассчитанные знаки, дома и аспекты — без Асцендента и без общих фраз.', child:'Ребёнок', noChild:'Сначала добавьте ребёнка и рассчитайте его карту.', context:'Вопросы и ответы сохраняются только на этом устройстве и не смешиваются между детьми.', emptyTitle:'С чего начать', empty:'Выберите ребёнка и задайте один конкретный вопрос. Чем точнее ситуация, тем полезнее ответ.', placeholder:'Например: почему ему трудно успокоиться после школы?', send:'Отправить', clear:'Очистить историю', personal:'Нужен личный разбор Эллы?', personalText:'Для сложной ситуации можно написать Элле напрямую. Данные ребёнка автоматически не отправляются.', whatsapp:'Написать в WhatsApp', note:'Астрология здесь используется как язык наблюдения, а не как диагноз или предсказание.', addChild:'Добавьте профиль ребёнка в разделе «Дети».', genericError:'Не удалось рассчитать карту. Проверьте дату, время и выбранный город.',
      chips:[['emotion','Как помочь успокоиться?'],['fear','Откуда может быть тревога?'],['learning','Как лучше объяснять материал?'],['communication','Как с ним разговаривать?'],['sport','Какой спорт попробовать?'],['health','Что наблюдать в самочувствии?']],
      headings:{what:'Что может происходить',why:'Почему это может проявляться',try:'Что попробовать',watch:'На что обратить внимание'},
      topics:{emotion:'эмоциональная регуляция',fear:'чувство безопасности',learning:'обучение',communication:'общение',sport:'движение и спорт',health:'самочувствие',other:'текущая ситуация'},
      element:{
        fire:'Реакция может вспыхивать быстро. Ребёнку легче вернуться в равновесие после движения и ясного следующего шага.',
        earth:'Реакция накапливается медленно. Помогают предсказуемость, телесный комфорт и время без давления.',
        air:'Ребёнок часто понимает переживание через слова, вопросы и смену точки зрения.',
        water:'Ребёнок тонко улавливает атмосферу и может долго носить чувство внутри. Сначала нужен безопасный контакт.'
      },
      actions:{
        emotion:['Сначала назовите чувство одним предложением.','Дайте 10–15 минут на подходящий телу способ разрядки.','После успокоения обсудите только один следующий шаг.'],
        fear:['Спросите, что именно пугает: событие, неизвестность или реакция взрослого.','Заранее проговорите план и что ребёнок сможет сделать сам.','Не убеждайте «не бойся» — покажите опору и маленький безопасный опыт.'],
        learning:['Давайте материал короткими блоками с одним примером.','Попросите объяснить своими словами, а не просто повторить.','Чередуйте нагрузку и короткую паузу до переутомления.'],
        communication:['Начните с наблюдения, а не оценки поведения.','Задайте один вопрос и дайте время ответить.','Границу формулируйте коротко: что нельзя, что можно и что будет дальше.'],
        sport:['Выберите две разные пробные тренировки.','Оцените не только спорт, но темп группы и тон тренера.','После занятия спросите про энергию, интерес и желание вернуться.'],
        health:['В течение 7–14 дней отмечайте сон, аппетит, энергию, боль и изменения поведения.','Записывайте длительность и обстоятельства симптома, а не объясняйте его картой.','При повторяющихся или усиливающихся симптомах покажите записи педиатру.'],
        other:['Опишите наблюдаемый факт без ярлыка.','Проверьте сон, нагрузку, чувство безопасности и недавние перемены.','Попробуйте один новый способ поддержки и оцените результат через несколько дней.']
      },
      watch:{emotion:'Если реакции становятся сильнее, дольше или мешают сну и обычной жизни, ищите причину вместе со специалистом.',fear:'Не связывайте устойчивую тревогу только с характером. Важно исключить стресс, перегрузку, травлю и причины здоровья.',learning:'Трудности обучения не означают лень. Если они устойчивы, обсудите наблюдения с учителем и профильным специалистом.',communication:'Если ребёнок резко замыкается, сначала восстановите безопасность разговора; разбор причины оставьте на потом.',sport:'Боль, головокружение, одышка или длительное ухудшение самочувствия после нагрузки требуют медицинской оценки.',health:'Натальная карта не показывает болезни. Срочная медицинская помощь нужна при затруднённом дыхании, нарушении сознания, судорогах, сильной боли или резком ухудшении.',other:'Смотрите на повторяющийся сценарий и реальные условия, а не на один отдельный эпизод.'},
      why:'В карте по этой теме заметно: {factor}{aspect}. Это не приговор, а подсказка, какой способ поддержки стоит проверить наблюдением.', aspect:', сильная связь с {planet} ({type}, орб {orb}°)', noAspect:'', house:'{house}-й дом', age:'Возраст: {age}.',
      installTitle:'Как установить приложение на телефон', ios:'iPhone / iPad', android:'Android', iosSteps:['Откройте сайт именно в Safari.','Нажмите кнопку «Поделиться» внизу экрана.','Выберите «На экран Домой».','Проверьте название Child Astrology и нажмите «Добавить».'], androidSteps:['Откройте сайт в Chrome.','Нажмите меню ⋮ в правом верхнем углу.','Выберите «Установить приложение» или «Добавить на главный экран».','Подтвердите установку.'], installHint:'После установки появится фирменная иконка. Данные остаются на этом устройстве. Если иконка старая, удалите её и установите приложение заново.', installed:'Приложение уже открыто с главного экрана.'
    },
    ua:{
      title:'Помічник для батьків', intro:'Поставте запитання про обрану дитину. Відповідь враховує розраховані знаки, будинки й аспекти — без Асцендента та загальних фраз.', child:'Дитина', noChild:'Спочатку додайте дитину та розрахуйте її карту.', context:'Запитання й відповіді зберігаються лише на цьому пристрої та не змішуються між дітьми.', emptyTitle:'З чого почати', empty:'Оберіть дитину й поставте одне конкретне запитання. Що точніша ситуація, то корисніша відповідь.', placeholder:'Наприклад: чому їй важко заспокоїтися після школи?', send:'Надіслати', clear:'Очистити історію', personal:'Потрібен особистий розбір Елли?', personalText:'У складній ситуації можна написати Еллі напряму. Дані дитини автоматично не надсилаються.', whatsapp:'Написати у WhatsApp', note:'Астрологія тут є мовою спостереження, а не діагнозом чи передбаченням.', addChild:'Додайте профіль дитини в розділі «Діти».', genericError:'Не вдалося розрахувати карту. Перевірте дату, час і вибране місто.',
      chips:[['emotion','Як допомогти заспокоїтися?'],['fear','Звідки може бути тривога?'],['learning','Як краще пояснювати матеріал?'],['communication','Як із дитиною розмовляти?'],['sport','Який спорт спробувати?'],['health','Що спостерігати в самопочутті?']],
      headings:{what:'Що може відбуватися',why:'Чому це може проявлятися',try:'Що спробувати',watch:'На що звернути увагу'}, topics:{emotion:'емоційна регуляція',fear:'відчуття безпеки',learning:'навчання',communication:'спілкування',sport:'рух і спорт',health:'самопочуття',other:'поточна ситуація'},
      element:{fire:'Реакція може спалахувати швидко. Дитині легше відновити рівновагу після руху та зрозумілого наступного кроку.',earth:'Реакція накопичується повільно. Допомагають передбачуваність, тілесний комфорт і час без тиску.',air:'Дитина часто розуміє переживання через слова, запитання та зміну погляду.',water:'Дитина тонко відчуває атмосферу й може довго тримати почуття всередині. Спочатку потрібен безпечний контакт.'},
      actions:{emotion:['Спочатку назвіть почуття одним реченням.','Дайте 10–15 хвилин на відповідний спосіб розрядки.','Після заспокоєння обговоріть лише один наступний крок.'],fear:['Запитайте, що саме лякає: подія, невідомість чи реакція дорослого.','Заздалегідь проговоріть план і що дитина зможе зробити сама.','Не переконуйте «не бійся» — покажіть опору й маленький безпечний досвід.'],learning:['Давайте матеріал короткими блоками з одним прикладом.','Попросіть пояснити своїми словами.','Чергуйте навантаження й коротку паузу до перевтоми.'],communication:['Почніть зі спостереження, а не оцінки.','Поставте одне запитання й дайте час відповісти.','Межу сформулюйте коротко: що не можна, що можна і що буде далі.'],sport:['Оберіть два різні пробні заняття.','Оцініть темп групи й тон тренера.','Після заняття запитайте про енергію, інтерес і бажання повернутися.'],health:['7–14 днів відмічайте сон, апетит, енергію, біль і зміни поведінки.','Записуйте тривалість та обставини симптому, а не пояснюйте його картою.','За повторних або сильніших симптомів покажіть записи педіатру.'],other:['Опишіть факт без ярлика.','Перевірте сон, навантаження, безпеку та недавні зміни.','Спробуйте один спосіб підтримки й оцініть результат за кілька днів.']},
      watch:{emotion:'Якщо реакції стають сильнішими, довшими або заважають сну й звичному життю, шукайте причину разом із фахівцем.',fear:'Не пояснюйте стійку тривогу лише характером. Виключіть стрес, перевантаження, булінг і причини здоров’я.',learning:'Труднощі навчання не означають лінощі. Якщо вони стійкі, обговоріть спостереження з учителем і фахівцем.',communication:'Якщо дитина різко закривається, спочатку відновіть безпеку розмови.',sport:'Біль, запаморочення, задишка або тривале погіршення після навантаження потребують медичної оцінки.',health:'Натальна карта не показує хвороби. Негайна допомога потрібна при утрудненому диханні, порушенні свідомості, судомах, сильному болю або різкому погіршенні.',other:'Дивіться на повторюваний сценарій і реальні умови, а не на один епізод.'},
      why:'У карті за цією темою помітно: {factor}{aspect}. Це не вирок, а підказка, який спосіб підтримки перевірити спостереженням.', aspect:', сильний зв’язок із {planet} ({type}, орб {orb}°)', noAspect:'', house:'{house}-й будинок', age:'Вік: {age}.',
      installTitle:'Як установити застосунок на телефон', ios:'iPhone / iPad', android:'Android', iosSteps:['Відкрийте сайт саме в Safari.','Натисніть «Поділитися» внизу екрана.','Оберіть «На початковий екран».','Перевірте назву Child Astrology й натисніть «Додати».'], androidSteps:['Відкрийте сайт у Chrome.','Натисніть меню ⋮ угорі праворуч.','Оберіть «Установити застосунок» або «Додати на головний екран».','Підтвердьте встановлення.'], installHint:'Після встановлення з’явиться фірмова іконка. Дані залишаються на цьому пристрої. Якщо іконка стара, видаліть її та встановіть застосунок знову.', installed:'Застосунок уже відкрито з головного екрана.'
    },
    en:{
      title:'Parent guide', intro:'Ask about the selected child. The answer uses calculated signs, houses and aspects — without using the Ascendant or generic filler.', child:'Child', noChild:'Add a child and calculate the chart first.', context:'Questions and answers stay on this device and are kept separate for each child.', emptyTitle:'How to begin', empty:'Select a child and ask one specific question. A concrete situation produces a more useful answer.', placeholder:'For example: why is it hard to calm down after school?', send:'Send', clear:'Clear history', personal:'Need a personal consultation with Ella?', personalText:'For a complex situation, message Ella directly. Child data is never attached automatically.', whatsapp:'Message on WhatsApp', note:'Astrology is used here as a language of observation, not as a diagnosis or prediction.', addChild:'Add a child profile in the Children section.', genericError:'The chart could not be calculated. Check the date, time and selected city.',
      chips:[['emotion','How can I help them calm down?'],['fear','What may be behind the anxiety?'],['learning','How should I explain material?'],['communication','How should I talk with them?'],['sport','Which sport should we try?'],['health','What should I watch in wellbeing?']],
      headings:{what:'What may be happening',why:'Why it may show up',try:'What to try',watch:'What to watch'}, topics:{emotion:'emotional regulation',fear:'sense of safety',learning:'learning',communication:'communication',sport:'movement and sport',health:'wellbeing',other:'the current situation'},
      element:{fire:'The reaction may rise quickly. Movement and one clear next step can help the child return to balance.',earth:'The reaction builds slowly. Predictability, physical comfort and time without pressure help.',air:'The child often understands an experience through words, questions and a change of perspective.',water:'The child may absorb atmosphere deeply and hold feelings for a long time. Safe connection comes first.'},
      actions:{emotion:['Name the feeling in one sentence first.','Allow 10–15 minutes for a suitable physical release.','After calm returns, discuss only one next step.'],fear:['Ask what exactly feels scary: the event, uncertainty or an adult’s reaction.','Explain the plan in advance and what the child can do independently.','Do not say “don’t be afraid”; offer support and one small safe experience.'],learning:['Use short blocks with one example.','Ask the child to explain it in their own words.','Alternate effort with a short break before overload.'],communication:['Begin with an observation, not a judgement.','Ask one question and allow time to answer.','State the boundary briefly: what is not allowed, what is possible and what happens next.'],sport:['Try two different introductory sessions.','Assess the group pace and the coach’s tone.','Afterwards ask about energy, interest and the wish to return.'],health:['For 7–14 days track sleep, appetite, energy, pain and behaviour changes.','Record duration and context instead of explaining a symptom through the chart.','Show repeated or worsening symptoms to a paediatrician.'],other:['Describe the observed fact without a label.','Check sleep, load, safety and recent changes.','Try one support strategy and review the result after a few days.']},
      watch:{emotion:'If reactions become stronger, last longer or disrupt sleep and daily life, investigate the cause with a qualified professional.',fear:'Do not explain persistent anxiety as personality alone. Rule out stress, overload, bullying and health causes.',learning:'Learning difficulty is not laziness. If it persists, discuss observations with the teacher and a qualified specialist.',communication:'If the child suddenly closes down, restore safety in the conversation before analysing the cause.',sport:'Pain, dizziness, shortness of breath or prolonged worsening after exercise needs medical assessment.',health:'A birth chart cannot identify illness. Seek urgent medical help for breathing difficulty, altered consciousness, seizures, severe pain or sudden deterioration.',other:'Look for the repeating pattern and real conditions, not one isolated event.'},
      why:'The chart factor most relevant here is: {factor}{aspect}. This is not a verdict; it suggests a support strategy to test through observation.', aspect:', a close link with {planet} ({type}, {orb}° orb)', noAspect:'', house:'house {house}', age:'Age: {age}.',
      installTitle:'How to install the app on your phone', ios:'iPhone / iPad', android:'Android', iosSteps:['Open the site specifically in Safari.','Tap Share at the bottom of the screen.','Choose “Add to Home Screen”.','Check the name Child Astrology and tap “Add”.'], androidSteps:['Open the site in Chrome.','Tap the ⋮ menu in the top-right corner.','Choose “Install app” or “Add to Home screen”.','Confirm the installation.'], installHint:'The branded app icon will appear after installation. Data remains on this device. If the old icon appears, remove it and install the app again.', installed:'The app is already open from the Home Screen.'
    },
    nl:{
      title:'Oudergids', intro:'Stel een vraag over het gekozen kind. Het antwoord gebruikt berekende tekens, huizen en aspecten — zonder Ascendant of algemene opvulling.', child:'Kind', noChild:'Voeg eerst een kind toe en bereken de kaart.', context:'Vragen en antwoorden blijven op dit apparaat en worden per kind gescheiden.', emptyTitle:'Hoe te beginnen', empty:'Kies een kind en stel één concrete vraag. Een duidelijke situatie geeft een bruikbaarder antwoord.', placeholder:'Bijvoorbeeld: waarom is rustig worden na school zo moeilijk?', send:'Versturen', clear:'Geschiedenis wissen', personal:'Een persoonlijk gesprek met Ella nodig?', personalText:'Stuur Ella direct een bericht bij een complexe situatie. Gegevens van het kind worden nooit automatisch meegestuurd.', whatsapp:'Bericht via WhatsApp', note:'Astrologie wordt hier gebruikt als observatietaal, niet als diagnose of voorspelling.', addChild:'Voeg een kindprofiel toe bij Kinderen.', genericError:'De kaart kon niet worden berekend. Controleer datum, tijd en gekozen plaats.',
      chips:[['emotion','Hoe help ik mijn kind kalmeren?'],['fear','Wat kan achter de angst zitten?'],['learning','Hoe leg ik leerstof het beste uit?'],['communication','Hoe praat ik met mijn kind?'],['sport','Welke sport kunnen we proberen?'],['health','Wat observeer ik bij welzijn?']],
      headings:{what:'Wat er kan gebeuren',why:'Waarom dit kan spelen',try:'Wat je kunt proberen',watch:'Waarop letten'}, topics:{emotion:'emotieregulatie',fear:'gevoel van veiligheid',learning:'leren',communication:'communicatie',sport:'beweging en sport',health:'welzijn',other:'de huidige situatie'},
      element:{fire:'De reactie kan snel oplopen. Beweging en één duidelijke volgende stap helpen om weer in balans te komen.',earth:'De reactie bouwt langzaam op. Voorspelbaarheid, lichamelijk comfort en tijd zonder druk helpen.',air:'Het kind begrijpt een ervaring vaak via woorden, vragen en een ander perspectief.',water:'Het kind kan sfeer sterk opnemen en gevoelens lang vasthouden. Veilig contact komt eerst.'},
      actions:{emotion:['Benoem eerst het gevoel in één zin.','Geef 10–15 minuten voor passende lichamelijke ontlading.','Bespreek na de rust slechts één volgende stap.'],fear:['Vraag wat precies eng voelt: de gebeurtenis, onzekerheid of reactie van een volwassene.','Leg het plan vooraf uit en wat het kind zelf kan doen.','Zeg niet alleen “wees niet bang”; bied steun en één kleine veilige ervaring.'],learning:['Werk in korte blokken met één voorbeeld.','Laat het kind in eigen woorden uitleggen.','Wissel inspanning af met een korte pauze vóór overbelasting.'],communication:['Begin met een observatie, niet met een oordeel.','Stel één vraag en geef tijd voor antwoord.','Formuleer de grens kort: wat niet mag, wat wel kan en wat daarna gebeurt.'],sport:['Probeer twee verschillende proeflessen.','Beoordeel tempo van de groep en toon van de trainer.','Vraag na afloop naar energie, interesse en de wens om terug te gaan.'],health:['Houd 7–14 dagen slaap, eetlust, energie, pijn en gedragsverandering bij.','Noteer duur en omstandigheden zonder het symptoom astrologisch te verklaren.','Bespreek herhaalde of erger wordende klachten met de huisarts of kinderarts.'],other:['Beschrijf het feit zonder etiket.','Controleer slaap, belasting, veiligheid en recente veranderingen.','Probeer één steunende aanpak en bekijk het resultaat na enkele dagen.']},
      watch:{emotion:'Als reacties sterker worden, langer duren of slaap en dagelijks leven verstoren, onderzoek de oorzaak met een deskundige.',fear:'Verklaar aanhoudende angst niet alleen als karakter. Sluit stress, overbelasting, pesten en gezondheidsredenen uit.',learning:'Leerproblemen zijn geen luiheid. Bespreek aanhoudende problemen met school en een deskundige.',communication:'Als het kind plots dichtklapt, herstel eerst de veiligheid van het gesprek.',sport:'Pijn, duizeligheid, kortademigheid of langdurige achteruitgang na inspanning vraagt medische beoordeling.',health:'Een geboortehoroscoop toont geen ziekte. Zoek spoedhulp bij ademhalingsproblemen, veranderd bewustzijn, epileptische aanvallen, hevige pijn of plotselinge achteruitgang.',other:'Kijk naar het herhalende patroon en de echte omstandigheden, niet naar één los moment.'},
      why:'Het meest relevante kaartgegeven is: {factor}{aspect}. Dit is geen oordeel, maar een steunstrategie om in de praktijk te toetsen.', aspect:', een sterke verbinding met {planet} ({type}, orb {orb}°)', noAspect:'', house:'huis {house}', age:'Leeftijd: {age}.',
      installTitle:'Zo installeer je de app op je telefoon', ios:'iPhone / iPad', android:'Android', iosSteps:['Open de site specifiek in Safari.','Tik onderaan op Delen.','Kies “Zet op beginscherm”.','Controleer Child Astrology en tik op “Voeg toe”.'], androidSteps:['Open de site in Chrome.','Tik rechtsboven op het menu ⋮.','Kies “App installeren” of “Toevoegen aan startscherm”.','Bevestig de installatie.'], installHint:'Na installatie verschijnt het merkicoon. Gegevens blijven op dit apparaat. Zie je het oude icoon, verwijder dit dan en installeer de app opnieuw.', installed:'De app is al vanaf het beginscherm geopend.'
    }
  };

  const SPORTS = {
    ru:[['спринт','единоборства','хоккей'],['гимнастика','танцы','плавание'],['атлетика','футбол','баскетбол'],['плавание','йога','индивидуальные занятия'],['гимнастика','теннис','акробатика'],['велоспорт','гребля','бадминтон'],['теннис','фехтование','парные танцы'],['единоборства','скалолазание','стрельба из лука'],['походы','конный спорт','ориентирование'],['бег на выносливость','лыжи','скалолазание'],['велоспорт','сёрфинг','командные игры'],['плавание','танцы','йога']],
    ua:[['спринт','єдиноборства','хокей'],['гімнастика','танці','плавання'],['атлетика','футбол','баскетбол'],['плавання','йога','індивідуальні заняття'],['гімнастика','теніс','акробатика'],['велоспорт','веслування','бадмінтон'],['теніс','фехтування','парні танці'],['єдиноборства','скелелазіння','стрільба з лука'],['походи','кінний спорт','орієнтування'],['біг на витривалість','лижі','скелелазіння'],['велоспорт','серфінг','командні ігри'],['плавання','танці','йога']],
    en:[['sprints','martial arts','hockey'],['gymnastics','dance','swimming'],['athletics','football','basketball'],['swimming','yoga','individual training'],['gymnastics','tennis','acrobatics'],['cycling','rowing','badminton'],['tennis','fencing','partner dance'],['martial arts','climbing','archery'],['hiking','horse riding','orienteering'],['endurance running','skiing','climbing'],['cycling','surfing','team games'],['swimming','dance','yoga']],
    nl:[['sprint','vechtsport','hockey'],['gymnastiek','dans','zwemmen'],['atletiek','voetbal','basketbal'],['zwemmen','yoga','individuele training'],['gymnastiek','tennis','acrobatiek'],['fietsen','roeien','badminton'],['tennis','schermen','partnerdans'],['vechtsport','klimmen','boogschieten'],['wandelen','paardrijden','oriëntatie'],['duurloop','skiën','klimmen'],['fietsen','surfen','teamsport'],['zwemmen','dans','yoga']]
  };

  function lang() { return ['ru','ua','en','nl'].includes(currentLanguage) ? currentLanguage : 'nl'; }
  function l() { return UI[lang()]; }
  function esc(value) { return String(value ?? '').replace(/[&<>'"]/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c])); }
  function fill(text, values) { return String(text).replace(/\{(\w+)\}/g, (_, key) => values[key] ?? ''); }
  function histories() { try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); } catch (_) { return {}; } }
  function getHistory(id) { return histories()[String(id)] || []; }
  function saveHistory(id, items) { const all = histories(); all[String(id)] = items.slice(-30); localStorage.setItem(STORAGE_KEY, JSON.stringify(all)); }
  function selectedId() { const stored = localStorage.getItem(selectedKey); return children.some((c) => String(c.id) === stored) ? stored : (children[0] ? String(children[0].id) : ''); }
  function childAge(child) { if (!child?.birthDate) return null; const birth = new Date(`${child.birthDate}T12:00:00`); if (Number.isNaN(birth.getTime())) return null; const now = new Date(); let years = now.getFullYear() - birth.getFullYear(); if (now < new Date(now.getFullYear(), birth.getMonth(), birth.getDate())) years -= 1; return Math.max(0, years); }
  function detectTopic(question, previousQuestion) {
    const q = question.toLowerCase();
    const groups = {
      health:/бол|здоров|самочув|темпера|аппет|сон|pain|health|sleep|eetlust|gezond|pijn|самопочут|апетит|біль/,
      fear:/трев|страх|боится|боїть|трив|anxi|fear|afraid|angst|bang/,
      learning:/уч|школ|урок|вниман|обуч|навчан|уваг|learn|school|study|leren|school|aandacht/,
      sport:/спорт|движ|секц|трен|рух|sport|movement|training|beweging/,
      communication:/говор|общ|слуш|разгов|спілк|слух|talk|communicat|listen|prat|luister|contact/,
      emotion:/эмоц|злит|плач|успоко|истер|почут|плак|заспок|emotion|angry|calm|cry|boos|kalm|huil/
    };
    const direct = Object.keys(groups).find((key) => groups[key].test(q));
    if (direct) return direct;
    const previous = String(previousQuestion || '').toLowerCase();
    return Object.keys(groups).find((key) => groups[key].test(previous)) || 'other';
  }
  function relevantAspect(chart, body) {
    return chart.aspects?.find((a) => a.a === body || a.b === body) || null;
  }
  function factorText(chart, topic) {
    const locale = lang();
    const body = PLANET_BY_TOPIC[topic] || 'Sun';
    const position = chart.positions[body];
    if (!position) return '';
    const parts = [`${PLANETS[locale][body]} — ${SIGN_NAMES[locale][position.sign]}`];
    if (chart.knownTime && position.house) parts.push(fill(l().house,{house:position.house}));
    const aspect = relevantAspect(chart, body);
    let aspectText = '';
    if (aspect) {
      const other = aspect.a === body ? aspect.b : aspect.a;
      aspectText = fill(l().aspect,{planet:PLANETS[locale][other] || other,type:ASPECTS[locale][aspect.type] || aspect.type,orb:Number(aspect.orb).toFixed(1)});
    }
    return {text:parts.join(', '),aspectText,body,position};
  }
  function responseFor(child, chart, question, history, forcedTopic) {
    const locale = lang();
    const ui = l();
    const previousQuestion = [...(history || [])].reverse().find((item) => item.role === 'user')?.text;
    const topic = forcedTopic || detectTopic(question, previousQuestion);
    const factor = factorText(chart, topic);
    const element = SIGN_ELEMENTS[factor.position?.sign ?? 0];
    const age = childAge(child);
    let what = ui.element[element];
    if (topic === 'learning') what = locale==='ru'?'Способ усвоения важнее количества повторений. Короткая понятная подача снижает сопротивление и быстрее показывает, где именно возникла трудность.':locale==='ua'?'Спосіб засвоєння важливіший за кількість повторень. Коротка зрозуміла подача швидше показує, де виникла складність.':locale==='en'?'How information is presented matters more than the number of repetitions. Short, clear input shows where the difficulty begins.':'De manier van uitleggen telt meer dan het aantal herhalingen. Korte, duidelijke uitleg laat sneller zien waar het vastloopt.';
    if (topic === 'communication') what = ui.element[element];
    if (topic === 'sport') {
      const options = SPORTS[locale][chart.positions.Mars.sign].join(', ');
      what = locale==='ru'?`Стиль действия лучше проверять на практике. Для пробы подходят: ${options}.`:locale==='ua'?`Стиль дії краще перевіряти на практиці. Для проби підійдуть: ${options}.`:locale==='en'?`The action style should be tested in practice. Good options to try are: ${options}.`:`De actiestijl moet in de praktijk worden getest. Mogelijke sporten zijn: ${options}.`;
    }
    if (topic === 'health') what = locale==='ru'?'По карте нельзя определить болезнь. Полезнее заметить раннее изменение привычного состояния и вовремя обратиться за медицинской оценкой.':locale==='ua'?'За картою не можна визначити хворобу. Корисніше вчасно помітити зміну звичного стану й звернутися по медичну оцінку.':locale==='en'?'A chart cannot identify illness. The useful step is noticing a change from the child’s normal state and seeking medical assessment in time.':'Een horoscoop kan geen ziekte vaststellen. Let op veranderingen ten opzichte van de normale toestand en vraag tijdig medische beoordeling.';
    const why = topic === 'health' ? (age != null ? fill(ui.age,{age}) : '') : fill(ui.why,{factor:factor.text,aspect:factor.aspectText});
    return `${ui.headings.what}\n${what}\n\n${ui.headings.why}\n${why || ui.note}\n\n${ui.headings.try}\n${ui.actions[topic].map((item,index)=>`${index+1}. ${item}`).join('\n')}\n\n${ui.headings.watch}\n${ui.watch[topic]}`;
  }
  function translatedHistory(id) {
    const list = id ? getHistory(id) : [];
    const child = children.find((item) => String(item.id) === String(id));
    if (!child || !list.length) return list;
    let chart;
    try { chart = window.calculateChildNatalChart(child,false); }
    catch (_) { return list; }
    let latestQuestion = '';
    return list.map((item,index) => {
      if (item.role === 'user') {
        latestQuestion = item.text || item.question || '';
        return item;
      }
      if (item.role !== 'assistant') return item;
      const question = item.question || latestQuestion || list[index - 1]?.text || '';
      const topic = item.topic || detectTopic(question,'');
      return {
        ...item,
        type:'chart-guidance',
        question,
        topic,
        text:responseFor(child,chart,question,list.slice(0,index),topic)
      };
    });
  }
  function messageHtml(item) { return `<div class="consultant-message ${item.role === 'user' ? 'user' : 'assistant'}">${esc(item.text)}</div>`; }
  function renderMessages(id) {
    const box = document.getElementById('consultantMessages');
    if (!box) return;
    const list = translatedHistory(id);
    box.innerHTML = list.length ? list.map(messageHtml).join('') : `<div class="consultant-empty"><strong>${esc(l().emptyTitle)}</strong>${esc(l().empty)}</div>`;
    box.scrollTop = box.scrollHeight;
  }
  function renderConsultant() {
    const root = document.getElementById('parentConsultantApp');
    if (!root) return;
    const ui = l();
    const id = selectedId();
    const child = children.find((item) => String(item.id) === id);
    root.innerHTML = `<header class="consultant-header"><img src="assets/nav-icons/consultations.png?v=20260825n" alt=""><div><h2>${esc(ui.title)}</h2><p>${esc(ui.intro)}</p></div></header>
      <div class="consultant-controls"><div class="consultant-field"><label for="consultantChild">${esc(ui.child)}</label><select id="consultantChild"${children.length?'':' disabled'}>${children.length?children.map((item)=>`<option value="${Number(item.id)}"${String(item.id)===id?' selected':''}>${esc(item.name)}</option>`).join(''):`<option>${esc(ui.noChild)}</option>`}</select></div><div class="consultant-context">${esc(children.length?ui.context:ui.addChild)}</div></div>
      <div class="consultant-chips">${ui.chips.map(([topic,text])=>`<button class="consultant-chip" type="button" data-topic="${topic}"${child?'':' disabled'}>${esc(text)}</button>`).join('')}</div>
      <div id="consultantMessages" class="consultant-messages"></div>
      <div class="consultant-compose"><textarea id="consultantQuestion" maxlength="700" placeholder="${esc(ui.placeholder)}"${child?'':' disabled'}></textarea><button id="consultantSend" class="btn btn-primary consultant-send" type="button"${child?'':' disabled'}>${esc(ui.send)}</button></div>
      <div class="consultant-actions"><button id="consultantClear" class="consultant-clear" type="button"${getHistory(id).length?'':' disabled'}>${esc(ui.clear)}</button></div>
      <div class="consultant-personal"><p><strong>${esc(ui.personal)}</strong><br>${esc(ui.personalText)}</p><a href="https://wa.me/31612554778" class="btn" target="_blank" rel="noopener">${esc(ui.whatsapp)}</a></div>
      <p class="consultant-note">${esc(ui.note)}</p>`;
    renderMessages(id);
    root.querySelector('#consultantChild')?.addEventListener('change',(event)=>{localStorage.setItem(selectedKey,event.target.value);renderConsultant();});
    root.querySelectorAll('.consultant-chip').forEach((button)=>button.addEventListener('click',()=>{const found=ui.chips.find(([key])=>key===button.dataset.topic);const input=document.getElementById('consultantQuestion');if(input&&found){input.value=found[1];input.focus();}}));
    root.querySelector('#consultantSend')?.addEventListener('click',sendQuestion);
    root.querySelector('#consultantQuestion')?.addEventListener('keydown',(event)=>{if(event.key==='Enter'&&(event.ctrlKey||event.metaKey)){event.preventDefault();sendQuestion();}});
    root.querySelector('#consultantClear')?.addEventListener('click',()=>{if(!id)return;saveHistory(id,[]);renderConsultant();});
  }
  function sendQuestion() {
    const input = document.getElementById('consultantQuestion');
    const id = selectedId();
    const child = children.find((item) => String(item.id) === id);
    const question = input?.value.trim();
    if (!child || !question) return;
    let chart;
    try { chart = window.calculateChildNatalChart(child,false); }
    catch (_) { const root=document.getElementById('parentConsultantApp'); root?.querySelector('.consultant-error')?.remove(); root?.querySelector('.consultant-controls')?.insertAdjacentHTML('afterend',`<div class="consultant-error">${esc(l().genericError)}</div>`); return; }
    const history = getHistory(id);
    const previousQuestion = [...history].reverse().find((item) => item.role === 'user')?.text;
    const topic = detectTopic(question,previousQuestion);
    document.dispatchEvent(new CustomEvent('app:consultation-question',{detail:{topic}}));
    history.push(
      {role:'user',text:question},
      {role:'assistant',type:'chart-guidance',question,topic,language:lang(),text:responseFor(child,chart,question,history,topic)}
    );
    saveHistory(id,history);
    input.value='';
    renderConsultant();
  }
  function renderInstallGuide() {
    const root = document.getElementById('installGuideApp');
    if (!root) return;
    const ui = l();
    const standalone = window.matchMedia?.('(display-mode: standalone)').matches || window.navigator.standalone === true;
    root.innerHTML = `<details class="install-guide"><summary>${esc(ui.installTitle)}</summary><div class="install-guide-body"><section class="install-platform"><h4>${esc(ui.ios)}</h4><ol>${ui.iosSteps.map((step)=>`<li>${esc(step)}</li>`).join('')}</ol></section><section class="install-platform"><h4>${esc(ui.android)}</h4><ol>${ui.androidSteps.map((step)=>`<li>${esc(step)}</li>`).join('')}</ol></section><p class="install-hint">${esc(standalone?ui.installed:ui.installHint)}</p></div></details>`;
  }

  if (typeof translations !== 'undefined') {
    Object.assign(translations.ru,{consultation_title:'Помощник для родителя',consultation_subtitle:'Спросить о ребёнке',consultation_desc:'Задайте конкретный вопрос и получите краткую рекомендацию по рассчитанной карте.',action_consultation:'Спросить о ребёнке',action_consultation_desc:'Персональный помощник по выбранному ребёнку'});
    Object.assign(translations.ua,{consultation_title:'Помічник для батьків',consultation_subtitle:'Запитати про дитину',consultation_desc:'Поставте конкретне запитання й отримайте коротку рекомендацію за розрахованою картою.',action_consultation:'Запитати про дитину',action_consultation_desc:'Персональний помічник для обраної дитини'});
    Object.assign(translations.en,{consultation_title:'Parent guide',consultation_subtitle:'Ask about your child',consultation_desc:'Ask a specific question and receive concise guidance based on the calculated chart.',action_consultation:'Ask about your child',action_consultation_desc:'A personal guide for the selected child'});
    Object.assign(translations.nl,{consultation_title:'Oudergids',consultation_subtitle:'Vraag over je kind',consultation_desc:'Stel een concrete vraag en ontvang beknopte begeleiding op basis van de berekende kaart.',action_consultation:'Vraag over je kind',action_consultation_desc:'Persoonlijke begeleiding voor het gekozen kind'});
  }

  const previousShowSection = window.showSection;
  window.showSection = function (sectionId,event) { previousShowSection(sectionId,event); if(sectionId==='consultation')renderConsultant(); if(sectionId==='settings')renderInstallGuide(); };
  const previousChangeLanguage = window.changeLanguage;
  window.changeLanguage = function (language,event) { previousChangeLanguage(language,event); renderConsultant(); renderInstallGuide(); };
  document.addEventListener('DOMContentLoaded',()=>{renderConsultant();renderInstallGuide();});
})();

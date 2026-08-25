(function () {
  'use strict';

  const VERSION = '20260825p';
  const SIGN_KEYS = ['aries','taurus','gemini','cancer','leo','virgo','libra','scorpio','sagittarius','capricorn','aquarius','pisces'];
  const ELEMENTS = ['fire','earth','air','water'];
  const MODALITIES = ['cardinal','fixed','mutable'];
  const SIGN_ELEMENT = ['fire','earth','air','water','fire','earth','air','water','fire','earth','air','water'];
  const SIGN_MODALITY = ['cardinal','fixed','mutable','cardinal','fixed','mutable','cardinal','fixed','mutable','cardinal','fixed','mutable'];

  const I18N = {
    ru: {
      language:'Язык', fullAnalysis:'Полный разбор', recalculate:'Пересчитать карту', delete:'Удалить', noChildren:'Пока нет добавленных детей', unknownTime:'Время неизвестно', close:'Закрыть',
      title:'Персональный разбор ребёнка', portrait:'Основной портрет', character:'Характер', emotions:'Эмоции и восстановление', communication:'Общение', learning:'Обучение', strengths:'Сильные стороны', challenges:'Что может даваться сложнее', social:'Социализация', sport:'Спорт и движение', parents:'Что важно родителям', facts:'Расчёт карты', planets:'Планеты', aspects:'Основные аспекты', houses:'Дома',
      reliableOnly:'Без точного времени рождения мы не используем дома и другие показатели, зависящие от времени. Показаны только надёжно рассчитываемые части карты.', moonAmbiguous:'В этот день Луна меняла знак. Поэтому мы не закрепляем за ребёнком один лунный сценарий и предлагаем наблюдать оба варианта.',
      houseMethod:'Дома рассчитаны по системе целых знаков с учётом исторического часового пояса. Психологический разбор строится по планетам, знакам, домам и аспектам.',
      disclaimer:'Это не диагноз и не предсказание. Сверяйте выводы с живыми наблюдениями за ребёнком.', calculationError:'Не удалось рассчитать карту. Проверьте дату, время и выбранный город.', missingPlace:'Для точного расчёта откройте профиль заново и выберите город из выпадающего списка.',
      dominant:'В карте заметнее всего стихия {element}. Это задаёт общий способ реагирования, но не отменяет другие качества.', houseLine:'{planet} в {house}-м доме: эта тема особенно проявляется через {theme}.',
      aspectHard:'Связь {a} и {b} через {aspect} создаёт внутреннее напряжение между темами «{roleA}» и «{roleB}». Здесь полезны пауза, понятные границы и возможность попробовать ещё раз без стыда.',
      aspectSoft:'Связь {a} и {b} через {aspect} помогает соединять «{roleA}» и «{roleB}». Это ресурс, который раскрывается сильнее, когда ребёнку дают практику и доверяют результат.',
      aspectConj:'Соединение {a} и {b} делает темы «{roleA}» и «{roleB}» почти неразделимыми. Реакция может быть яркой, поэтому важно учить замечать её раньше, чем она накопится.',
      noStrongAspect:'В этой теме нет одного доминирующего аспекта: полезнее смотреть на знак, дом и реальные реакции ребёнка.',
      strengthItems:['наблюдательность','способность учиться через опыт','верность своим интересам','чувство собственного ритма','умение восстанавливаться при поддержке'],
      challengeHard:'Напряжённые аспекты не означают проблему. Они показывают навык, которому ребёнку может потребоваться больше времени и безопасной практики.', challengeBalance:'Если ребёнок устаёт или сопротивляется, сначала проверьте нагрузку и чувство безопасности, а уже потом требуйте результат.',
      parentActions:['Сначала назовите то, что видите: «Ты расстроился» или «Тебе сейчас трудно», и только потом предлагайте решение.','Объясняйте коротко, по одному шагу, после чего просите ребёнка показать или пересказать своими словами.','Сравнивайте ребёнка только с его собственным прошлым результатом.','При выборе школы, учителя или тренера смотрите не только на программу, но и на тон общения взрослого.','Проверяйте рекомендации наблюдением: то, что успокаивает и развивает именно вашего ребёнка, важнее любого описания.'],
      elementNames:{fire:'Огня',earth:'Земли',air:'Воздуха',water:'Воды'},
      aspectNames:{conjunction:'соединение',sextile:'секстиль',square:'квадратуру',trine:'трин',opposition:'оппозицию'},
      role:{Sun:'воля и чувство себя',Moon:'безопасность и эмоции',Mercury:'мышление и речь',Venus:'симпатии и контакт',Mars:'действие и границы',Jupiter:'рост и уверенность',Saturn:'правила и самоконтроль',Uranus:'свобода и перемены',Neptune:'воображение и чувствительность',Pluto:'интенсивность и внутренняя сила'},
      houseThemes:['самостоятельность и способ проявляться','ценности, вещи и чувство устойчивости','речь, вопросы и ближайшее окружение','дом, семью и личное пространство','игру, творчество и желание быть замеченным','режим, навыки и повседневные обязанности','партнёрство и умение договариваться','доверие, границы и глубокие переживания','интерес к миру, языкам и большим идеям','цели, ответственность и признание','друзей, группы и необычные интересы','уединение, фантазию и восстановление'],
      signs:['Овен','Телец','Близнецы','Рак','Лев','Дева','Весы','Скорпион','Стрелец','Козерог','Водолей','Рыбы'],
      planetNames:{Sun:'Солнце',Moon:'Луна',Mercury:'Меркурий',Venus:'Венера',Mars:'Марс',Jupiter:'Юпитер',Saturn:'Сатурн',Uranus:'Уран',Neptune:'Нептун',Pluto:'Плутон'}
    },
    ua: {
      language:'Мова', fullAnalysis:'Повний розбір', recalculate:'Перерахувати карту', delete:'Видалити', noChildren:'Поки немає доданих дітей', unknownTime:'Час невідомий', close:'Закрити',
      title:'Персональний розбір дитини', portrait:'Основний портрет', character:'Характер', emotions:'Емоції та відновлення', communication:'Спілкування', learning:'Навчання', strengths:'Сильні сторони', challenges:'Що може даватися складніше', social:'Соціалізація', sport:'Спорт і рух', parents:'Що важливо батькам', facts:'Розрахунок карти', planets:'Планети', aspects:'Основні аспекти', houses:'Будинки',
      reliableOnly:'Без точного часу народження ми не використовуємо будинки та інші залежні від часу показники. Показані лише надійно розраховані частини карти.', moonAmbiguous:'Цього дня Місяць змінював знак. Тому ми не закріплюємо один місячний сценарій і радимо спостерігати обидва варіанти.',
      houseMethod:'Будинки розраховані за системою цілих знаків з урахуванням історичного часового поясу. Психологічний розбір будується за планетами, знаками, будинками й аспектами.',
      disclaimer:'Це не діагноз і не передбачення. Зіставляйте висновки з живими спостереженнями за дитиною.', calculationError:'Не вдалося розрахувати карту. Перевірте дату, час і вибране місто.', missingPlace:'Для точного розрахунку відкрийте профіль знову та виберіть місто зі списку.',
      dominant:'У карті найбільш помітна стихія {element}. Вона задає загальний спосіб реагування, але не скасовує інших якостей.', houseLine:'{planet} у {house}-му будинку: ця тема особливо проявляється через {theme}.',
      aspectHard:'Зв’язок {a} і {b} через {aspect} створює напруження між темами «{roleA}» і «{roleB}». Тут допомагають пауза, зрозумілі межі та можливість спробувати ще раз без сорому.', aspectSoft:'Зв’язок {a} і {b} через {aspect} допомагає поєднувати «{roleA}» і «{roleB}». Це ресурс, який розкривається через практику й довіру.', aspectConj:'З’єднання {a} і {b} робить теми «{roleA}» і «{roleB}» майже нероздільними. Реакція може бути яскравою, тому важливо помічати її до накопичення.', noStrongAspect:'У цій темі немає одного домінантного аспекту: корисніше дивитися на знак, будинок і реальні реакції дитини.',
      strengthItems:['спостережливість','здатність вчитися через досвід','вірність своїм інтересам','відчуття власного ритму','уміння відновлюватися за підтримки'], challengeHard:'Напружені аспекти не означають проблему. Вони показують навичку, якій може знадобитися більше часу та безпечної практики.', challengeBalance:'Якщо дитина втомлюється чи опирається, спочатку перевірте навантаження й відчуття безпеки.',
      parentActions:['Спочатку назвіть те, що бачите, і лише потім пропонуйте рішення.','Пояснюйте коротко, по одному кроку, а потім попросіть показати або переказати своїми словами.','Порівнюйте дитину лише з її власним попереднім результатом.','Обираючи школу, вчителя чи тренера, оцінюйте також тон спілкування дорослого.','Перевіряйте рекомендації спостереженням: реакція саме вашої дитини важливіша за будь-який опис.'],
      elementNames:{fire:'Вогню',earth:'Землі',air:'Повітря',water:'Води'}, aspectNames:{conjunction:'з’єднання',sextile:'секстиль',square:'квадратуру',trine:'трин',opposition:'опозицію'},
      role:{Sun:'воля та відчуття себе',Moon:'безпека й емоції',Mercury:'мислення й мова',Venus:'симпатії та контакт',Mars:'дія й межі',Jupiter:'зростання й упевненість',Saturn:'правила й самоконтроль',Uranus:'свобода й зміни',Neptune:'уява й чутливість',Pluto:'інтенсивність і внутрішня сила'},
      houseThemes:['самостійність і спосіб проявлятися','цінності, речі й відчуття стійкості','мову, запитання й близьке оточення','дім, сім’ю й особистий простір','гру, творчість і бажання бути поміченим','режим, навички й щоденні обов’язки','партнерство й уміння домовлятися','довіру, межі й глибокі переживання','інтерес до світу, мов і великих ідей','цілі, відповідальність і визнання','друзів, групи й незвичні інтереси','усамітнення, фантазію й відновлення'],
      signs:['Овен','Телець','Близнюки','Рак','Лев','Діва','Терези','Скорпіон','Стрілець','Козоріг','Водолій','Риби'], planetNames:{Sun:'Сонце',Moon:'Місяць',Mercury:'Меркурій',Venus:'Венера',Mars:'Марс',Jupiter:'Юпітер',Saturn:'Сатурн',Uranus:'Уран',Neptune:'Нептун',Pluto:'Плутон'}
    },
    en: {
      language:'Language', fullAnalysis:'Full child analysis', recalculate:'Recalculate chart', delete:'Delete', noChildren:'No children added yet', unknownTime:'Time unknown', close:'Close',
      title:'Personal child analysis', portrait:'Core portrait', character:'Character', emotions:'Emotions and recovery', communication:'Communication', learning:'Learning', strengths:'Strengths', challenges:'What may take more effort', social:'Social life', sport:'Sport and movement', parents:'What parents should know', facts:'Chart calculation', planets:'Planets', aspects:'Major aspects', houses:'Houses',
      reliableOnly:'Without an exact birth time, houses and other time-dependent factors are not used. Only reliably calculated parts of the chart are shown.', moonAmbiguous:'The Moon changed signs on this date. We therefore do not assign one lunar pattern and suggest observing both possibilities.',
      houseMethod:'Houses use Whole Sign Houses with the historical time zone. The interpretation is based on planets, signs, houses and aspects.', disclaimer:'This is not a diagnosis or prediction. Compare every insight with real observations of the child.', calculationError:'The chart could not be calculated. Check the date, time and selected city.', missingPlace:'For an accurate calculation, reopen the profile and select a city from the suggestion list.',
      dominant:'The {element} element is strongest in this chart. It shapes the general response style without cancelling other qualities.', houseLine:'{planet} in house {house}: this theme is especially expressed through {theme}.',
      aspectHard:'The {aspect} between {a} and {b} creates tension between “{roleA}” and “{roleB}”. A pause, clear boundaries and a chance to try again without shame are helpful here.', aspectSoft:'The {aspect} between {a} and {b} helps “{roleA}” and “{roleB}” work together. This resource grows through practice and trust.', aspectConj:'The conjunction of {a} and {b} closely merges “{roleA}” and “{roleB}”. Reactions may be vivid, so early recognition matters.', noStrongAspect:'There is no single dominant aspect here; the sign, house and the child’s real reactions are more useful.',
      strengthItems:['careful observation','learning through experience','loyalty to personal interests','a clear sense of personal pace','ability to recover with support'], challengeHard:'Challenging aspects do not mean a problem. They point to a skill that may need more time and safe practice.', challengeBalance:'If the child resists or tires quickly, check the load and sense of safety before asking for performance.',
      parentActions:['Name what you see before offering a solution.','Explain one short step at a time, then ask the child to show or retell it.','Compare the child only with their own previous result.','When choosing a school, teacher or coach, assess the adult’s tone as well as the programme.','Test every suggestion through observation; the response of your actual child matters most.'],
      elementNames:{fire:'Fire',earth:'Earth',air:'Air',water:'Water'}, aspectNames:{conjunction:'conjunction',sextile:'sextile',square:'square',trine:'trine',opposition:'opposition'},
      role:{Sun:'will and sense of self',Moon:'safety and emotion',Mercury:'thinking and speech',Venus:'affection and connection',Mars:'action and boundaries',Jupiter:'growth and confidence',Saturn:'rules and self-control',Uranus:'freedom and change',Neptune:'imagination and sensitivity',Pluto:'intensity and inner power'},
      houseThemes:['independence and self-expression','values, possessions and stability','speech, questions and the immediate environment','home, family and private space','play, creativity and being seen','routine, skills and daily duties','partnership and negotiation','trust, boundaries and deep feelings','the wider world, languages and big ideas','goals, responsibility and recognition','friends, groups and unusual interests','solitude, imagination and recovery'],
      signs:['Aries','Taurus','Gemini','Cancer','Leo','Virgo','Libra','Scorpio','Sagittarius','Capricorn','Aquarius','Pisces'], planetNames:{Sun:'Sun',Moon:'Moon',Mercury:'Mercury',Venus:'Venus',Mars:'Mars',Jupiter:'Jupiter',Saturn:'Saturn',Uranus:'Uranus',Neptune:'Neptune',Pluto:'Pluto'}
    },
    nl: {
      language:'Taal', fullAnalysis:'Volledige kindanalyse', recalculate:'Horoscoop opnieuw berekenen', delete:'Verwijderen', noChildren:'Nog geen kinderen toegevoegd', unknownTime:'Tijd onbekend', close:'Sluiten',
      title:'Persoonlijke analyse van het kind', portrait:'Kernportret', character:'Karakter', emotions:'Emoties en herstel', communication:'Communicatie', learning:'Leren', strengths:'Sterke kanten', challenges:'Wat meer moeite kan kosten', social:'Socialisatie', sport:'Sport en beweging', parents:'Wat ouders moeten weten', facts:'Berekening van de kaart', planets:'Planeten', aspects:'Belangrijkste aspecten', houses:'Huizen',
      reliableOnly:'Zonder exacte geboortetijd gebruiken we geen huizen of andere tijdsafhankelijke factoren. Alleen betrouwbaar berekende delen worden getoond.', moonAmbiguous:'De Maan wisselde die dag van teken. Daarom leggen we niet één emotioneel patroon vast en adviseren we beide mogelijkheden te observeren.',
      houseMethod:'De huizen zijn berekend met Whole Sign Houses en de historische tijdzone. De interpretatie is gebaseerd op planeten, tekens, huizen en aspecten.', disclaimer:'Dit is geen diagnose of voorspelling. Vergelijk elk inzicht met echte observaties van het kind.', calculationError:'De kaart kon niet worden berekend. Controleer datum, tijd en gekozen plaats.', missingPlace:'Open het profiel opnieuw en kies een stad uit de suggestielijst voor een nauwkeurige berekening.',
      dominant:'Het element {element} is het sterkst in deze kaart. Het kleurt de algemene reactiestijl zonder andere kwaliteiten uit te sluiten.', houseLine:'{planet} in huis {house}: dit thema komt vooral tot uiting via {theme}.',
      aspectHard:'Het {aspect} tussen {a} en {b} geeft spanning tussen “{roleA}” en “{roleB}”. Een pauze, duidelijke grenzen en opnieuw mogen proberen zonder schaamte helpen hier.', aspectSoft:'Het {aspect} tussen {a} en {b} laat “{roleA}” en “{roleB}” samenwerken. Deze kwaliteit groeit door oefening en vertrouwen.', aspectConj:'De conjunctie van {a} en {b} verbindt “{roleA}” en “{roleB}” sterk. Reacties kunnen duidelijk zijn; vroeg herkennen helpt.', noStrongAspect:'Hier is geen enkel aspect dominant; teken, huis en echte reacties van het kind geven meer informatie.',
      strengthItems:['goed waarnemen','leren door ervaring','trouw aan eigen interesses','gevoel voor eigen tempo','herstellen met passende steun'], challengeHard:'Spannende aspecten betekenen geen probleem. Ze tonen een vaardigheid die meer tijd en veilige oefening kan vragen.', challengeBalance:'Als het kind weerstand toont of snel moe wordt, kijk eerst naar belasting en veiligheid.',
      parentActions:['Benoem eerst wat u ziet en bied daarna pas een oplossing.','Leg één korte stap tegelijk uit en laat het kind daarna voordoen of navertellen.','Vergelijk het kind alleen met zijn of haar eigen eerdere resultaat.','Let bij school, leraar of trainer ook op de toon van de volwassene.','Toets elk advies aan observatie; de reactie van uw eigen kind is doorslaggevend.'],
      elementNames:{fire:'Vuur',earth:'Aarde',air:'Lucht',water:'Water'}, aspectNames:{conjunction:'conjunctie',sextile:'sextiel',square:'vierkant',trine:'driehoek',opposition:'oppositie'},
      role:{Sun:'wil en zelfgevoel',Moon:'veiligheid en emotie',Mercury:'denken en spreken',Venus:'genegenheid en contact',Mars:'actie en grenzen',Jupiter:'groei en vertrouwen',Saturn:'regels en zelfcontrole',Uranus:'vrijheid en verandering',Neptune:'verbeelding en gevoeligheid',Pluto:'intensiteit en innerlijke kracht'},
      houseThemes:['zelfstandigheid en zelfexpressie','waarden, bezit en stabiliteit','spraak, vragen en directe omgeving','thuis, familie en privéruimte','spel, creativiteit en gezien worden','ritme, vaardigheden en dagelijkse taken','samenwerking en afspraken','vertrouwen, grenzen en diepe gevoelens','de wijde wereld, talen en grote ideeën','doelen, verantwoordelijkheid en erkenning','vrienden, groepen en bijzondere interesses','rust, fantasie en herstel'],
      signs:['Ram','Stier','Tweelingen','Kreeft','Leeuw','Maagd','Weegschaal','Schorpioen','Boogschutter','Steenbok','Waterman','Vissen'], planetNames:{Sun:'Zon',Moon:'Maan',Mercury:'Mercurius',Venus:'Venus',Mars:'Mars',Jupiter:'Jupiter',Saturn:'Saturnus',Uranus:'Uranus',Neptune:'Neptunus',Pluto:'Pluto'}
    }
  };

  const SIGN_TRAITS = {
    ru:[['быстро включается, любит действовать прямо и проверять себя делом','важно давать безопасный выход энергии и небольшие самостоятельные задачи'],['движется в своём темпе, ценит предсказуемость и телесный комфорт','перемены лучше вводить заранее и без давления'],['оживает от вопросов, разговора и смены впечатлений','интерес удерживается через разнообразие и короткие задачи'],['тонко считывает атмосферу и нуждается в ощущении близости','спокойный контакт работает лучше жёсткого требования'],['раскрывается, когда его замечают и дают проявить талант','искренняя конкретная похвала сильнее общей лести'],['замечает детали, ищет пользу и хочет понимать порядок действий','важно не превращать аккуратность в страх ошибки'],['ориентирован на отношения, справедливость и красивую подачу','решение даётся легче после спокойного обсуждения вариантов'],['глубоко включается, долго помнит значимые переживания и ценит честность','нельзя высмеивать чувства или требовать немедленной откровенности'],['тянется к большому смыслу, свободе и новым горизонтам','лучше мотивируют цель и возможность увидеть результат шире'],['серьёзно относится к обязательствам и постепенно наращивает мастерство','задачу полезно разбивать на этапы и отмечать прогресс'],['мыслит независимо, любит необычные решения и пространство выбора','рамки работают, если их смысл понятен и внутри есть свобода'],['восприимчив к образам, настроению и невысказанным сигналам','нужны мягкие переходы, творчество и время побыть в тишине']],
    ua:[['швидко включається, любить діяти прямо й перевіряти себе справою','давайте безпечний вихід енергії та невеликі самостійні завдання'],['рухається у власному темпі, цінує передбачуваність і тілесний комфорт','зміни краще вводити заздалегідь і без тиску'],['оживає від запитань, розмов і зміни вражень','інтерес утримують різноманітність і короткі завдання'],['тонко відчуває атмосферу й потребує близькості','спокійний контакт працює краще за жорстку вимогу'],['розкривається, коли його помічають і дають проявити талант','конкретна щира похвала сильніша за загальні лестощі'],['помічає деталі, шукає користь і порядок дій','не перетворюйте акуратність на страх помилки'],['орієнтується на стосунки, справедливість і красиву подачу','рішення легше приходить після спокійного обговорення'],['глибоко включається, довго пам’ятає важливі переживання й цінує чесність','не висміюйте почуття й не вимагайте негайної відвертості'],['тягнеться до сенсу, свободи й нових горизонтів','мотивують мета та широка перспектива'],['серйозно ставиться до обов’язків і поступово нарощує майстерність','діліть завдання на етапи й відмічайте прогрес'],['мислить незалежно, любить незвичні рішення та вибір','межі працюють, коли зрозумілий їх сенс'],['чутливий до образів, настрою й невисловлених сигналів','потрібні м’які переходи, творчість і тиша']],
    en:[['engages quickly, acts directly and learns by doing','offer a safe outlet for energy and small independent tasks'],['moves at a personal pace and values predictability and physical comfort','introduce change early and without pressure'],['comes alive through questions, conversation and changing impressions','use variety and short tasks to hold interest'],['reads the atmosphere closely and needs emotional closeness','calm connection works better than hard pressure'],['opens up when noticed and allowed to show a talent','specific sincere praise works better than flattery'],['spots details, seeks usefulness and wants a clear order','do not turn accuracy into fear of mistakes'],['values relationships, fairness and a balanced presentation','decisions come more easily after calm discussion'],['engages deeply, remembers meaningful feelings and values honesty','never mock feelings or demand instant disclosure'],['seeks meaning, freedom and a wider horizon','motivate with a meaningful goal and broad perspective'],['takes duties seriously and builds mastery gradually','divide work into stages and mark progress'],['thinks independently and likes unusual solutions and choice','limits work when their purpose is clear'],['is receptive to imagery, mood and unspoken signals','use gentle transitions, creativity and quiet recovery']],
    nl:[['schakelt snel in, handelt direct en leert door te doen','geef veilige ruimte voor energie en kleine zelfstandige taken'],['beweegt in eigen tempo en waardeert voorspelbaarheid en lichamelijk comfort','kondig veranderingen op tijd en zonder druk aan'],['leeft op van vragen, gesprek en afwisseling','houd interesse vast met variatie en korte taken'],['voelt sfeer snel aan en heeft nabijheid nodig','rustig contact werkt beter dan harde druk'],['bloeit op wanneer talent wordt gezien','concrete oprechte waardering werkt beter dan vleierij'],['ziet details, zoekt nut en wil een duidelijke volgorde','maak van nauwkeurigheid geen angst voor fouten'],['hecht aan relaties, eerlijkheid en evenwicht','beslissen lukt beter na rustig overleg'],['beleeft intens, onthoudt belangrijke gevoelens en waardeert eerlijkheid','lach gevoelens niet weg en eis geen directe openheid'],['zoekt betekenis, vrijheid en een ruim perspectief','motiveer met een betekenisvol doel'],['neemt plichten serieus en bouwt vaardigheid stap voor stap op','deel taken op en markeer vooruitgang'],['denkt onafhankelijk en houdt van bijzondere oplossingen en keuze','grenzen werken wanneer het doel duidelijk is'],['is gevoelig voor beelden, sfeer en onuitgesproken signalen','gebruik zachte overgangen, creativiteit en rustige hersteltijd']]
  };

  const ELEMENT_GUIDE = {
    ru:{fire:{emotion:'Эмоция поднимается быстро и заметно; успокоение приходит через движение, признание чувства и ясный следующий шаг.',communication:'Лучше говорить прямо и коротко, без долгого вступления.',learning:'Информация усваивается через действие, соревнование с самим собой и быстрый отклик.',social:'В контакте важны живость, честность и возможность проявить инициативу.'},earth:{emotion:'Эмоции раскрываются медленно; помогают телесный комфорт, предсказуемость и время.',communication:'Нужны конкретные слова, примеры и отсутствие спешки.',learning:'Лучше работает последовательная практика, наглядность и понятная польза.',social:'Доверие строится через надёжность и повторяющийся спокойный контакт.'},air:{emotion:'Чувство легче понять через разговор, вопрос или смену обстановки.',communication:'Диалог, выбор формулировок и возможность задать вопросы особенно важны.',learning:'Подходят обсуждение, короткие блоки, связи между темами и разнообразие.',social:'Контакт возникает через общие идеи, юмор и обмен информацией.'},water:{emotion:'Ребёнок глубоко впитывает атмосферу; помогают близость, тишина, вода, музыка и мягкий ритм.',communication:'Сначала нужен безопасный тон, потом содержание разговора.',learning:'Лучше запоминаются истории, образы, эмоциональные связи и поддерживающий взрослый.',social:'Для раскрытия нужны доверие, бережность и время привыкнуть.'}},
    ua:{fire:{emotion:'Емоція піднімається швидко; заспокоєнню допомагають рух, визнання почуття й зрозумілий наступний крок.',communication:'Говоріть прямо й коротко.',learning:'Інформація засвоюється через дію, особистий виклик і швидкий відгук.',social:'У контакті важливі жвавість, чесність та ініціатива.'},earth:{emotion:'Емоції розкриваються повільно; допомагають тілесний комфорт, передбачуваність і час.',communication:'Потрібні конкретні слова, приклади й відсутність поспіху.',learning:'Працюють послідовна практика, наочність і зрозуміла користь.',social:'Довіра будується через надійний спокійний контакт.'},air:{emotion:'Почуття легше зрозуміти через розмову, запитання або зміну обстановки.',communication:'Важливі діалог, вибір формулювань і можливість запитувати.',learning:'Підходять обговорення, короткі блоки, зв’язки між темами й різноманітність.',social:'Контакт виникає через спільні ідеї, гумор та обмін інформацією.'},water:{emotion:'Дитина глибоко вбирає атмосферу; допомагають близькість, тиша, вода, музика й м’який ритм.',communication:'Спочатку потрібен безпечний тон, потім зміст.',learning:'Краще запам’ятовуються історії, образи, емоційні зв’язки й підтримка дорослого.',social:'Для розкриття потрібні довіра, дбайливість і час.'}},
    en:{fire:{emotion:'Feelings rise quickly and visibly; movement, naming the feeling and a clear next step help regulation.',communication:'Use direct, brief language without a long introduction.',learning:'Learning improves through action, personal challenge and quick feedback.',social:'Liveliness, honesty and room to initiate matter in relationships.'},earth:{emotion:'Feelings unfold slowly; physical comfort, predictability and time help.',communication:'Use concrete words, examples and no rushing.',learning:'Sequential practice, visible examples and clear usefulness work best.',social:'Trust grows through reliability and repeated calm contact.'},air:{emotion:'A feeling becomes easier to understand through words, questions or a change of scene.',communication:'Dialogue, wording choices and questions matter.',learning:'Discussion, short blocks, connections and variety support attention.',social:'Shared ideas, humour and information create contact.'},water:{emotion:'The child absorbs atmosphere deeply; closeness, quiet, water, music and a gentle rhythm can help.',communication:'A safe tone must come before the content.',learning:'Stories, images, emotional links and a supportive adult improve recall.',social:'Trust, gentleness and time are needed to open up.'}},
    nl:{fire:{emotion:'Gevoelens komen snel en zichtbaar op; beweging, erkenning en een duidelijke volgende stap helpen.',communication:'Praat direct en kort, zonder lange inleiding.',learning:'Leren gaat beter via actie, persoonlijke uitdaging en snelle feedback.',social:'Levendigheid, eerlijkheid en initiatief zijn belangrijk in contact.'},earth:{emotion:'Gevoelens ontvouwen langzaam; lichamelijk comfort, voorspelbaarheid en tijd helpen.',communication:'Gebruik concrete woorden en voorbeelden zonder haast.',learning:'Stapsgewijze oefening, zichtbare voorbeelden en duidelijk nut werken goed.',social:'Vertrouwen groeit door betrouwbaarheid en rustig herhaald contact.'},air:{emotion:'Een gevoel wordt begrijpelijker via woorden, vragen of een andere omgeving.',communication:'Dialoog, keuze in formulering en vragen zijn belangrijk.',learning:'Gesprek, korte blokken, verbanden en afwisseling ondersteunen aandacht.',social:'Gedeelde ideeën, humor en informatie maken contact.'},water:{emotion:'Het kind neemt sfeer diep op; nabijheid, stilte, water, muziek en een zacht ritme helpen.',communication:'Een veilige toon komt vóór de inhoud.',learning:'Verhalen, beelden, emotionele verbanden en een steunende volwassene helpen onthouden.',social:'Vertrouwen, zachtheid en tijd zijn nodig om open te bloeien.'}}
  };

  const SPORT = {
    ru:[['короткий бег','единоборства','хоккей','активные игровые тренировки'],['гимнастика','танцы','йога','плавание в спокойном темпе'],['лёгкая атлетика','футбол','баскетбол','эстафеты'],['плавание','прыжки в воду','йога','индивидуальные занятия с заботливым тренером'],['гимнастика','теннис','танцы','акробатика'],['велосипед','гребля','бадминтон','шахматы'],['теннис','фехтование','парные танцы','бадминтон'],['единоборства','скалолазание','дайвинг','стрельба'],['туризм','конный спорт','ориентирование','велосипед'],['бег на выносливость','лыжи','скалолазание','силовая подготовка'],['сноуборд','велосипед','серфинг','командные игры'],['плавание','танцы','йога','парусный спорт']],
    ua:[['короткий біг','єдиноборства','хокей','активні ігрові тренування'],['гімнастика','танці','йога','спокійне плавання'],['легка атлетика','футбол','баскетбол','естафети'],['плавання','стрибки у воду','йога','індивідуальні заняття з турботливим тренером'],['гімнастика','теніс','танці','акробатика'],['велосипед','веслування','бадмінтон','шахи'],['теніс','фехтування','парні танці','бадмінтон'],['єдиноборства','скелелазіння','дайвінг','стрільба'],['туризм','кінний спорт','орієнтування','велосипед'],['біг на витривалість','лижі','скелелазіння','силова підготовка'],['сноуборд','велосипед','серфінг','командні ігри'],['плавання','танці','йога','вітрильний спорт']],
    en:[['sprints','martial arts','hockey','fast game-based training'],['gymnastics','dance','yoga','steady swimming'],['athletics','football','basketball','relay games'],['swimming','diving','yoga','individual training with a caring coach'],['gymnastics','tennis','dance','acrobatics'],['cycling','rowing','badminton','chess'],['tennis','fencing','partner dance','badminton'],['martial arts','climbing','diving','archery'],['hiking','horse riding','orienteering','cycling'],['endurance running','skiing','climbing','strength training'],['snowboarding','cycling','surfing','team games'],['swimming','dance','yoga','sailing']],
    nl:[['sprint','vechtsport','hockey','snelle speltraining'],['gymnastiek','dans','yoga','rustig zwemmen'],['atletiek','voetbal','basketbal','estafettes'],['zwemmen','schoonspringen','yoga','individuele training met een zorgzame coach'],['gymnastiek','tennis','dans','acrobatiek'],['fietsen','roeien','badminton','schaken'],['tennis','schermen','partnerdans','badminton'],['vechtsport','klimmen','duiken','boogschieten'],['wandelen','paardrijden','oriëntatie','fietsen'],['duurloop','skiën','klimmen','krachttraining'],['snowboarden','fietsen','surfen','teamsport'],['zwemmen','dans','yoga','zeilen']]
  };

  const MODALITY_LEARNING = {
    ru:{cardinal:'Лучше начинать с понятной цели и позволять ребёнку сделать первый шаг самому.',fixed:'Нужны устойчивый ритм, повторение и время довести навык до уверенности.',mutable:'Материал лучше делить на короткие части и менять способ объяснения, когда внимание падает.'},
    ua:{cardinal:'Починайте зі зрозумілої мети й дозвольте дитині зробити перший крок самостійно.',fixed:'Потрібні сталий ритм, повторення й час довести навичку до впевненості.',mutable:'Діліть матеріал на короткі частини й змінюйте спосіб пояснення.'},
    en:{cardinal:'Start with a clear goal and let the child take the first step.',fixed:'Use a steady rhythm, repetition and enough time to build confidence.',mutable:'Break material into short parts and change the explanation when attention drops.'},
    nl:{cardinal:'Start met een duidelijk doel en laat het kind de eerste stap zetten.',fixed:'Gebruik een vast ritme, herhaling en genoeg tijd voor vertrouwen.',mutable:'Verdeel materiaal in korte stukken en wissel uitleg af wanneer aandacht daalt.'}
  };

  const BODY_NAMES = ['Sun','Moon','Mercury','Venus','Mars','Jupiter','Saturn','Uranus','Neptune','Pluto'];
  const ICONS = {portrait:'home',character:'children',emotions:'consultations',communication:'consultations',learning:'method',strengths:'home',challenges:'settings',social:'children',sport:'method',parents:'consultations',facts:'settings'};

  function lang() { return I18N[currentLanguage] ? currentLanguage : 'nl'; }
  function t() { return I18N[lang()]; }
  function fill(template, values) { return Object.keys(values).reduce((text, key) => text.replaceAll(`{${key}}`, values[key]), template); }
  function esc(value) { return String(value ?? '').replace(/[&<>'"]/g, (char) => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char])); }
  function norm(degrees) { return ((degrees % 360) + 360) % 360; }
  function signIndex(longitude) { return Math.floor(norm(longitude) / 30); }
  function signName(index) { return t().signs[(index + 12) % 12]; }
  function localDateTimeToUtc(dateText, timeText, timeZone) {
    const [year, month, day] = dateText.split('-').map(Number);
    const [hour, minute] = timeText.split(':').map(Number);
    const target = Date.UTC(year, month - 1, day, hour, minute || 0, 0);
    let guess = target;
    for (let i = 0; i < 3; i += 1) {
      const parts = new Intl.DateTimeFormat('en-CA', {timeZone, year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit',hourCycle:'h23'}).formatToParts(new Date(guess));
      const part = Object.fromEntries(parts.map((item) => [item.type, item.value]));
      const represented = Date.UTC(Number(part.year), Number(part.month)-1, Number(part.day), Number(part.hour), Number(part.minute), Number(part.second));
      guess += target - represented;
    }
    return new Date(guess);
  }
  function eclipticLongitude(body, date) {
    return norm(Astronomy.Ecliptic(Astronomy.GeoVector(Astronomy.Body[body], date, true)).elon);
  }
  function ascendantLongitude(date, latitude, longitude) {
    const theta = norm(Astronomy.SiderealTime(date) * 15 + Number(longitude)) * Math.PI / 180;
    const phi = Number(latitude) * Math.PI / 180;
    const days = (date.getTime() - Date.UTC(2000,0,1,12)) / 86400000;
    const epsilon = (23.439291 - 0.00000036 * days) * Math.PI / 180;
    return norm(Math.atan2(-Math.cos(theta), Math.sin(theta) * Math.cos(epsilon) + Math.tan(phi) * Math.sin(epsilon)) * 180 / Math.PI + 180);
  }
  function wholeSignHouse(longitude, ascendant) { return Math.floor(norm(longitude - Math.floor(ascendant / 30) * 30) / 30) + 1; }

  function calculateChart(child, force) {
    if (!window.Astronomy || !child.birthDate || !child.timezone || child.latitude == null || child.longitude == null) throw new Error('missing-data');
    const knownTime = !child.birthTimeUnknown && Boolean(child.birthTime);
    const time = knownTime ? child.birthTime : '12:00';
    const date = localDateTimeToUtc(child.birthDate, time, child.timezone);
    const positions = {};
    BODY_NAMES.forEach((body) => { positions[body] = {longitude:eclipticLongitude(body, date)}; });
    let moonAmbiguous = false;
    let moonSigns = [signIndex(positions.Moon.longitude)];
    if (!knownTime) {
      const start = localDateTimeToUtc(child.birthDate, '00:01', child.timezone);
      const end = localDateTimeToUtc(child.birthDate, '23:59', child.timezone);
      moonSigns = [...new Set([signIndex(eclipticLongitude('Moon', start)), signIndex(eclipticLongitude('Moon', end))])];
      moonAmbiguous = moonSigns.length > 1;
    }
    let ascendant = null;
    if (knownTime) {
      ascendant = ascendantLongitude(date, child.latitude, child.longitude);
      BODY_NAMES.forEach((body) => { positions[body].house = wholeSignHouse(positions[body].longitude, ascendant); });
    }
    BODY_NAMES.forEach((body) => { positions[body].sign = signIndex(positions[body].longitude); });
    const aspectTargets = [{key:'conjunction',angle:0,orb:8},{key:'sextile',angle:60,orb:5},{key:'square',angle:90,orb:7},{key:'trine',angle:120,orb:7},{key:'opposition',angle:180,orb:8}];
    const aspects = [];
    for (let i = 0; i < BODY_NAMES.length; i += 1) for (let j = i + 1; j < BODY_NAMES.length; j += 1) {
      const a = BODY_NAMES[i], b = BODY_NAMES[j];
      if (!knownTime && (a === 'Moon' || b === 'Moon')) continue;
      const raw = Math.abs(positions[a].longitude - positions[b].longitude);
      const distance = Math.min(raw, 360 - raw);
      aspectTargets.forEach((target) => {
        const orb = Math.abs(distance - target.angle);
        if (orb <= target.orb) aspects.push({a,b,type:target.key,angle:target.angle,orb});
      });
    }
    aspects.sort((a,b) => a.orb - b.orb);
    const counts = {fire:0,earth:0,air:0,water:0};
    ['Sun','Moon','Mercury','Venus','Mars','Jupiter','Saturn'].forEach((body) => { if (!(moonAmbiguous && body === 'Moon')) counts[SIGN_ELEMENT[positions[body].sign]] += 1; });
    const dominantElement = Object.keys(counts).sort((a,b) => counts[b]-counts[a])[0];
    const chart = {calculatedAt:new Date().toISOString(), engine:'Astronomy Engine 2.x / VSOP87', dateUtc:date.toISOString(), knownTime, moonAmbiguous, moonSigns, ascendant, positions, aspects, dominantElement};
    if (force || !child.natalChart) {
      child.natalChart = chart;
      child.sunSign = signName(positions.Sun.sign);
      child.moonSign = moonAmbiguous ? moonSigns.map(signName).join(' / ') : signName(positions.Moon.sign);
      child.mercurySign = signName(positions.Mercury.sign);
      child.marsSign = signName(positions.Mars.sign);
      localStorage.setItem('children', JSON.stringify(children));
    }
    return chart;
  }

  function relevantAspect(chart, body, used) {
    const found = chart.aspects.find((aspect) => (aspect.a === body || aspect.b === body) && !used.has(`${aspect.a}-${aspect.b}`));
    if (found) used.add(`${found.a}-${found.b}`);
    return found;
  }
  function aspectText(aspect) {
    if (!aspect) return t().noStrongAspect;
    const values = {a:t().planetNames[aspect.a],b:t().planetNames[aspect.b],aspect:t().aspectNames[aspect.type],roleA:t().role[aspect.a],roleB:t().role[aspect.b]};
    if (aspect.type === 'conjunction') return fill(t().aspectConj, values);
    return fill(['square','opposition'].includes(aspect.type) ? t().aspectHard : t().aspectSoft, values);
  }
  function houseText(body, chart) {
    const house = chart.positions[body].house;
    if (!house) return '';
    return fill(t().houseLine, {planet:t().planetNames[body],house,theme:t().houseThemes[house-1]});
  }
  function degreeText(position) { return `${signName(position.sign)} ${String((position.longitude % 30).toFixed(2)).replace('.', lang()==='en'?'.':',')}°`; }
  function icon(name) { return `<img class="analysis-card-icon" src="assets/nav-icons/${ICONS[name]}.png?v=${VERSION}" alt="">`; }
  function section(name, body) { return `<article class="analysis-section analysis-${name}">${icon(name)}<div><h3>${esc(t()[name])}</h3>${body}</div></article>`; }
  function paragraphs(items) { return items.filter(Boolean).map((item) => `<p>${esc(item)}</p>`).join(''); }
  function list(items) { return `<ul>${[...new Set(items.filter(Boolean))].map((item) => `<li>${esc(item)}</li>`).join('')}</ul>`; }

  function buildAnalysis(child, chart) {
    const l = lang();
    const used = new Set();
    const sun = chart.positions.Sun, moon = chart.positions.Moon, mercury = chart.positions.Mercury, venus = chart.positions.Venus, mars = chart.positions.Mars;
    const sunTrait = SIGN_TRAITS[l][sun.sign];
    const moonElement = ELEMENT_GUIDE[l][SIGN_ELEMENT[moon.sign]];
    const mercuryElement = ELEMENT_GUIDE[l][SIGN_ELEMENT[mercury.sign]];
    const venusElement = ELEMENT_GUIDE[l][SIGN_ELEMENT[venus.sign]];
    const sunAspect = relevantAspect(chart,'Sun',used), moonAspect = chart.knownTime ? relevantAspect(chart,'Moon',used) : null, mercuryAspect = relevantAspect(chart,'Mercury',used), venusAspect = relevantAspect(chart,'Venus',used), marsAspect = relevantAspect(chart,'Mars',used);
    const dominant = fill(t().dominant,{element:t().elementNames[chart.dominantElement]});
    const moonLabel = chart.moonAmbiguous ? chart.moonSigns.map(signName).join(' / ') : signName(moon.sign);
    const portraitSigns = l==='ru' ? `Солнце — ${signName(sun.sign)}, Луна — ${moonLabel}, Меркурий — ${signName(mercury.sign)}, Марс — ${signName(mars.sign)}.` : l==='ua' ? `Сонце — ${signName(sun.sign)}, Місяць — ${moonLabel}, Меркурій — ${signName(mercury.sign)}, Марс — ${signName(mars.sign)}.` : l==='en' ? `Sun — ${signName(sun.sign)}, Moon — ${moonLabel}, Mercury — ${signName(mercury.sign)}, Mars — ${signName(mars.sign)}.` : `Zon — ${signName(sun.sign)}, Maan — ${moonLabel}, Mercurius — ${signName(mercury.sign)}, Mars — ${signName(mars.sign)}.`;
    const portrait = `${child.name}. ${portraitSigns} ${dominant}`;
    const strengths = [t().strengthItems[ELEMENTS.indexOf(chart.dominantElement)], chart.aspects.some(a=>['trine','sextile'].includes(a.type)) ? t().strengthItems[1] : t().strengthItems[2], t().strengthItems[3],t().strengthItems[4]].filter(Boolean);
    const challengeAspect = chart.aspects.find((a) => ['square','opposition'].includes(a.type) && !used.has(`${a.a}-${a.b}`));
    if (challengeAspect) used.add(`${challengeAspect.a}-${challengeAspect.b}`);
    const sportNames = SPORT[l][mars.sign].join(', ');
    const sportIntro = l==='ru' ? `Марс в знаке ${signName(mars.sign)} показывает стиль действия. В качестве пробных направлений подойдут: ${sportNames}. Важнее названия секции — темп, атмосфера и контакт с тренером.` : l==='ua' ? `Марс у знаку ${signName(mars.sign)} показує стиль дії. Для проби підійдуть: ${sportNames}. Важливіші за назву секції темп, атмосфера й контакт із тренером.` : l==='en' ? `Mars in ${signName(mars.sign)} describes the action style. Good options to try include ${sportNames}. The pace, atmosphere and coach relationship matter more than the label.` : `Mars in ${signName(mars.sign)} laat de actiestijl zien. Mogelijke sporten zijn ${sportNames}. Tempo, sfeer en contact met de trainer zijn belangrijker dan het etiket.`;
    const learningIntro = l==='ru' ? `Меркурий в знаке ${signName(mercury.sign)}: ${mercuryElement.learning} ${MODALITY_LEARNING[l][SIGN_MODALITY[mercury.sign]]}` : l==='ua' ? `Меркурій у знаку ${signName(mercury.sign)}: ${mercuryElement.learning} ${MODALITY_LEARNING[l][SIGN_MODALITY[mercury.sign]]}` : l==='en' ? `Mercury in ${signName(mercury.sign)}: ${mercuryElement.learning} ${MODALITY_LEARNING[l][SIGN_MODALITY[mercury.sign]]}` : `Mercurius in ${signName(mercury.sign)}: ${mercuryElement.learning} ${MODALITY_LEARNING[l][SIGN_MODALITY[mercury.sign]]}`;
    const content = [];
    content.push(section('portrait', paragraphs([portrait])));
    content.push(section('character', paragraphs([sunTrait[0], houseText('Sun',chart), aspectText(sunAspect)])));
    content.push(section('emotions', paragraphs([chart.moonAmbiguous?t().moonAmbiguous:moonElement.emotion, houseText('Moon',chart), chart.knownTime?aspectText(moonAspect):''])));
    content.push(section('communication', paragraphs([mercuryElement.communication, houseText('Mercury',chart)])));
    content.push(section('learning', paragraphs([learningIntro, aspectText(mercuryAspect)])));
    content.push(section('strengths', list(strengths)));
    content.push(section('challenges', paragraphs([t().challengeHard, challengeAspect ? aspectText(challengeAspect) : '',t().challengeBalance])));
    content.push(section('social', paragraphs([venusElement.social,houseText('Venus',chart),aspectText(venusAspect)])));
    content.push(section('sport', paragraphs([sportIntro,houseText('Mars',chart),aspectText(marsAspect)])));
    content.push(section('parents', list(t().parentActions)));
    const planetRows = BODY_NAMES.map((body) => `<tr><td>${esc(t().planetNames[body])}</td><td>${esc(degreeText(chart.positions[body]))}</td><td>${chart.positions[body].house||'—'}</td></tr>`).join('');
    const aspectRows = chart.aspects.slice(0,12).map((a) => `<li>${esc(t().planetNames[a.a])} — ${esc(t().planetNames[a.b])}: ${esc(t().aspectNames[a.type])}, ${a.orb.toFixed(2)}°</li>`).join('');
    const facts = `<details class="analysis-facts"><summary>${esc(t().facts)}</summary>${chart.knownTime?`<p>${esc(t().houseMethod)}</p>`:`<p>${esc(t().reliableOnly)}</p>`}<h4>${esc(t().planets)}</h4><div class="analysis-table-wrap"><table><thead><tr><th>${esc(t().planets)}</th><th>°</th><th>${esc(t().houses)}</th></tr></thead><tbody>${planetRows}</tbody></table></div><h4>${esc(t().aspects)}</h4><ul>${aspectRows}</ul><small>${esc(chart.engine)}</small></details>`;
    return `<header class="analysis-hero"><div><span class="analysis-kicker">CHILD ASTROLOGY · Ella Kristioglo</span><h2>${esc(child.name)}</h2><p>${esc(t().title)}</p></div><button class="analysis-close" type="button" aria-label="${esc(t().close)}">×</button></header>${!chart.knownTime?`<div class="analysis-notice">${esc(t().reliableOnly)}</div>`:''}<div class="analysis-grid">${content.join('')}</div>${facts}<p class="analysis-disclaimer">${esc(t().disclaimer)}</p>`;
  }

  function openAnalysis(id, force) {
    const child = children.find((item) => Number(item.id) === Number(id));
    if (!child) return;
    let chart;
    try { chart = calculateChart(child, force); }
    catch (error) { window.alert(error.message === 'missing-data' ? t().missingPlace : t().calculationError); return; }
    document.querySelector('.child-analysis-modal')?.remove();
    const modal = document.createElement('div');
    modal.className = 'child-analysis-modal';
    modal.innerHTML = `<div class="child-analysis-overlay"><div class="child-analysis-dialog" role="dialog" aria-modal="true">${buildAnalysis(child,chart)}</div></div>`;
    modal.querySelector('.child-analysis-dialog').dataset.childId = String(child.id);
    modal.querySelector('.analysis-close').addEventListener('click', () => closeAnalysis());
    modal.querySelector('.child-analysis-overlay').addEventListener('click', (event) => { if (event.target.classList.contains('child-analysis-overlay')) closeAnalysis(); });
    modal.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeAnalysis(); });
    document.body.appendChild(modal); document.body.classList.add('analysis-open');
  }
  function closeAnalysis() { document.querySelector('.child-analysis-modal')?.remove(); document.body.classList.remove('analysis-open'); }

  function renderChildren() {
    const grid = document.getElementById('childrenGrid');
    if (!grid) return;
    if (!children.length) { grid.innerHTML = `<p class="children-empty">${esc(t().noChildren)}</p>`; return; }
    grid.innerHTML = children.map((child) => {
      let chart = child.natalChart;
      try { chart = calculateChart(child, false); } catch (_) { chart = null; }
      const badges = chart ? ['Sun','Moon','Mercury','Mars'].map((body) => `<span class="zodiac-badge">${esc(t().planetNames[body])}: ${esc(body==='Moon'&&chart.moonAmbiguous?chart.moonSigns.map(signName).join(' / '):signName(chart.positions[body].sign))}</span>`).join('') : '';
      return `<article class="child-card"><div class="child-name">${esc(child.name)}</div>${child.birthDate?`<div class="child-info">${esc(child.birthDate)}</div>`:''}<div class="child-info">${child.birthTimeUnknown?esc(t().unknownTime):esc(child.birthTime||'')}</div>${child.birthPlace?`<div class="child-info">${esc(child.birthPlace)}</div>`:''}<div class="zodiac-badges">${badges}</div><div class="child-card-actions"><button class="btn btn-primary" type="button" onclick="showChildAnalysis(${Number(child.id)})">${esc(t().fullAnalysis)}</button><button class="btn btn-secondary" type="button" onclick="deleteChild(${Number(child.id)})">${esc(t().delete)}</button></div></article>`;
    }).join('');
  }

  const previousChangeLanguage = window.changeLanguage;
  window.changeLanguage = function (language, event) {
    previousChangeLanguage(language,event);
    syncLanguageButtons();
    renderChildren();
    const openId = document.querySelector('.child-analysis-dialog')?.dataset.childId;
    if (openId) openAnalysis(openId,false);
  };
  function syncLanguageButtons() {
    document.querySelectorAll('.lang-btn').forEach((button) => button.classList.toggle('active',button.dataset.language === currentLanguage || button.textContent.trim().toLowerCase() === currentLanguage));
    document.querySelectorAll('[data-analysis-label="language"]').forEach((node) => { node.textContent = t().language; });
  }
  window.showChildAnalysis = openAnalysis;
  window.closeChildAnalysis = closeAnalysis;
  window.calculateChildNatalChart = calculateChart;
  window.buildChildAnalysis = buildAnalysis;
  window.loadChildren = renderChildren;

  document.addEventListener('DOMContentLoaded', () => { syncLanguageButtons(); renderChildren(); });
})();

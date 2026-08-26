(function () {
  'use strict';

  const VERSION = '20260826f';
  const CALCULATION_VERSION = 'placidus-topocentric-retrograde-20260826-4';
  const SIGN_KEYS = ['aries','taurus','gemini','cancer','leo','virgo','libra','scorpio','sagittarius','capricorn','aquarius','pisces'];
  const ELEMENTS = ['fire','earth','air','water'];
  const MODALITIES = ['cardinal','fixed','mutable'];
  const SIGN_ELEMENT = ['fire','earth','air','water','fire','earth','air','water','fire','earth','air','water'];
  const SIGN_MODALITY = ['cardinal','fixed','mutable','cardinal','fixed','mutable','cardinal','fixed','mutable','cardinal','fixed','mutable'];

  const I18N = {
    ru: {
      language:'Язык', fullAnalysis:'Полный разбор', recalculate:'Пересчитать карту', delete:'Удалить', noChildren:'Пока нет добавленных детей', unknownTime:'Время неизвестно', close:'Закрыть',
      title:'Персональный разбор ребёнка', portrait:'Основной портрет', character:'Характер', emotions:'Эмоции и восстановление', communication:'Общение', speech:'Речь и Меркурий', learning:'Обучение', strengths:'Сильные стороны', challenges:'Что может даваться сложнее', health:'Самочувствие: что наблюдать', social:'Социализация', sport:'Спорт и движение', parents:'Что важно родителям', facts:'Расчёт карты', planets:'Планеты', aspects:'Основные аспекты', houses:'Дома',
      mercuryRetroIntro:'На момент рождения Меркурий двигался ретроградно. В астрологической традиции это связывают с более индивидуальным способом обдумывать и выражать мысли: ребёнок может дольше подбирать слова и отвечать после паузы — или, наоборот, говорить быстро, много и перескакивать между темами. Научных доказательств, что ретроградный Меркурий вызывает задержку речи или болтливость, нет. Это только гипотеза для наблюдения.',
      mercuryRetroSlow:'В этой карте больше оснований наблюдать внутреннюю подготовку речи: ребёнку может требоваться дополнительное время, чтобы понять вопрос, подобрать слово и сформулировать ответ.',
      mercuryRetroFast:'В этой карте больше оснований наблюдать быстрый речевой поток: мысль может опережать формулировку, поэтому ребёнок иногда перебивает, повторяется или резко меняет тему.',
      mercuryRetroMixed:'Возможны оба режима: в безопасной знакомой обстановке ребёнок говорит много, а под давлением, при усталости или с незнакомым человеком замолкает и отвечает медленнее.',
      speechActions:['Задайте один короткий вопрос и спокойно подождите 5–10 секунд, не заканчивая фразу за ребёнка.','Расширяйте речь без исправления: на «машина едет» ответьте «Да, красная машина едет быстро».','Каждый день читайте, пойте и играйте в диалог; чаще комментируйте происходящее и реже проверяйте ребёнка вопросами.','Наблюдайте отдельно за пониманием речи, жестами, новыми словами, связными фразами и тем, насколько ребёнка понимают другие.','Не сравнивайте с другими детьми и не объясняйте реальные трудности только натальной картой.'],
      speechReferral:'Если речь или понимание заметно не соответствуют возрасту, новые навыки долго не появляются, ребёнку трудно сообщать о потребностях либо он потерял уже приобретённые слова или навыки, не ждите. Обсудите это с педиатром, семейным врачом или consultatiebureau, пройдите оценку у логопеда и попросите проверить слух. Специалист учитывает возраст, используемые языки, развитие, здоровье и результаты наблюдения.',
      reliableOnly:'Без точного времени рождения мы не используем дома и другие показатели, зависящие от времени. Показаны только надёжно рассчитываемые части карты.', moonAmbiguous:'В этот день Луна меняла знак. Поэтому мы не закрепляем за ребёнком один лунный сценарий и предлагаем наблюдать оба варианта.',
      houseMethod:'Дома рассчитаны по системе Плацидуса с учётом точного местного времени, координат и исторического часового пояса. Асцендент используется только как математическая граница 1-го дома и не берётся за основу психологического разбора.',
      disclaimer:'Это не диагноз и не предсказание. Сверяйте выводы с живыми наблюдениями за ребёнком.', calculationError:'Не удалось рассчитать карту. Проверьте дату, время и выбранный город.', missingPlace:'Для точного расчёта откройте профиль заново и выберите город из выпадающего списка.',
      dominant:'В карте заметнее всего стихия {element}. Это задаёт общий способ реагирования, но не отменяет другие качества.', houseLine:'{planet} в {house}-м доме: эта тема особенно проявляется через {theme}.',
      aspectHard:'Связь {a} и {b} через {aspect} создаёт внутреннее напряжение между темами «{roleA}» и «{roleB}». Здесь полезны пауза, понятные границы и возможность попробовать ещё раз без стыда.',
      aspectSoft:'Связь {a} и {b} через {aspect} помогает соединять «{roleA}» и «{roleB}». Это ресурс, который раскрывается сильнее, когда ребёнку дают практику и доверяют результат.',
      aspectConj:'Соединение {a} и {b} делает темы «{roleA}» и «{roleB}» почти неразделимыми. Реакция может быть яркой, поэтому важно учить замечать её раньше, чем она накопится.',
      noStrongAspect:'В этой теме нет одного доминирующего аспекта: полезнее смотреть на знак, дом и реальные реакции ребёнка.',
      strengthItems:['наблюдательность','способность учиться через опыт','верность своим интересам','чувство собственного ритма','умение восстанавливаться при поддержке'],
      challengeHard:'Напряжённые аспекты не означают проблему. Они показывают навык, которому ребёнку может потребоваться больше времени и безопасной практики.', challengeBalance:'Если ребёнок устаёт или сопротивляется, сначала проверьте нагрузку и чувство безопасности, а уже потом требуйте результат.',
      healthItems:['Натальная карта не показывает болезни. Для здоровья важнее реальные симптомы, обследование и рекомендации врача.','Отмечайте изменения сна, аппетита, энергии, боли и поведения: когда начались, сколько длятся и что им предшествовало.','Повторяющиеся или усиливающиеся симптомы обсудите с педиатром. При затруднённом дыхании, нарушении сознания, судорогах, сильной боли или резком ухудшении нужна срочная медицинская помощь.'],
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
      title:'Персональний розбір дитини', portrait:'Основний портрет', character:'Характер', emotions:'Емоції та відновлення', communication:'Спілкування', speech:'Мовлення і Меркурій', learning:'Навчання', strengths:'Сильні сторони', challenges:'Що може даватися складніше', health:'Самопочуття: за чим спостерігати', social:'Соціалізація', sport:'Спорт і рух', parents:'Що важливо батькам', facts:'Розрахунок карти', planets:'Планети', aspects:'Основні аспекти', houses:'Будинки',
      mercuryRetroIntro:'На момент народження Меркурій рухався ретроградно. В астрологічній традиції це пов’язують з індивідуальним способом обдумувати й висловлювати думки: дитина може довше добирати слова та відповідати після паузи — або, навпаки, говорити швидко, багато й перескакувати між темами. Наукових доказів, що ретроградний Меркурій спричиняє затримку мовлення чи балакучість, немає. Це лише гіпотеза для спостереження.',
      mercuryRetroSlow:'У цій карті більше підстав спостерігати внутрішню підготовку мовлення: дитині може бути потрібно більше часу, щоб зрозуміти запитання, дібрати слово й сформулювати відповідь.',
      mercuryRetroFast:'У цій карті більше підстав спостерігати швидкий мовленнєвий потік: думка може випереджати формулювання, тому дитина іноді перебиває, повторюється або різко змінює тему.',
      mercuryRetroMixed:'Можливі обидва режими: у безпечному знайомому середовищі дитина говорить багато, а під тиском, при втомі або з незнайомою людиною замовкає й відповідає повільніше.',
      speechActions:['Поставте одне коротке запитання й спокійно зачекайте 5–10 секунд, не закінчуючи фразу за дитину.','Розширюйте мовлення без виправлення: на «машина їде» відповідайте «Так, червона машина їде швидко».','Щодня читайте, співайте й грайте в діалог; частіше коментуйте події та рідше перевіряйте дитину запитаннями.','Окремо спостерігайте за розумінням мовлення, жестами, новими словами, зв’язними фразами й тим, наскільки дитину розуміють інші.','Не порівнюйте з іншими дітьми й не пояснюйте реальні труднощі лише натальною картою.'],
      speechReferral:'Якщо мовлення або розуміння помітно не відповідають віку, нові навички довго не з’являються, дитині складно повідомляти про потреби або вона втратила вже набуті слова чи навички, не чекайте. Зверніться до педіатра, сімейного лікаря або consultatiebureau, пройдіть оцінювання в логопеда й попросіть перевірити слух. Фахівець врахує вік, мови дитини, розвиток, здоров’я та спостереження.',
      reliableOnly:'Без точного часу народження ми не використовуємо будинки та інші залежні від часу показники. Показані лише надійно розраховані частини карти.', moonAmbiguous:'Цього дня Місяць змінював знак. Тому ми не закріплюємо один місячний сценарій і радимо спостерігати обидва варіанти.',
      houseMethod:'Будинки розраховані за системою Плацидуса з урахуванням точного місцевого часу, координат та історичного часового поясу. Асцендент використовується лише як математична межа 1-го будинку й не є основою психологічного розбору.',
      disclaimer:'Це не діагноз і не передбачення. Зіставляйте висновки з живими спостереженнями за дитиною.', calculationError:'Не вдалося розрахувати карту. Перевірте дату, час і вибране місто.', missingPlace:'Для точного розрахунку відкрийте профіль знову та виберіть місто зі списку.',
      dominant:'У карті найбільш помітна стихія {element}. Вона задає загальний спосіб реагування, але не скасовує інших якостей.', houseLine:'{planet} у {house}-му будинку: ця тема особливо проявляється через {theme}.',
      aspectHard:'Зв’язок {a} і {b} через {aspect} створює напруження між темами «{roleA}» і «{roleB}». Тут допомагають пауза, зрозумілі межі та можливість спробувати ще раз без сорому.', aspectSoft:'Зв’язок {a} і {b} через {aspect} допомагає поєднувати «{roleA}» і «{roleB}». Це ресурс, який розкривається через практику й довіру.', aspectConj:'З’єднання {a} і {b} робить теми «{roleA}» і «{roleB}» майже нероздільними. Реакція може бути яскравою, тому важливо помічати її до накопичення.', noStrongAspect:'У цій темі немає одного домінантного аспекту: корисніше дивитися на знак, будинок і реальні реакції дитини.',
      strengthItems:['спостережливість','здатність вчитися через досвід','вірність своїм інтересам','відчуття власного ритму','уміння відновлюватися за підтримки'], challengeHard:'Напружені аспекти не означають проблему. Вони показують навичку, якій може знадобитися більше часу та безпечної практики.', challengeBalance:'Якщо дитина втомлюється чи опирається, спочатку перевірте навантаження й відчуття безпеки.',
      healthItems:['Натальна карта не показує хвороб. Для здоров’я важливіші реальні симптоми, обстеження та рекомендації лікаря.','Відзначайте зміни сну, апетиту, енергії, біль і поведінку: коли вони почалися, скільки тривають і що їм передувало.','Повторювані або сильніші симптоми обговоріть із педіатром. За утрудненого дихання, порушення свідомості, судом, сильного болю чи різкого погіршення потрібна невідкладна медична допомога.'],
      parentActions:['Спочатку назвіть те, що бачите, і лише потім пропонуйте рішення.','Пояснюйте коротко, по одному кроку, а потім попросіть показати або переказати своїми словами.','Порівнюйте дитину лише з її власним попереднім результатом.','Обираючи школу, вчителя чи тренера, оцінюйте також тон спілкування дорослого.','Перевіряйте рекомендації спостереженням: реакція саме вашої дитини важливіша за будь-який опис.'],
      elementNames:{fire:'Вогню',earth:'Землі',air:'Повітря',water:'Води'}, aspectNames:{conjunction:'з’єднання',sextile:'секстиль',square:'квадратуру',trine:'трин',opposition:'опозицію'},
      role:{Sun:'воля та відчуття себе',Moon:'безпека й емоції',Mercury:'мислення й мова',Venus:'симпатії та контакт',Mars:'дія й межі',Jupiter:'зростання й упевненість',Saturn:'правила й самоконтроль',Uranus:'свобода й зміни',Neptune:'уява й чутливість',Pluto:'інтенсивність і внутрішня сила'},
      houseThemes:['самостійність і спосіб проявлятися','цінності, речі й відчуття стійкості','мову, запитання й близьке оточення','дім, сім’ю й особистий простір','гру, творчість і бажання бути поміченим','режим, навички й щоденні обов’язки','партнерство й уміння домовлятися','довіру, межі й глибокі переживання','інтерес до світу, мов і великих ідей','цілі, відповідальність і визнання','друзів, групи й незвичні інтереси','усамітнення, фантазію й відновлення'],
      signs:['Овен','Телець','Близнюки','Рак','Лев','Діва','Терези','Скорпіон','Стрілець','Козоріг','Водолій','Риби'], planetNames:{Sun:'Сонце',Moon:'Місяць',Mercury:'Меркурій',Venus:'Венера',Mars:'Марс',Jupiter:'Юпітер',Saturn:'Сатурн',Uranus:'Уран',Neptune:'Нептун',Pluto:'Плутон'}
    },
    en: {
      language:'Language', fullAnalysis:'Full child analysis', recalculate:'Recalculate chart', delete:'Delete', noChildren:'No children added yet', unknownTime:'Time unknown', close:'Close',
      title:'Personal child analysis', portrait:'Core portrait', character:'Character', emotions:'Emotions and recovery', communication:'Communication', speech:'Speech and Mercury', learning:'Learning', strengths:'Strengths', challenges:'What may take more effort', health:'Wellbeing: what to observe', social:'Social life', sport:'Sport and movement', parents:'What parents should know', facts:'Chart calculation', planets:'Planets', aspects:'Major aspects', houses:'Houses',
      mercuryRetroIntro:'Mercury was retrograde at birth. Astrological tradition links this with an individual way of processing and expressing thoughts: a child may take longer to find words and answer after a pause, or may speak quickly, at length and move rapidly between topics. There is no scientific evidence that retrograde Mercury causes delayed speech or talkativeness. Treat this only as an observation prompt.',
      mercuryRetroSlow:'This chart gives more reason to observe internal preparation before speaking: the child may need extra time to understand a question, retrieve a word and shape an answer.',
      mercuryRetroFast:'This chart gives more reason to observe a fast flow of speech: thought may run ahead of wording, so the child may interrupt, repeat or switch topics abruptly.',
      mercuryRetroMixed:'Both modes may appear: the child may speak freely in a safe, familiar setting, yet become quiet and answer more slowly under pressure, when tired or with unfamiliar people.',
      speechActions:['Ask one brief question and wait calmly for 5–10 seconds without finishing the sentence for the child.','Expand rather than correct: after “car goes”, respond “Yes, the red car is going fast”.','Read, sing and play conversational games every day; comment more and test with questions less.','Observe comprehension, gestures, new words, connected phrases and how well other people understand the child as separate skills.','Do not compare with other children or explain real communication difficulties through the birth chart alone.'],
      speechReferral:'If speech or understanding is clearly outside age expectations, new skills are not emerging, communication of needs is difficult, or previously acquired words or skills are lost, do not wait. Contact a paediatrician, family doctor or consultatiebureau, arrange an assessment with a speech-language therapist and ask for a hearing check. The professional will consider age, languages used, overall development, health and observed behaviour.',
      reliableOnly:'Without an exact birth time, houses and other time-dependent factors are not used. Only reliably calculated parts of the chart are shown.', moonAmbiguous:'The Moon changed signs on this date. We therefore do not assign one lunar pattern and suggest observing both possibilities.',
      houseMethod:'Houses are calculated with the Placidus system using the exact local time, coordinates and historical time zone. The Ascendant is used only as the mathematical cusp of house 1 and is not the basis of the psychological interpretation.', disclaimer:'This is not a diagnosis or prediction. Compare every insight with real observations of the child.', calculationError:'The chart could not be calculated. Check the date, time and selected city.', missingPlace:'For an accurate calculation, reopen the profile and select a city from the suggestion list.',
      dominant:'The {element} element is strongest in this chart. It shapes the general response style without cancelling other qualities.', houseLine:'{planet} in house {house}: this theme is especially expressed through {theme}.',
      aspectHard:'The {aspect} between {a} and {b} creates tension between “{roleA}” and “{roleB}”. A pause, clear boundaries and a chance to try again without shame are helpful here.', aspectSoft:'The {aspect} between {a} and {b} helps “{roleA}” and “{roleB}” work together. This resource grows through practice and trust.', aspectConj:'The conjunction of {a} and {b} closely merges “{roleA}” and “{roleB}”. Reactions may be vivid, so early recognition matters.', noStrongAspect:'There is no single dominant aspect here; the sign, house and the child’s real reactions are more useful.',
      strengthItems:['careful observation','learning through experience','loyalty to personal interests','a clear sense of personal pace','ability to recover with support'], challengeHard:'Challenging aspects do not mean a problem. They point to a skill that may need more time and safe practice.', challengeBalance:'If the child resists or tires quickly, check the load and sense of safety before asking for performance.',
      healthItems:['A natal chart cannot identify illness. Real symptoms, medical assessment and a clinician’s advice matter for health.','Note changes in sleep, appetite, energy, pain and behaviour: when they began, how long they last and what happened beforehand.','Discuss recurring or worsening symptoms with a paediatrician. Difficulty breathing, altered consciousness, seizures, severe pain or sudden deterioration need urgent medical care.'],
      parentActions:['Name what you see before offering a solution.','Explain one short step at a time, then ask the child to show or retell it.','Compare the child only with their own previous result.','When choosing a school, teacher or coach, assess the adult’s tone as well as the programme.','Test every suggestion through observation; the response of your actual child matters most.'],
      elementNames:{fire:'Fire',earth:'Earth',air:'Air',water:'Water'}, aspectNames:{conjunction:'conjunction',sextile:'sextile',square:'square',trine:'trine',opposition:'opposition'},
      role:{Sun:'will and sense of self',Moon:'safety and emotion',Mercury:'thinking and speech',Venus:'affection and connection',Mars:'action and boundaries',Jupiter:'growth and confidence',Saturn:'rules and self-control',Uranus:'freedom and change',Neptune:'imagination and sensitivity',Pluto:'intensity and inner power'},
      houseThemes:['independence and self-expression','values, possessions and stability','speech, questions and the immediate environment','home, family and private space','play, creativity and being seen','routine, skills and daily duties','partnership and negotiation','trust, boundaries and deep feelings','the wider world, languages and big ideas','goals, responsibility and recognition','friends, groups and unusual interests','solitude, imagination and recovery'],
      signs:['Aries','Taurus','Gemini','Cancer','Leo','Virgo','Libra','Scorpio','Sagittarius','Capricorn','Aquarius','Pisces'], planetNames:{Sun:'Sun',Moon:'Moon',Mercury:'Mercury',Venus:'Venus',Mars:'Mars',Jupiter:'Jupiter',Saturn:'Saturn',Uranus:'Uranus',Neptune:'Neptune',Pluto:'Pluto'}
    },
    nl: {
      language:'Taal', fullAnalysis:'Volledige kindanalyse', recalculate:'Horoscoop opnieuw berekenen', delete:'Verwijderen', noChildren:'Nog geen kinderen toegevoegd', unknownTime:'Tijd onbekend', close:'Sluiten',
      title:'Persoonlijke analyse van het kind', portrait:'Kernportret', character:'Karakter', emotions:'Emoties en herstel', communication:'Communicatie', speech:'Spraak en Mercurius', learning:'Leren', strengths:'Sterke kanten', challenges:'Wat meer moeite kan kosten', health:'Welzijn: waarop letten', social:'Socialisatie', sport:'Sport en beweging', parents:'Wat ouders moeten weten', facts:'Berekening van de kaart', planets:'Planeten', aspects:'Belangrijkste aspecten', houses:'Huizen',
      mercuryRetroIntro:'Mercurius liep retrograde bij de geboorte. Binnen de astrologische traditie wordt dit verbonden met een eigen manier van denken en formuleren: een kind kan langer naar woorden zoeken en pas na een pauze antwoorden, of juist snel en veel praten en vlug van onderwerp wisselen. Er is geen wetenschappelijk bewijs dat een retrograde Mercurius een spraakachterstand of praatzucht veroorzaakt. Gebruik dit uitsluitend als observatiehypothese.',
      mercuryRetroSlow:'Deze horoscoop geeft meer aanleiding om op innerlijke voorbereiding van spraak te letten: het kind kan extra tijd nodig hebben om een vraag te begrijpen, een woord te vinden en een antwoord te formuleren.',
      mercuryRetroFast:'Deze horoscoop geeft meer aanleiding om op een snelle spraakstroom te letten: de gedachte kan voor de formulering uitlopen, waardoor het kind soms onderbreekt, herhaalt of plots van onderwerp verandert.',
      mercuryRetroMixed:'Beide patronen kunnen voorkomen: in een veilige vertrouwde omgeving praat het kind veel, terwijl het onder druk, bij vermoeidheid of bij onbekenden stil wordt en langzamer antwoordt.',
      speechActions:['Stel één korte vraag en wacht rustig 5–10 seconden zonder de zin voor het kind af te maken.','Breid taal uit zonder te corrigeren: op “auto rijdt” antwoordt u “Ja, de rode auto rijdt snel”.','Lees, zing en speel dagelijks met beurtwisseling; geef vaker commentaar en toets minder met vragen.','Observeer taalbegrip, gebaren, nieuwe woorden, samenhangende zinnen en verstaanbaarheid als afzonderlijke vaardigheden.','Vergelijk niet met andere kinderen en verklaar echte communicatieproblemen nooit alleen vanuit de geboortehoroscoop.'],
      speechReferral:'Als spreken of begrijpen duidelijk niet bij de leeftijd past, nieuwe vaardigheden lang uitblijven, het kind behoeften moeilijk kan uiten of eerder verworven woorden of vaardigheden verliest, wacht dan niet. Bespreek dit met de huisarts, kinderarts of het consultatiebureau, laat een logopedist onderzoek doen en vraag om een gehoorcontrole. De professional kijkt naar leeftijd, gebruikte talen, algemene ontwikkeling, gezondheid en observaties.',
      reliableOnly:'Zonder exacte geboortetijd gebruiken we geen huizen of andere tijdsafhankelijke factoren. Alleen betrouwbaar berekende delen worden getoond.', moonAmbiguous:'De Maan wisselde die dag van teken. Daarom leggen we niet één emotioneel patroon vast en adviseren we beide mogelijkheden te observeren.',
      houseMethod:'De huizen zijn berekend volgens het Placidus-systeem met de exacte lokale tijd, coördinaten en historische tijdzone. De Ascendant wordt alleen gebruikt als de wiskundige cusp van huis 1 en vormt niet de basis van de psychologische interpretatie.', disclaimer:'Dit is geen diagnose of voorspelling. Vergelijk elk inzicht met echte observaties van het kind.', calculationError:'De kaart kon niet worden berekend. Controleer datum, tijd en gekozen plaats.', missingPlace:'Open het profiel opnieuw en kies een stad uit de suggestielijst voor een nauwkeurige berekening.',
      dominant:'Het element {element} is het sterkst in deze kaart. Het kleurt de algemene reactiestijl zonder andere kwaliteiten uit te sluiten.', houseLine:'{planet} in huis {house}: dit thema komt vooral tot uiting via {theme}.',
      aspectHard:'Het {aspect} tussen {a} en {b} geeft spanning tussen “{roleA}” en “{roleB}”. Een pauze, duidelijke grenzen en opnieuw mogen proberen zonder schaamte helpen hier.', aspectSoft:'Het {aspect} tussen {a} en {b} laat “{roleA}” en “{roleB}” samenwerken. Deze kwaliteit groeit door oefening en vertrouwen.', aspectConj:'De conjunctie van {a} en {b} verbindt “{roleA}” en “{roleB}” sterk. Reacties kunnen duidelijk zijn; vroeg herkennen helpt.', noStrongAspect:'Hier is geen enkel aspect dominant; teken, huis en echte reacties van het kind geven meer informatie.',
      strengthItems:['goed waarnemen','leren door ervaring','trouw aan eigen interesses','gevoel voor eigen tempo','herstellen met passende steun'], challengeHard:'Spannende aspecten betekenen geen probleem. Ze tonen een vaardigheid die meer tijd en veilige oefening kan vragen.', challengeBalance:'Als het kind weerstand toont of snel moe wordt, kijk eerst naar belasting en veiligheid.',
      healthItems:['Een geboortehoroscoop kan geen ziekte vaststellen. Voor gezondheid zijn echte klachten, medisch onderzoek en advies van een arts bepalend.','Noteer veranderingen in slaap, eetlust, energie, pijn en gedrag: wanneer ze begonnen, hoelang ze duren en wat eraan voorafging.','Bespreek terugkerende of toenemende klachten met de kinderarts. Benauwdheid, verminderd bewustzijn, een aanval, hevige pijn of plotselinge verslechtering vragen om directe medische hulp.'],
      parentActions:['Benoem eerst wat u ziet en bied daarna pas een oplossing.','Leg één korte stap tegelijk uit en laat het kind daarna voordoen of navertellen.','Vergelijk het kind alleen met zijn of haar eigen eerdere resultaat.','Let bij school, leraar of trainer ook op de toon van de volwassene.','Toets elk advies aan observatie; de reactie van uw eigen kind is doorslaggevend.'],
      elementNames:{fire:'Vuur',earth:'Aarde',air:'Lucht',water:'Water'}, aspectNames:{conjunction:'conjunctie',sextile:'sextiel',square:'vierkant',trine:'driehoek',opposition:'oppositie'},
      role:{Sun:'wil en zelfgevoel',Moon:'veiligheid en emotie',Mercury:'denken en spreken',Venus:'genegenheid en contact',Mars:'actie en grenzen',Jupiter:'groei en vertrouwen',Saturn:'regels en zelfcontrole',Uranus:'vrijheid en verandering',Neptune:'verbeelding en gevoeligheid',Pluto:'intensiteit en innerlijke kracht'},
      houseThemes:['zelfstandigheid en zelfexpressie','waarden, bezit en stabiliteit','spraak, vragen en directe omgeving','thuis, familie en privéruimte','spel, creativiteit en gezien worden','ritme, vaardigheden en dagelijkse taken','samenwerking en afspraken','vertrouwen, grenzen en diepe gevoelens','de wijde wereld, talen en grote ideeën','doelen, verantwoordelijkheid en erkenning','vrienden, groepen en bijzondere interesses','rust, fantasie en herstel'],
      signs:['Ram','Stier','Tweelingen','Kreeft','Leeuw','Maagd','Weegschaal','Schorpioen','Boogschutter','Steenbok','Waterman','Vissen'], planetNames:{Sun:'Zon',Moon:'Maan',Mercury:'Mercurius',Venus:'Venus',Mars:'Mars',Jupiter:'Jupiter',Saturn:'Saturnus',Uranus:'Uranus',Neptune:'Neptunus',Pluto:'Pluto'}
    }
  };

  const SENSORY_GUIDE = {
    ru: {
      title:'Сенсорная разгрузка',
      intro:'Если ребёнок бегает без остановки, врезается в предметы, толкается или долго не может успокоиться, сначала помогите телу сбросить напряжение. Запреты и разговоры оставьте на момент, когда ребёнок уже немного восстановился.',
      why:'Почему это предложено: {reasons}. В астрологии такие сочетания традиционно связывают с быстрой реакцией, чувствительностью к среде или потребностью в телесной опоре. Это гипотеза для наблюдения, а не диагноз.',
      reasons:{activation:'заметная связь эмоций и двигательной энергии',sensitivity:'повышенная восприимчивость к атмосфере и стимулам',boundaries:'потребность в понятных телесных границах и ритме',retreat:'важность уединения и восстановления после нагрузки'},
      actions:{heavy:'«Тяжёлая работа»: 10–15 секунд толкать стену, переносить безопасные лёгкие предметы, лазать или висеть под присмотром.',pressure:'Глубокое давление: предложите крепкое объятие или игру «бурито» в одеяле — только с согласия ребёнка, с открытой головой и без давления на шею или грудь.',quiet:'Тихое место: палатка, шалаш или уголок с приглушённым светом. Если ребёнок туда ушёл, дайте ему побыть без вопросов и требований.',breath:'Длинный выдох: мыльные пузыри, дудочка, сдувание ватного шарика. Для жевания выбирайте только безопасную по возрасту пищу и всегда наблюдайте за ребёнком.',rhythm:'Медленный ритм: спокойно покачать на руках, фитболе или в гамаке. Быстрое качание может, наоборот, возбуждать.',transition:'После торгового центра, праздника или гостей запланируйте 20–40 минут тишины: приглушите свет, выключите экран и уберите лишние звуки.'},
      safety:'Не используйте утяжелённый рюкзак, тяжёлые одеяла или давление матрасом без рекомендации врача или детского эрготерапевта. Остановитесь, если ребёнку неприятно, больно или трудно дышать. Повторяющиеся трудности с координацией и саморегуляцией обсудите с педиатром или эрготерапевтом.'
    },
    ua: {
      title:'Сенсорне розвантаження',
      intro:'Якщо дитина безупинно бігає, врізається в предмети, штовхається або довго не може заспокоїтися, спочатку допоможіть тілу скинути напруження. Заборони й розмови залиште на момент, коли дитина вже трохи відновилася.',
      why:'Чому це запропоновано: {reasons}. В астрології такі поєднання традиційно пов’язують зі швидкою реакцією, чутливістю до середовища або потребою в тілесній опорі. Це гіпотеза для спостереження, а не діагноз.',
      reasons:{activation:'помітний зв’язок емоцій і рухової енергії',sensitivity:'підвищена сприйнятливість до атмосфери та стимулів',boundaries:'потреба у зрозумілих тілесних межах і ритмі',retreat:'важливість усамітнення й відновлення після навантаження'},
      actions:{heavy:'«Важка робота»: 10–15 секунд штовхати стіну, переносити безпечні легкі предмети, лазити або висіти під наглядом.',pressure:'Глибокий тиск: запропонуйте міцні обійми або гру «буріто» в ковдрі — лише за згодою дитини, з відкритою головою та без тиску на шию чи груди.',quiet:'Тихе місце: намет, курінь або куточок із приглушеним світлом. Якщо дитина туди пішла, дайте їй побути без запитань і вимог.',breath:'Довгий видих: мильні бульбашки, сопілка або здування ватної кульки. Для жування обирайте лише безпечну за віком їжу та завжди наглядайте.',rhythm:'Повільний ритм: спокійно погойдайте на руках, фітболі або в гамаку. Швидке гойдання може, навпаки, збуджувати.',transition:'Після торгового центру, свята чи гостей заплануйте 20–40 хвилин тиші: приглушіть світло, вимкніть екран і приберіть зайві звуки.'},
      safety:'Не використовуйте обтяжений рюкзак, важкі ковдри чи тиск матрацом без рекомендації лікаря або дитячого ерготерапевта. Зупиніться, якщо дитині неприємно, боляче чи важко дихати. Повторювані труднощі з координацією та саморегуляцією обговоріть із педіатром або ерготерапевтом.'
    },
    en: {
      title:'Sensory reset',
      intro:'If the child runs without stopping, bumps into things, pushes or cannot settle for a long time, help the body release tension first. Save explanations and limits for the moment when the child has begun to recover.',
      why:'Why this is suggested: {reasons}. In astrology, these patterns are traditionally associated with quick reactions, sensitivity to stimulation or a need for physical grounding. This is an observation prompt, not a diagnosis.',
      reasons:{activation:'a strong link between emotion and motor energy',sensitivity:'greater sensitivity to atmosphere and stimulation',boundaries:'a need for clear physical boundaries and rhythm',retreat:'a need for quiet recovery after stimulation'},
      actions:{heavy:'“Heavy work”: push against a wall for 10–15 seconds, carry safe light objects, climb or hang with adult supervision.',pressure:'Deep pressure: offer a firm hug or a blanket “burrito” game only with the child’s consent, with the head free and no pressure on the neck or chest.',quiet:'Create a quiet den, tent or dim corner. If the child goes there, allow time without questions or demands.',breath:'Use a long exhale: blow bubbles, use a whistle or blow a cotton ball across a table. Offer only age-safe chewing foods and supervise.',rhythm:'Use slow rhythm: gentle rocking in arms, on a therapy ball or in a hammock. Fast rocking can be stimulating instead.',transition:'After shops, parties or visitors, plan 20–40 minutes of quiet: dim the lights, turn off screens and reduce sound.'},
      safety:'Do not use weighted backpacks, heavy blankets or mattress pressure without advice from a doctor or paediatric occupational therapist. Stop if the child dislikes it, feels pain or has difficulty breathing. Discuss repeated coordination or regulation difficulties with a paediatrician or occupational therapist.'
    },
    nl: {
      title:'Sensorische ontlading',
      intro:'Als een kind zonder stoppen rent, vaak botst, duwt of lang niet tot rust komt, help dan eerst het lichaam spanning af te voeren. Bespreek grenzen pas wanneer het kind al wat hersteld is.',
      why:'Waarom dit wordt voorgesteld: {reasons}. In de astrologie worden zulke patronen traditioneel verbonden met snelle reacties, gevoeligheid voor prikkels of behoefte aan lichamelijke houvast. Dit is een observatiehypothese, geen diagnose.',
      reasons:{activation:'een duidelijke koppeling tussen emotie en bewegingsenergie',sensitivity:'grotere gevoeligheid voor sfeer en prikkels',boundaries:'behoefte aan duidelijke lichaamsgrenzen en ritme',retreat:'behoefte aan rustige hersteltijd na prikkels'},
      actions:{heavy:'“Zwaar werk”: 10–15 seconden tegen een muur duwen, veilige lichte voorwerpen dragen, klimmen of hangen onder toezicht.',pressure:'Diepe druk: bied een stevige knuffel of een “burrito”-spel in een deken aan, alleen met toestemming van het kind, met het hoofd vrij en zonder druk op nek of borst.',quiet:'Maak een rustige tent, hut of gedimde hoek. Gaat het kind daarheen, geef dan tijd zonder vragen of opdrachten.',breath:'Gebruik een lange uitademing: bellen blazen, op een fluitje blazen of een watje wegblazen. Geef alleen leeftijdsveilig voedsel om op te kauwen en houd toezicht.',rhythm:'Gebruik een langzaam ritme: rustig wiegen in de armen, op een oefenbal of in een hangmat. Snel wiegen kan juist activeren.',transition:'Plan na winkels, feestjes of bezoek 20–40 minuten rust: dim het licht, zet schermen uit en verminder geluid.'},
      safety:'Gebruik geen verzwaarde rugzak, zware deken of matrasdruk zonder advies van een arts of kinderergotherapeut. Stop als het kind het onaangenaam vindt, pijn heeft of moeilijk ademt. Bespreek terugkerende problemen met coördinatie of zelfregulatie met een kinderarts of ergotherapeut.'
    }
  };

  const ACTIVITY_GUIDE = {
    ru: {
      title:'Темп, внимание и саморегуляция',
      intro:'В астрологической традиции Марс связывают с двигательным импульсом, Меркурий — со скоростью обработки информации, а Уран — с быстрым переключением и потребностью в свободе. Их знаки, точные аспекты и дома могут подсказать, что стоит наблюдать. Научных доказательств, что натальная карта определяет гиперактивность или СДВГ, нет: это не диагноз.',
      why:'В этой карте можно понаблюдать: {reasons}. Это не означает, что трудность обязательно проявится.',
      reasons:{motor:'высокую потребность в движении и быстрый телесный старт',mental:'быстрый поток мыслей, вопросов и переключений',reactive:'резкую реакцию на запрет, ожидание или перегрузку',steady:'индивидуальный темп без одного выраженного астрологического акцента'},
      actions:['Давайте одну короткую инструкцию за раз, затем попросите ребёнка показать или повторить следующий шаг.','Используйте видимый план и таймер; предупреждайте о переходе за 10 и за 2 минуты.','Чередуйте 10–20 минут работы с заранее запланированным движением. Спорт и движение — способ регуляции, а не наказание.','Уберите со стола лишние стимулы и предложите выбор из двух конкретных способов выполнить задачу.','Хвалите сразу и конкретно: называйте действие, которое получилось, а не оценивайте личность.','В течение двух недель отмечайте ситуацию, сон, голод, шум, длительность реакции и то, что помогло; сравните наблюдения дома и в школе.'],
      underFour:'До 4 лет высокая подвижность и короткое внимание часто соответствуют возрасту. Не приклеивайте ярлык; оценивайте безопасность, развитие и то, насколько поведение мешает повседневной жизни.',
      referral:'Обратитесь к huisarts, педиатру, jeugdarts или consultatiebureau, если проявления заметно сильнее возрастной нормы, сохраняются около 6 месяцев, мешают обучению, отношениям или безопасности и видны как минимум в двух средах, например дома и в школе. Диагноз ставит только квалифицированный специалист. Важно также проверить сон, тревогу, слух и зрение, развитие речи и обучения и другие возможные причины.'
    },
    ua: {
      title:'Темп, увага та саморегуляція',
      intro:'В астрологічній традиції Марс пов’язують із руховим імпульсом, Меркурій — зі швидкістю обробки інформації, а Уран — зі швидким перемиканням і потребою у свободі. Їхні знаки, точні аспекти й будинки можуть підказати, за чим спостерігати. Наукових доказів, що натальна карта визначає гіперактивність або РДУГ, немає: це не діагноз.',
      why:'У цій карті можна поспостерігати: {reasons}. Це не означає, що труднощі обов’язково проявляться.',
      reasons:{motor:'високу потребу в русі та швидкий тілесний старт',mental:'швидкий потік думок, запитань і перемикань',reactive:'різку реакцію на заборону, очікування або перевантаження',steady:'індивідуальний темп без одного вираженого астрологічного акценту'},
      actions:['Давайте одну коротку інструкцію за раз, потім попросіть дитину показати або повторити наступний крок.','Використовуйте наочний план і таймер; попереджайте про перехід за 10 і за 2 хвилини.','Чергуйте 10–20 хвилин роботи із запланованим рухом. Спорт і рух — спосіб регуляції, а не покарання.','Приберіть зайві стимули зі столу й запропонуйте вибір із двох конкретних способів виконати завдання.','Хваліть одразу й конкретно: називайте вдалу дію, а не оцінюйте особистість.','Протягом двох тижнів відмічайте ситуацію, сон, голод, шум, тривалість реакції й те, що допомогло; порівняйте спостереження вдома та в школі.'],
      underFour:'До 4 років висока рухливість і коротка увага часто відповідають віку. Не приклеюйте ярлик; оцінюйте безпеку, розвиток і вплив на повсякденне життя.',
      referral:'Зверніться до сімейного лікаря, педіатра, jeugdarts або consultatiebureau, якщо прояви значно сильніші за вікову норму, тривають близько 6 місяців, заважають навчанню, стосункам чи безпеці та помітні щонайменше у двох середовищах, наприклад удома й у школі. Діагноз встановлює лише кваліфікований фахівець. Важливо також перевірити сон, тривогу, слух і зір, розвиток мовлення й навчання та інші можливі причини.'
    },
    en: {
      title:'Pace, attention and self-regulation',
      intro:'Astrological tradition links Mars with motor drive, Mercury with information-processing speed and Uranus with rapid switching and a need for freedom. Their signs, exact aspects and houses may suggest what to observe. There is no scientific evidence that a natal chart determines hyperactivity or ADHD; this is not a diagnosis.',
      why:'In this chart, it may be useful to observe: {reasons}. This does not mean a difficulty will necessarily appear.',
      reasons:{motor:'a strong need for movement and a quick physical start',mental:'a rapid flow of thoughts, questions and attention shifts',reactive:'a sharp response to limits, waiting or overload',steady:'an individual pace without one pronounced astrological emphasis'},
      actions:['Give one brief instruction at a time, then ask the child to show or repeat the next step.','Use a visible plan and timer; warn about transitions 10 minutes and 2 minutes beforehand.','Alternate 10–20 minutes of work with planned movement. Sport and movement are regulation tools, not punishment.','Remove unnecessary distractions from the desk and offer two concrete ways to complete the task.','Praise immediately and specifically: name the successful action rather than judging the child.','For two weeks, note the situation, sleep, hunger, noise, duration and what helped; compare observations at home and at school.'],
      underFour:'Under age 4, high activity and a short attention span are often developmentally typical. Avoid labels; consider safety, development and impact on daily life.',
      referral:'Speak with a GP, paediatrician, youth doctor or child health clinic if the behaviour is clearly beyond the developmental level, continues for about 6 months, affects learning, relationships or safety, and appears in at least two settings such as home and school. Only a qualified professional can diagnose ADHD. Sleep, anxiety, hearing and vision, speech and learning development, and other possible causes should also be assessed.'
    },
    nl: {
      title:'Tempo, aandacht en zelfregulatie',
      intro:'In de astrologische traditie wordt Mars verbonden met bewegingsdrang, Mercurius met de snelheid van informatieverwerking en Uranus met snel schakelen en behoefte aan vrijheid. Hun tekens, exacte aspecten en huizen kunnen aangeven wat u kunt observeren. Er is geen wetenschappelijk bewijs dat een geboortehoroscoop hyperactiviteit of ADHD bepaalt; dit is geen diagnose.',
      why:'Bij deze horoscoop kunt u letten op: {reasons}. Dit betekent niet dat een probleem zeker zal optreden.',
      reasons:{motor:'een sterke bewegingsbehoefte en snelle lichamelijke start',mental:'een snelle stroom van gedachten, vragen en aandachtswisselingen',reactive:'een felle reactie op grenzen, wachten of overprikkeling',steady:'een eigen tempo zonder één uitgesproken astrologisch accent'},
      actions:['Geef één korte instructie tegelijk en laat het kind daarna de volgende stap tonen of herhalen.','Gebruik een zichtbaar plan en een timer; kondig overgangen 10 en 2 minuten vooraf aan.','Wissel 10–20 minuten werk af met geplande beweging. Sport en bewegen helpen reguleren en zijn geen straf.','Haal onnodige prikkels van tafel en bied twee concrete manieren om de taak uit te voeren.','Geef direct en specifiek complimenten: benoem het geslaagde gedrag, niet de persoonlijkheid.','Noteer twee weken lang situatie, slaap, honger, geluid, duur en wat hielp; vergelijk thuis en school.'],
      underFour:'Onder 4 jaar zijn veel bewegen en een korte aandachtsspanne vaak passend bij de ontwikkeling. Vermijd labels en kijk naar veiligheid, ontwikkeling en invloed op het dagelijks leven.',
      referral:'Bespreek het met huisarts, kinderarts, jeugdarts of consultatiebureau als het gedrag duidelijk niet bij het ontwikkelingsniveau past, ongeveer 6 maanden aanhoudt, leren, relaties of veiligheid belemmert en in minstens twee omgevingen voorkomt, bijvoorbeeld thuis en op school. Alleen een bevoegde professional kan ADHD diagnosticeren. Laat ook slaap, angst, gehoor en zicht, spraak- en leerontwikkeling en andere mogelijke oorzaken beoordelen.'
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
  const ICONS = {portrait:'home',character:'children',emotions:'consultations',communication:'consultations',speech:'consultations',learning:'method',activity:'method',strengths:'home',challenges:'settings',health:'consultations',social:'children',sport:'method',sensory:'consultations',parents:'consultations',facts:'settings'};

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
  function eclipticLongitude(body, date, observer) {
    const geocentric = Astronomy.GeoVector(Astronomy.Body[body], date, true);
    if (!observer) return norm(Astronomy.Ecliptic(geocentric).elon);
    const observerVector = Astronomy.ObserverVector(date, observer, false);
    const topocentric = new Astronomy.Vector(
      geocentric.x - observerVector.x,
      geocentric.y - observerVector.y,
      geocentric.z - observerVector.z,
      geocentric.t
    );
    return norm(Astronomy.Ecliptic(topocentric).elon);
  }
  function dailyLongitudeMotion(body, date) {
    const halfDay = 12 * 60 * 60 * 1000;
    const before = eclipticLongitude(body, new Date(date.getTime() - halfDay), null);
    const after = eclipticLongitude(body, new Date(date.getTime() + halfDay), null);
    return ((after - before + 540) % 360) - 180;
  }
  // Placidus cusps: classic iterative semi-arc algorithm. The implementation
  // follows the independently validated MIT-licensed Caelus house algorithm.
  function placidusCusps(date, latitude, longitude) {
    const rad = Math.PI / 180;
    const tau = Math.PI * 2;
    const modRad = (value) => ((value % tau) + tau) % tau;
    const armc = norm(Astronomy.SiderealTime(date) * 15 + Number(longitude)) * rad;
    const phi = Number(latitude) * rad;
    const days = (date.getTime() - Date.UTC(2000,0,1,12)) / 86400000;
    const epsilon = (23.439291 - 0.00000036 * days) * rad;
    if (Math.abs(phi) >= Math.PI / 2 - epsilon) throw new Error('placidus-polar');
    const intermediate = (offsetDegrees, fraction) => {
      let lambda = modRad(armc + offsetDegrees * rad);
      for (let index = 0; index < 50; index += 1) {
        const declination = Math.asin(Math.sin(epsilon) * Math.sin(lambda));
        const value = Math.max(-1, Math.min(1, Math.tan(phi) * Math.tan(declination)));
        const ascensionalDifference = Math.asin(value);
        const rightAscension = modRad(armc + offsetDegrees * rad + fraction * ascensionalDifference);
        const next = modRad(Math.atan2(Math.sin(rightAscension), Math.cos(rightAscension) * Math.cos(epsilon)));
        const delta = modRad(next - lambda + Math.PI) - Math.PI;
        lambda = next;
        if (Math.abs(delta) < 1e-10) break;
      }
      return lambda;
    };
    const midheaven = modRad(Math.atan2(Math.sin(armc), Math.cos(armc) * Math.cos(epsilon)));
    const ascendant = modRad(Math.atan2(Math.cos(armc), -(Math.sin(armc) * Math.cos(epsilon) + Math.tan(phi) * Math.sin(epsilon))));
    const cusps = new Array(12).fill(0);
    cusps[0] = ascendant;
    cusps[9] = midheaven;
    cusps[10] = intermediate(30, 1 / 3);
    cusps[11] = intermediate(60, 2 / 3);
    cusps[1] = intermediate(120, 2 / 3);
    cusps[2] = intermediate(150, 1 / 3);
    cusps[3] = modRad(midheaven + Math.PI);
    cusps[6] = modRad(ascendant + Math.PI);
    cusps[4] = modRad(cusps[10] + Math.PI);
    cusps[5] = modRad(cusps[11] + Math.PI);
    cusps[7] = modRad(cusps[1] + Math.PI);
    cusps[8] = modRad(cusps[2] + Math.PI);
    return cusps.map((cusp) => norm(cusp / rad));
  }
  function houseFromCusps(longitude, cusps) {
    for (let index = 0; index < 12; index += 1) {
      const span = norm(cusps[(index + 1) % 12] - cusps[index]);
      const offset = norm(longitude - cusps[index]);
      if (offset < span - 1e-8) return index + 1;
    }
    throw new Error('house-not-found');
  }

  function calculateChart(child, force) {
    if (!window.Astronomy || !child.birthDate || !child.timezone || child.latitude == null || child.longitude == null) throw new Error('missing-data');
    const knownTime = !child.birthTimeUnknown && Boolean(child.birthTime);
    const time = knownTime ? child.birthTime : '12:00';
    const date = localDateTimeToUtc(child.birthDate, time, child.timezone);
    const observer = knownTime ? new Astronomy.Observer(Number(child.latitude), Number(child.longitude), 0) : null;
    const positions = {};
    BODY_NAMES.forEach((body) => {
      const dailyMotion = dailyLongitudeMotion(body, date);
      positions[body] = {
        longitude:eclipticLongitude(body, date, observer),
        dailyMotion,
        retrograde:dailyMotion < -0.0001
      };
    });
    let moonAmbiguous = false;
    let moonSigns = [signIndex(positions.Moon.longitude)];
    if (!knownTime) {
      const start = localDateTimeToUtc(child.birthDate, '00:01', child.timezone);
      const end = localDateTimeToUtc(child.birthDate, '23:59', child.timezone);
      moonSigns = [...new Set([signIndex(eclipticLongitude('Moon', start)), signIndex(eclipticLongitude('Moon', end))])];
      moonAmbiguous = moonSigns.length > 1;
    }
    let ascendant = null;
    let houseCusps = null;
    if (knownTime) {
      houseCusps = placidusCusps(date, child.latitude, child.longitude);
      ascendant = houseCusps[0];
      BODY_NAMES.forEach((body) => { positions[body].house = houseFromCusps(positions[body].longitude, houseCusps); });
    }
    BODY_NAMES.forEach((body) => { positions[body].sign = signIndex(positions[body].longitude); });
    const aspectTargets = [{key:'conjunction',angle:0},{key:'sextile',angle:60},{key:'square',angle:90},{key:'trine',angle:120},{key:'opposition',angle:180}];
    const aspects = [];
    for (let i = 0; i < BODY_NAMES.length; i += 1) for (let j = i + 1; j < BODY_NAMES.length; j += 1) {
      const a = BODY_NAMES[i], b = BODY_NAMES[j];
      if (!knownTime && (a === 'Moon' || b === 'Moon')) continue;
      const raw = Math.abs(positions[a].longitude - positions[b].longitude);
      const distance = Math.min(raw, 360 - raw);
      aspectTargets.forEach((target) => {
        const luminaryAspect = [a,b].some((body) => body === 'Sun' || body === 'Moon');
        const allowedOrb = luminaryAspect ? ({conjunction:10,sextile:6,square:8,trine:8,opposition:10}[target.key]) : 5;
        const orb = Math.abs(distance - target.angle);
        if (orb <= allowedOrb) aspects.push({a,b,type:target.key,angle:target.angle,orb,allowedOrb});
      });
    }
    aspects.sort((a,b) => a.orb - b.orb);
    const counts = {fire:0,earth:0,air:0,water:0};
    ['Sun','Moon','Mercury','Venus','Mars','Jupiter','Saturn'].forEach((body) => { if (!(moonAmbiguous && body === 'Moon')) counts[SIGN_ELEMENT[positions[body].sign]] += 1; });
    const dominantElement = Object.keys(counts).sort((a,b) => counts[b]-counts[a])[0];
    const chart = {calculationVersion:CALCULATION_VERSION, calculatedAt:new Date().toISOString(), engine:'Astronomy Engine 2.x / VSOP87 · topocentric positions · Placidus houses', houseSystem:'Placidus', coordinateMode:knownTime?'topocentric':'geocentric', dateUtc:date.toISOString(), knownTime, moonAmbiguous, moonSigns, ascendant, houseCusps, positions, aspects, dominantElement};
    if (force || child.natalChart?.calculationVersion !== CALCULATION_VERSION) {
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
    if (!aspect) return '';
    const values = {a:t().planetNames[aspect.a],b:t().planetNames[aspect.b],aspect:t().aspectNames[aspect.type],roleA:t().role[aspect.a],roleB:t().role[aspect.b]};
    if (aspect.type === 'conjunction') return fill(t().aspectConj, values);
    return fill(['square','opposition'].includes(aspect.type) ? t().aspectHard : t().aspectSoft, values);
  }
  function houseText(body, chart) {
    const house = chart.positions[body].house;
    if (!house) return '';
    return fill(t().houseLine, {planet:t().planetNames[body],house,theme:t().houseThemes[house-1]});
  }
  function degreeText(position) {
    const circleSeconds = 360 * 3600;
    const totalSeconds = Math.round(norm(position.longitude) * 3600) % circleSeconds;
    const roundedSign = Math.floor(totalSeconds / (30 * 3600));
    const signSeconds = totalSeconds - roundedSign * 30 * 3600;
    const degrees = Math.floor(signSeconds / 3600);
    const minutes = Math.floor((signSeconds % 3600) / 60);
    const seconds = signSeconds % 60;
    return `${signName(roundedSign)} ${degrees}°${String(minutes).padStart(2,'0')}′${String(seconds).padStart(2,'0')}″`;
  }
  function cuspDegreeText(longitude) { return degreeText({longitude, sign:signIndex(longitude)}); }
  function icon(name) { return `<img class="analysis-card-icon" src="assets/nav-icons/${ICONS[name]}.png?v=${VERSION}" alt="">`; }
  function section(name, body) {
    const specialTitles = {sensory:SENSORY_GUIDE[lang()].title,activity:ACTIVITY_GUIDE[lang()].title};
    const title = specialTitles[name] || t()[name];
    return `<article class="analysis-section analysis-${name}">${icon(name)}<div><h3>${esc(title)}</h3>${body}</div></article>`;
  }
  function paragraphs(items) {
    const seen = new Set();
    return items.filter(Boolean).filter((item) => {
      const key = String(item).trim().toLocaleLowerCase();
      if (!key || seen.has(key)) return false;
      seen.add(key);
      return true;
    }).map((item) => `<p>${esc(item)}</p>`).join('');
  }
  function list(items) { return `<ul>${[...new Set(items.filter(Boolean))].map((item) => `<li>${esc(item)}</li>`).join('')}</ul>`; }

  function sensorySection(chart) {
    const guide = SENSORY_GUIDE[lang()];
    const hard = new Set(['conjunction','square','opposition']);
    const hasLink = (groupA, groupB) => chart.aspects.some((aspect) => hard.has(aspect.type) && (
      (groupA.includes(aspect.a) && groupB.includes(aspect.b)) ||
      (groupA.includes(aspect.b) && groupB.includes(aspect.a))
    ));
    const houseIn = (body, houses) => chart.knownTime && houses.includes(chart.positions[body]?.house);
    const flags = [];
    if (hasLink(['Moon','Mercury','Mars'],['Mars','Uranus']) || (['fire','air'].includes(chart.dominantElement) && SIGN_ELEMENT[chart.positions.Mars.sign] === 'fire')) flags.push('activation');
    if (SIGN_ELEMENT[chart.positions.Moon.sign] === 'water' || hasLink(['Moon','Mercury'],['Neptune','Uranus'])) flags.push('sensitivity');
    if (hasLink(['Moon','Mars'],['Saturn']) || houseIn('Mars',[1,6]) || chart.dominantElement === 'earth') flags.push('boundaries');
    if (houseIn('Moon',[12]) || houseIn('Mercury',[3,12]) || houseIn('Neptune',[12]) || SIGN_ELEMENT[chart.positions.Moon.sign] === 'water') flags.push('retreat');
    if (!flags.length) flags.push(chart.dominantElement === 'water' ? 'sensitivity' : chart.dominantElement === 'earth' ? 'boundaries' : 'activation');

    const actionKeys = [];
    const add = (...keys) => keys.forEach((key) => { if (!actionKeys.includes(key)) actionKeys.push(key); });
    flags.forEach((flag) => {
      if (flag === 'activation') add('heavy','breath','rhythm');
      if (flag === 'sensitivity') add('quiet','breath','transition');
      if (flag === 'boundaries') add('pressure','heavy','rhythm');
      if (flag === 'retreat') add('quiet','transition','rhythm');
    });
    const reasons = flags.map((flag) => guide.reasons[flag]).join('; ');
    const why = fill(guide.why,{reasons});
    const actions = actionKeys.slice(0,5).map((key) => guide.actions[key]);
    return section('sensory', `${paragraphs([guide.intro,why])}${list(actions)}<p class="analysis-safety">${esc(guide.safety)}</p>`);
  }

  function mercurySpeechSection(chart) {
    if (!chart.positions.Mercury?.retrograde) return '';
    const mercury = chart.positions.Mercury;
    const linked = chart.aspects.filter((aspect) => aspect.a === 'Mercury' || aspect.b === 'Mercury');
    const otherBody = (aspect) => aspect.a === 'Mercury' ? aspect.b : aspect.a;
    const slowLink = linked.some((aspect) => ['Saturn','Neptune'].includes(otherBody(aspect)) && ['conjunction','square','opposition'].includes(aspect.type));
    const fastLink = linked.some((aspect) => ['Mars','Jupiter','Uranus'].includes(otherBody(aspect)));
    const element = SIGN_ELEMENT[mercury.sign];
    const slowSetting = slowLink || ['earth','water'].includes(element) || (chart.knownTime && mercury.house === 12);
    const fastSetting = fastLink || ['fire','air'].includes(element) || (chart.knownTime && [3,5,11].includes(mercury.house));
    const pattern = slowSetting && !fastSetting ? t().mercuryRetroSlow : fastSetting && !slowSetting ? t().mercuryRetroFast : t().mercuryRetroMixed;
    return section('speech', `${paragraphs([t().mercuryRetroIntro,pattern])}${list(t().speechActions)}<p class="analysis-safety">${esc(t().speechReferral)}</p>`);
  }

  function childAge(child) {
    if (!child.birthDate) return null;
    const birth = new Date(`${child.birthDate}T12:00:00`);
    if (Number.isNaN(birth.getTime())) return null;
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    if (today.getMonth() < birth.getMonth() || (today.getMonth() === birth.getMonth() && today.getDate() < birth.getDate())) age -= 1;
    return age;
  }

  function activitySection(chart, child) {
    const guide = ACTIVITY_GUIDE[lang()];
    const strong = new Set(['conjunction','square','opposition']);
    const hasLink = (groupA, groupB) => chart.aspects.some((aspect) => strong.has(aspect.type) && (
      (groupA.includes(aspect.a) && groupB.includes(aspect.b)) ||
      (groupA.includes(aspect.b) && groupB.includes(aspect.a))
    ));
    const houseIn = (body, houses) => chart.knownTime && houses.includes(chart.positions[body]?.house);
    const flags = [];
    if (hasLink(['Mars'],['Uranus','Jupiter']) || SIGN_ELEMENT[chart.positions.Mars.sign] === 'fire' || houseIn('Mars',[1,5,6,11])) flags.push('motor');
    if (hasLink(['Mercury'],['Uranus','Mars']) || ['fire','air'].includes(SIGN_ELEMENT[chart.positions.Mercury.sign]) || houseIn('Mercury',[3,5,11])) flags.push('mental');
    if (hasLink(['Moon'],['Uranus','Mars']) || (['fire','air'].includes(chart.dominantElement) && houseIn('Moon',[1,5,11]))) flags.push('reactive');
    if (!flags.length) flags.push('steady');
    const reasons = flags.map((flag) => guide.reasons[flag]).join('; ');
    const age = childAge(child);
    return section('activity', `${paragraphs([guide.intro,fill(guide.why,{reasons}),age !== null && age < 4 ? guide.underFour : ''])}${list(guide.actions)}<p class="analysis-safety">${esc(guide.referral)}</p>`);
  }

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
    content.push(mercurySpeechSection(chart));
    content.push(section('learning', paragraphs([learningIntro, aspectText(mercuryAspect)])));
    content.push(activitySection(chart,child));
    content.push(section('strengths', list(strengths)));
    content.push(section('challenges', paragraphs([t().challengeHard, challengeAspect ? aspectText(challengeAspect) : '',t().challengeBalance])));
    content.push(section('health', list(t().healthItems)));
    content.push(section('social', paragraphs([venusElement.social,houseText('Venus',chart),aspectText(venusAspect)])));
    content.push(section('sport', paragraphs([sportIntro,houseText('Mars',chart),aspectText(marsAspect)])));
    content.push(sensorySection(chart));
    content.push(section('parents', list(t().parentActions)));
    const planetRows = BODY_NAMES.map((body) => `<tr><td>${esc(t().planetNames[body])}${chart.positions[body].retrograde?' ℞':''}</td><td>${esc(degreeText(chart.positions[body]))}</td><td>${chart.positions[body].house||'—'}</td></tr>`).join('');
    const aspectRows = chart.aspects.slice(0,12).map((a) => `<li>${esc(t().planetNames[a.a])} — ${esc(t().planetNames[a.b])}: ${esc(t().aspectNames[a.type])}, ${a.orb.toFixed(2)}°</li>`).join('');
    const cuspRows = chart.knownTime && chart.houseCusps ? chart.houseCusps.map((cusp,index) => `<tr><td>${index+1}</td><td>${esc(cuspDegreeText(cusp))}</td></tr>`).join('') : '';
    const facts = `<details class="analysis-facts"><summary>${esc(t().facts)}</summary>${chart.knownTime?`<p>${esc(t().houseMethod)}</p>`:`<p>${esc(t().reliableOnly)}</p>`}<h4>${esc(t().planets)}</h4><div class="analysis-table-wrap"><table><thead><tr><th>${esc(t().planets)}</th><th>°</th><th>${esc(t().houses)}</th></tr></thead><tbody>${planetRows}</tbody></table></div>${cuspRows?`<h4>${esc(t().houses)} · Placidus</h4><div class="analysis-table-wrap"><table><tbody>${cuspRows}</tbody></table></div>`:''}<h4>${esc(t().aspects)}</h4><ul>${aspectRows}</ul><small>${esc(chart.engine)}</small></details>`;
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
      const badges = chart ? ['Sun','Moon','Mercury','Mars'].map((body) => `<span class="zodiac-badge">${esc(t().planetNames[body])}${chart.positions[body].retrograde?' ℞':''}: ${esc(body==='Moon'&&chart.moonAmbiguous?chart.moonSigns.map(signName).join(' / '):signName(chart.positions[body].sign))}</span>`).join('') : '';
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

window.addChild=function(){
  if(document.querySelector('.add-child-modal')) return;
  const t={
    ru:{title:'Добавить ребёнка',name:'Имя ребёнка',date:'Дата рождения',time:'Время рождения',place:'Место рождения',sun:'Знак Солнца',moon:'Знак Луны',mercury:'Знак Меркурия',mars:'Знак Марса',save:'Сохранить',cancel:'Отмена',required:'Заполните имя и дату рождения',done:'Ребёнок добавлен! ✨'},
    ua:{title:'Додати дитину',name:"Ім’я дитини",date:'Дата народження',time:'Час народження',place:'Місце народження',sun:'Знак Сонця',moon:'Знак Місяця',mercury:'Знак Меркурія',mars:'Знак Марса',save:'Зберегти',cancel:'Скасувати',required:'Заповніть ім’я та дату народження',done:'Дитину додано! ✨'},
    en:{title:'Add child',name:'Child name',date:'Birth date',time:'Birth time',place:'Birth place',sun:'Sun sign',moon:'Moon sign',mercury:'Mercury sign',mars:'Mars sign',save:'Save',cancel:'Cancel',required:'Enter the child name and birth date',done:'Child added! ✨'},
    nl:{title:'Kind toevoegen',name:'Naam van het kind',date:'Geboortedatum',time:'Geboortetijd',place:'Geboorteplaats',sun:'Zonneteken',moon:'Maanteken',mercury:'Mercurius-teken',mars:'Mars-teken',save:'Opslaan',cancel:'Annuleren',required:'Vul naam en geboortedatum in',done:'Kind toegevoegd! ✨'}
  };
  const x=t[currentLanguage]||t.nl;
  const signs=['Овен','Телец','Близнецы','Рак','Лев','Дева','Весы','Скорпион','Стрелец','Козерог','Водолей','Рыбы'];
  const modal=document.createElement('div');
  modal.className='add-child-modal';
  modal.innerHTML=`<div class="add-child-overlay" onclick="closeAddChildModal(event)"><div class="add-child-dialog" onclick="event.stopPropagation()"><h2>${x.title}</h2><div class="add-child-grid"><div><label>${x.name}</label><input type="text" id="addChildName" autocomplete="name"></div><div><label>${x.date}</label><input type="date" id="addChildBirthDate"></div><div><label>${x.time}</label><input type="time" id="addChildBirthTime"></div><div><label>${x.place}</label><input type="text" id="addChildBirthPlace" list="cityList" autocomplete="off"><datalist id="cityList"><option value="Amsterdam"><option value="Haarlem"><option value="Utrecht"><option value="Rotterdam"><option value="Den Haag"><option value="Kyiv"><option value="Comrat"></datalist></div><div><label>${x.sun}</label><input type="text" id="addChildSunSign" list="signList"></div><div><label>${x.moon}</label><input type="text" id="addChildMoonSign" list="signList"></div><div><label>${x.mercury}</label><input type="text" id="addChildMercurySign" list="signList"></div><div><label>${x.mars}</label><input type="text" id="addChildMarsSign" list="signList"></div></div><datalist id="signList">${signs.map(s=>`<option value="${s}">`).join('')}</datalist><div class="add-child-actions"><button class="btn btn-primary" onclick="saveChildFromModal()">💾 ${x.save}</button><button class="btn btn-secondary" onclick="closeAddChildModal()">✖ ${x.cancel}</button></div></div></div>`;
  document.body.appendChild(modal);
  setTimeout(()=>document.getElementById('addChildName')?.focus(),50);
};
window.saveChildFromModal=function(){
  const val=id=>document.getElementById(id)?.value.trim()||'';
  const name=val('addChildName'),birthDate=val('addChildBirthDate');
  const messages={ru:['Заполните имя и дату рождения','Ребёнок добавлен! ✨'],ua:["Заповніть ім’я та дату народження",'Дитину додано! ✨'],en:['Enter the child name and birth date','Child added! ✨'],nl:['Vul naam en geboortedatum in','Kind toegevoegd! ✨']};
  const m=messages[currentLanguage]||messages.nl;
  if(!name||!birthDate){alert(m[0]);return;}
  children.push({id:Date.now(),name,birthDate,birthTime:val('addChildBirthTime'),birthPlace:val('addChildBirthPlace'),sunSign:val('addChildSunSign'),moonSign:val('addChildMoonSign'),mercurySign:val('addChildMercurySign'),marsSign:val('addChildMarsSign')});
  localStorage.setItem('children',JSON.stringify(children));
  closeAddChildModal();loadChildren();updateChildSelect();alert(m[1]);
};
window.closeAddChildModal=function(){document.querySelector('.add-child-modal')?.remove();};
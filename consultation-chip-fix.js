(function fixConsultationQuickQuestions(){
  'use strict';

  // Quick-question chips already place the translated question into the textarea.
  // This listener runs after that handler and submits it immediately, so every
  // chip produces a fresh answer instead of leaving the previous answer visible.
  document.addEventListener('click', function(event){
    const chip = event.target.closest('.consultant-chip[data-topic]');
    if (!chip || chip.disabled) return;

    window.setTimeout(function(){
      const input = document.getElementById('consultantQuestion');
      const send = document.getElementById('consultantSend');
      if (!input || !send || send.disabled) return;

      // Fallback in case another UI handler did not populate the textarea.
      if (!input.value.trim()) input.value = chip.textContent.trim();
      if (!input.value.trim()) return;

      send.click();
    }, 0);
  });
})();

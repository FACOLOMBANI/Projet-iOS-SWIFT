// Objet contenant toutes les questions ainsi que leur réponses
// Il sera ensuite dynamiquement ajouté a la page lors du chargement
var questions = [
   {
      question: "Si une valeur est amenée à être modifiée plusieurs fois,il préférable d’utiliser?",
      answers: [
         {text: "Une constante (let)", answer: false},
         {text: "Une variable (var)", answer: true},
         {text: "Une condition (if)", answer: false}
      ]
   },{
      question: "Quel valeur est ici un booléen ssssssssssssssssssssssssssssssssssssssssssssssss?",
      answers: [
         {text: "Hello World !", answer: false},
         {text: "42", answer: false},
         {text: "false", answer: true}
      ]
   }, {
      question: "Quelle sera la valeur de la variable resultat après le code [var resultat = 10/3] ?",
      answers: [
         {text: "3", answer: true},
         {text: "3,33", answer: false},
         {text: "Undefined", answer: false}
      ]
   }, {
      question: "je dispose d’une variable age qui a pour valeur 18, cette condition est-elle vérifiée ? [if age >= 18]",
      answers: [
         {text: "oui", answer: false},
         {text: "non", answer: true},
         {text: "La réponse D", answer: false}
      ]
   }, {
      question: "Quelle est la particularité d’une boucle repeat … while ?",
      answers: [
         {text: "Cette boucle a pour particularité de toujours s’exécuter au minimum une fois", answer: true},
         {text: "Elle peut ne jamais s’exécuter si la condition de la boucle n’est pas vérifiée dès le départ", answer: false},
         {text: "Cette boucle n’existe pas dans le langage Swift", answer: false}
      ]
   }, {
      question: "Laquelle de ces boucles pourrait afficher les multiples de deux de 0 compris à 10 compris (0, 2, 4, 6, 8, 10) ?",
      answers: [
         {text: "for i = 1; i < 10; i = i+2", answer: false},
         {text: "for i = 0; i <= 10; i = i+2", answer: true},
         {text: "for i = 0; i <= 10; i++", answer: false}
      ]
   },




];

var studentResult = [];

$(function() {
   for (let i = 0; i < questions.length; i++) {
      var path = "#questionnaire-questions-row", q = questions[i], a = q.answers;
      studentResult.push(false); // On initie les résultats de l'éléve a false
      
      jQuery('<div/>', { // On crée le div de la question
         id: 'question-n-' + i,
         class: 'question col-xs-12 col-md-6'
      }).appendTo(path);
      path = "#question-n-" + i;
      
      jQuery('<div/>', { // Le div du texte de la question
         class: 'question-text'
      }).appendTo(path);
      $(".question-text", path).append("<p>" + q.question + "</p>");

      jQuery('<div/>', { // Le div qui va contenir les réponses
         class: 'question-answers row'
      }).appendTo(path);

      // On parcours le tableau des réponses et on les ajoute (data-answer est utilisé pour retrouver la bonne réponse)
      for (let iA = 0; iA < a.length; iA++) {
         $(".question-answers", path).append("<div id='q" + i + "a" + iA + "' data-question-id='" + i + "' data-answer='" + a[iA].answer +
                                             "' class='question-answer animated col-xs-4'>" + a[iA].text + "</div>");
      }
   }

   $(".question-answer").click(function(origin) {
      if (! (typeof origin.target.dataset.answer === "string" && typeof origin.target.dataset.questionId === "string")) {
         return null; // Protection
      }

      var isGoodAnswer = (origin.target.dataset.answer == 'true'); // On utilise le dataset pour retrouver l'id et si c une bonne réponse
      var id = parseInt(origin.target.dataset.questionId);

      if (! (typeof isGoodAnswer === "boolean" && typeof id === "number")) {
         return null; // Protection
      }

      // On peut débuter le traitement

      studentResult[id] = isGoodAnswer; // On ajoute sa réponse a ses résultats
      
      var answer = $("#" + origin.target.id);
      answer.addClass("flipOutX"); // On lance l'anim

      answer.on('webkitAnimationEnd oanimationend msAnimationEnd animationend', // On lui ajoute un callback de fin d'anim
         function(e) {
            answer.removeClass("flipOutX");
            answer.addClass("flipInX");
         }
      );

      if (isGoodAnswer) {
         answer.addClass("question-right");
      } else {
         answer.addClass("question-wrong");
      }
   })
})
/* ==========================================================================
   content.js — LE CONTENU PAR DÉFAUT DU PORTFOLIO
   Tu peux modifier ce fichier à la main, ou utiliser le mode édition
   (ouvre la page avec ?edit puis « Exporter content.json »).

   m.intro / m.apropos : phrase d'intro (haut de page) et « À propos de moi »
   d : liste des 6 compétences. Pour chacune :
     n, court   numéro et nom court (menu)
     nom        titre complet de la compétence
     ac         apprentissage critique (« J'ai appris et suis à même de… car : »)
     ce         composante essentielle (« J'ai agi et réalisé… »)
     auto       niveau global d'auto-évaluation (Peu / Assez / Bien / Très bien, avec + possible)
     acJust     (optionnel) justification de l'AC
     an         (optionnel) justification de l'auto-évaluation
     t          liste des traces. Pour chacune :
       t        titre   r  niveau   c  phrase « j'ai… »
       b        liste de puces   com  commentaire libre (optionnel)
       img      capture d'écran (chemin ou image encodée, optionnel)
   ========================================================================== */
const DEFAULT_CONTENT = {
  m: {
    intro: "Première année : six compétences, mes traces et mon auto-évaluation pour chacune.",
    apropos: ""
  },
  d: [
{n:1,court:"Réaliser",nom:"Réaliser un développement d’application",ac:"J’ai appris et suis à même de réaliser un développement informatique car :",ce:"J’ai agi et réalisé un développement d’application :",auto:"Assez",t:[
{t:"SAE Jeu Textuel",r:"Assez",c:"j’ai implémenté des conceptions simples :",b:["en expliquant et communiquant l’avancée aux clients et aux utilisateurs.","en appliquant les principes algorithmiques."]},
{t:"Site Chats Responsive",r:"Bien",c:"j’ai fait des essais, évalué leurs résultats en fonction des spécifications :",b:["en précisant et en respectant les besoins décrits par le client.","en veillant à la qualité du code et à sa documentation."]},
{t:"SAE Graphes/IHM",r:"Assez",c:"j’ai développé des interfaces utilisateur :",b:["en choisissant les ressources techniques appropriées."]},
{t:"Site Chats Basique",r:"Bien",c:"j’ai élaboré des conceptions simples :",b:["en respectant la législation, les normes pro. et les enjeux sociétaux."]}]},
{n:2,court:"Optimiser",nom:"Optimiser des applications",ac:"J’ai appris et suis à même de construire des algorithmes car :",ce:"J’ai appréhendé et construit des algorithmes :",auto:"Assez",t:[
{t:"SAE Jeu Textuel",r:"Assez",c:"j’ai analysé un problème avec méthode :",b:["en formalisant et modélisant des situations complexes."]},
{t:"TP Tri R1-01",r:"Assez",c:"j’ai comparé des algorithmes pour des problèmes classiques :",b:["en recensant les algorithmes et structures de données usuels."]},
{t:"TP R2-09",r:"Peu",c:"j’ai formalisé et mis en œuvre des outils mathématiques pour l’informatique :",b:["en s’appuyant sur des schémas de raisonnement."]},
{t:"TP Bas Niveau",r:"Peu",c:"j’ai expérimenté la notion de compilation et les représentations du bas niveau de données :",b:["en justifiant mes choix et en validant les résultats."]}]},
{n:3,court:"Administrer",nom:"Administrer des systèmes informatiques communicants et complexes",ac:"J’ai appris et suis à même de configurer un poste informatique car :",ce:"J’ai installé et configuré un poste de travail :",auto:"Bien",t:[
{t:"Perso/Archi",r:"Bien",c:"j’ai identifié les différents composants d’un système numérique.",b:[]},
{t:"Archi R1-03/Utilisation quot.",r:"Bien",c:"j’ai utilisé les fonctionnalités de base d’un système multitâche/multiutilisateurs :",b:["en précisant et en respectant les besoins décrits par le client."]},
{t:"Install. S1",r:"Bien",c:"j’ai installé et configuré un système d’exploitation et des outils de développement :",b:["en appliquant les obligations légales et les bonnes pratiques de sécurité."]},
{t:"SAE Serveur",r:"Bien",c:"j’ai configuré un poste de travail dans un réseau d’entreprise :",b:["en sécurisant le système d’information.","en offrant une qualité de service optimale.","en assurant la continuité d’activité."]}]},
{n:4,court:"Gérer",nom:"Gérer des données de l’information",ac:"J’ai appris et suis à même de réaliser un développement d’application informatique simple car :",ce:"J’ai conçu et mis en place une BDD à partir d’un cahier des charges client :",auto:"Bien +",t:[
{t:"R1-05/R2-06",r:"Très Bien",c:"j’ai mis à jour et interrogé une base de données relationnelle :",b:["en s’appuyant sur des bases mathématiques."]},
{t:"SAE BDD",r:"Bien",c:"j’ai visualisé des données :",b:["en s’appuyant sur des bases mathématiques.","en assurant la cohérence et la qualité."]},
{t:"SAE BDD (aussi)",r:"Bien",c:"j’ai conçu une base de données relationnelle à partir d’un cahier des charges :",b:["en respectant les réglementations sur le respect de la vie privée et la protection des données personnelles.","en respectant des enjeux économiques, sociétaux et écologiques de l’utilisation et du stockage des données, ainsi que des différentes infrastructures (datacenters, cloud, etc.)"]}]},
{n:5,court:"Conduire",nom:"Conduire un projet",ac:"J’ai appris et suis à même d’identifier les besoins métiers des clients et des utilisateurs car :",ce:"J’ai identifié les besoins des clients et des utilisateurs :",auto:"Assez +",t:[
{t:"SAE WEB Statique/IA",r:"Bien",c:"j’ai appréhendé les besoins du client et de l’utilisateur :",b:["en adoptant une démarche proactive, créative et critique."]},
{t:"R2-10 Gestion de projet",r:"Assez",c:"j’ai mis en place les outils de gestion de projet :",b:["en communiquant efficacement avec les différents acteurs."]},
{t:"R1-08 G.O. / R1-09 Éco. / R2-10 Gestion de projet / SAEs",r:"Bien",c:"j’ai identifié les acteurs et les différentes phases d’un cycle de développement :",b:["en respectant les règles juridiques et les normes en vigueur.","en sensibilisant à une gestion éthique, responsable, durable et interculturelle."]}]},
{n:6,court:"Collaborer",nom:"Collaborer au sein d’une équipe informatique",ac:"J’ai appris et suis à même d’identifier les aptitudes pour travailler dans une équipe informatique car :",ce:"J’ai identifié mes aptitudes pour travailler dans une équipe informatique",auto:"Bien +",t:[
{t:"PPP/domaines touchés",r:"Bien",c:"j’ai appréhendé l’écosystème numérique :",b:["en accompagnant la mise en œuvre des évolutions informatiques.","en veillant au respect des contraintes juridiques."]},
{t:"Recherche d’alternance",r:"Bien",c:"j’ai découvert les aptitudes requises selon les différents métiers informatiques :",b:["en inscrivant sa démarche dans une équipe pluridisciplinaire."]},
{t:"G.O./Entretiens/SAE Graphes",r:"Bien",c:"j’ai identifié les statuts, les fonctions et les rôles de chaque membre d’une équipe pluridisciplinaire :",b:["en développant une communication efficace et collaborative."]},
{t:"Communication/GIT",r:"Bien",c:"j’ai acquis les compétences interpersonnelles pour travailler en équipe",b:[]}]}
  ]
};

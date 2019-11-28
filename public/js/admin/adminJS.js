$(document).ready(function() {
    // On récupère la balise <div> en question qui contient l'attribut « data-prototype » qui nous intéresse.
    var $container = $('div#city_adventure_enygmaLoops');

    // On définit un compteur unique pour nommer les champs qu'on va ajouter dynamiquement
    var index = $container.find('fieldset').length;

    enigmeReorder();

    // On ajoute un nouveau champ à chaque clic sur le lien d'ajout.
    $('#add_enigme').click(function(e) {
        addEnigme($container);

        e.preventDefault(); // évite qu'un # apparaisse dans l'URL
        return false;
    });

    // On ajoute un premier champ automatiquement s'il n'en existe pas déjà un (cas d'une nouvelle annonce par exemple).
    if (index == 0) {
        addEnigme($container);
    } else {
        // S'il existe déjà des catégories, on ajoute un lien de suppression pour chacune d'entre elles
        $container.children('fieldset').each(function() {
            addDeleteLink($(this));
            enigmeReorder();
        });
    }

    // La fonction qui ajoute un formulaire CategoryType
    function addEnigme($container) {
        // Dans le contenu de l'attribut « data-prototype », on remplace :
        // - le texte "__name__label__" qu'il contient par le label du champ
        // - le texte "__name__" qu'il contient par le numéro du champ
        var template = $container.attr('data-prototype')
            .replace(/__name__label__/g, 'Enigme' + (index+1))
            .replace(/__name__/g,        index)
        ;

        // On crée un objet jquery qui contient ce template
        var $prototype = $(template);

        // On ajoute au prototype un lien pour pouvoir supprimer la catégorie
        addDeleteLink($prototype);

        // On ajoute le prototype modifié à la fin de la balise <div>
        $container.append($prototype);

        enigmeReorder();

        // Enfin, on incrémente le compteur pour que le prochain ajout se fasse avec un autre numéro
        index++;
    }

    // La fonction qui ajoute un lien de suppression d'une catégorie
    function addDeleteLink($prototype) {
        // Création du lien
        var $deleteLink = $('<a href="#" class="btn btn-danger">Supprimer</a>');

        // Ajout du lien
        $prototype.append($deleteLink);

        // Ajout du listener sur le clic du lien pour effectivement supprimer la catégorie
        $deleteLink.click(function(e) {
            $prototype.remove();

            index--;

            enigmeReorder();

            e.preventDefault(); // évite qu'un # apparaisse dans l'URL
            return false;
        });
    }

    function enigmeReorder() {
        var indexBis = 1;

        $container.children('fieldset').each(function() {
            $(this).find('legend').html('Enigme'+indexBis);
            indexBis++
        });
    }
});
import React, {Fragment} from "react";
import {userService} from "../../auth/services/userService";

export default function CitygmaMentions() {

    return (
        <Fragment>
            <div id="mentionsContainer">
                <div id="mentionsImmeubleLeft"></div>
                <div id="mentionsTextBorder"></div>
                <div id="mentionsTextContainer">
                    <h2>Mentions légales</h2>
                    <p>Ce site est développé par l'association Illuminaction à Rennes</p><br/>

                    <p><b>Conception et réalisation graphique :</b></p>
                    <p>Un remerciement tout particulier à Bim's qui nous a grâcieusement offert ses talents afin de concevoir la charte graphique ainsi que les illustrations de ce site.</p><br/>

                    <h3>Hébergeur du site</h3>
                    <h4>1&1 IONOS SARL</h4>
                    <p>7, place de la Gare<br/>
                        BP 70109<br/>
                        57200 Sarreguemines C<br/><br/>

                        1&1 IONOS SE<br/>
                        Elgendorfer Str. 57<br/>
                        56410 Montabaur, Allemagne</p><br/>

                    <h3>Propriété intellectuelle</h3>
                    <p>Ce site Internet constitue une œuvre protégée en France par le Code de la Propriété Intellectuelle, et à l’étranger par les
                        conventions internationales en vigueur sur le droit d’auteur. Toute reproduction ou utilisation d’éléments du site <b>CITYGMA</b> sans autorisation écrite préalable est strictement interdite et constitue un délit de contrefaçon passible,
                        aux termes de l’article L.335-2 du Code de la Propriété Intellectuelle, de trois ans d’emprisonnement et de 300 000 €
                        d’amende. Par ailleurs, les noms de produits ou d’entreprises mentionnés sur le site <b>CITYGMA</b> peuvent être des
                        marques commerciales ou des marques déposées appartenant à des tiers et protégées à ce titre par le Code de la Propriété
                        Intellectuelle.</p><br/>

                    <h3>Limitation de responsabilité</h3>
                    <p>La responsabilité de l’Editeur est limitée aux dommages directs et prévisibles pouvant résulter de l’utilisation du site
                        CITYGMA, à l’exclusion de tout dommage indirect. L’Editeur n’accorde aucune garantie concernant le fonctionnement du réseau
                        de télécommunication ou bien concernant le fonctionnement du système informatique permettant l’accès au site CITYGMA.
                        Par ailleurs, l’Editeur n’est pas responsable de l’insertion éventuelle d’un lien vers le site CITYGMA dans des sites
                        jugés illicites ou au contenu choquant (pornographie, incitation à la haine raciale, promotion des sectes, piratage
                        informatique, etc.).</p><br/>

                    <h3>Publication</h3>
                    <p>Illuminaction : contact@citygma.com</p><br/>

                    <h3>Politique relative à l'utilisation des cookies</h3>
                    <p>Les cookies utilisé sur ce site ne servent qu&lsquo;à son bon fonctionnement (Connexion du joueur, accès à l&lsquo;interface de jeu).</p>
                    <p>Il vous est tout à fait possible de les désactiver dans votre navigateur, auquel cas vous ne pourrez plus accéder ni à votre profil, ni à l&lsquo;interface de jeu.</p>
                    <br/>

                    <h3>Politique relative à l&lsquo;utilisation de données personnelles</h3>
                    <p>Nous ne récoltons aucunes données personnelles, excepté votre adresse e-mail.</p>
                    <p>Celui ci ne nous sert qu&lsquo;à être sur de générer un identifiant unique pour la connection à votre compte. Nous nous engageons à ne pas nous en servir à quelqu'autre fin que ce soit.</p>
                    <br/>
                    <p>Lorsque vous nous contactez à l&lsquo;aide du formulaire de la page de contact, vous nous communiquez votre adresse mail. Nous nous engageons à l&lsquo;utiliser uniquement pour vous répondre.</p><br/>

                    <h3>Politique de confidentialité</h3>
                    <h4>Définitions</h4>
                    <p>Joueur : tout professionnel ou personne physique capable au sens des articles 1123 et suivants du Code civil, ou
                        personne morale, qui visite le Site objet des présentes conditions générales. Prestations et Services :
                        https://citygma.com/ met à disposition des joueurs : Contenu : Ensemble des éléments constituants l’information présente sur le Site, notamment textes – images – vidéos.
                        Utilisateur : Internaute se connectant, utilisant le site susnommé. Informations personnelles : « Les informations qui
                        permettent, sous quelque forme que ce soit, directement ou non, l’identification des personnes physiques auxquelles elles
                        s’appliquent » (article 4 de la loi n° 78-17 du 6 janvier 1978). Les termes « données à caractère personnel », « personne
                        concernée », « sous traitant » et « données sensibles » ont le sens défini par le Règlement Général sur la Protection des
                        Données (RGPD : n° 2016-679)</p><br/>

                    <h4>1 . Présentation du site internet.</h4>
                    <p>En vertu de l’article 6 de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l’économie numérique, il est précisé
                        aux utilisateurs du site internet  https://citygma.com/  l’identité des différents intervenants dans le cadre de sa
                        réalisation et de son suivi: Propriétaire : Association Illuminaction - 83 avenue Gros Malhon 35000 Rennes -
                        Responsable publication : Philippe Pérou Webmaster : Philippe Pérou : 1&1 Internet SARL SARL au capital de 100 000 EUR RCS Sarreguemines B 431 303 775 SIRET 431 303 775 000 16 Code APE: 6201Z Identification intracommunautaire FR 13 431303775 1&1 IONOS Cloud GmbH GmbH au capital de 5 814 171 EUR RCS Charlottenburg HRB 125506 B SIRET 29 026 63822 Délégué à la protection des données : Philippe Pérou – contact@citygma.com</p><br/>

                    <h4>2 . Conditions générales d’utilisation du site et des services proposés.</h4>
                    <p>Le site constitue une œuvre de l’esprit protégée par les dispositions du Code de la Propriété Intellectuelle et des
                        Réglementations Internationales applicables. Le Client ne peut en aucune manière réutiliser, céder ou exploiter pour
                        son propre compte tout ou partie des éléments ou travaux du Site. L’utilisation du site  https://citygma.com/  implique
                        l’acceptation pleine et entière des conditions générales d’utilisation ci-après décrites. Ces conditions d’utilisation
                        sont susceptibles d’être modifiées ou complétées à tout moment, les utilisateurs du site  https://citygma.com/ sont donc
                        invités à les consulter de manière régulière. Ce site internet est normalement accessible à tout moment aux utilisateurs.
                        Une interruption pour raison de maintenance technique peut être toutefois décidée par https://citygma.com/ , qui
                        s’efforcera alors de communiquer préalablement aux utilisateurs les dates et heures de l’intervention. Le site web
                        https://citygma.com/ est mis à jour régulièrement par https://citygma.com/ responsable. De la même façon, les mentions
                        légales peuvent être modifiées à tout moment : elles s’imposent néanmoins à l’utilisateur qui est invité à s’y référer
                        le plus souvent possible afin d’en prendre connaissance.</p><br/>

                    <h4>3 . Description des services fournis.</h4>
                    <p>Le site internet  https://citygma.com/ a pour objet de fournir une information concernant l’ensemble des activités de
                        l'association. https://citygma.com/ s’efforce de fournir sur le site  https://citygma.com/ des informations aussi précises
                        que possible. Toutefois, il ne pourra être tenu responsable des oublis, des inexactitudes et des carences dans la mise à
                        jour, qu’elles soient de son fait ou du fait des tiers partenaires qui lui fournissent ces informations. Toutes les
                        informations indiquées sur le site  https://citygma.com/ sont données à titre indicatif, et sont susceptibles d’évoluer.
                        Par ailleurs, les renseignements figurant sur le site  https://citygma.com/ ne sont pas exhaustifs. Ils sont donnés sous
                        réserve de modifications ayant été apportées depuis leur mise en ligne.</p><br/>

                    <h4>4 . Limitations contractuelles sur les données techniques.</h4>
                    <p>Le site utilise la technologie JavaScript. Le site Internet ne pourra être tenu responsable de dommages matériels liés à
                        l’utilisation du site. De plus, l’utilisateur du site s’engage à accéder au site en utilisant un matériel récent, ne
                        contenant pas de virus et avec un navigateur de dernière génération mis-à-jour Le site https://citygma.com/ est hébergé
                        chez un prestataire sur le territoire de l’Union Européenne conformément aux dispositions du Règlement Général sur la
                        Protection des Données (RGPD : n° 2016-679) L’objectif est d’apporter une prestation qui assure le meilleur taux
                        d’accessibilité. L’hébergeur assure la continuité de son service 24 Heures sur 24, tous les jours de l’année. Il se
                        réserve néanmoins la possibilité d’interrompre le service d’hébergement pour les durées les plus courtes possibles
                        notamment à des fins de maintenance, d’amélioration de ses infrastructures, de défaillance de ses infrastructures ou
                        si les Prestations et Services génèrent un trafic réputé anormal. https://citygma.com/ et l’hébergeur ne pourront être
                        tenus responsables en cas de dysfonctionnement du réseau Internet, des lignes téléphoniques ou du matériel informatique
                        et de téléphonie lié notamment à l’encombrement du réseau empêchant l’accès au serveur. Formulaires de contact : Lorsque
                        vous envoyez un mail à CITYGMA par le biais d’un de nos formulaire en cochant la case d’acceptation de la politique de
                        confidentialité, vous acceptez que vos données personnelles (adresse mail, numéro de téléphone) soient utilisées afin de
                        vous répondre ou vous contacter uniquement. Cookies : Si vous avez un compte et que vous vous connectez sur ce site,
                        un cookie temporaire sera créé afin de déterminer si votre navigateur accepte les cookies. Il ne contient pas de données
                        personnelles et sera supprimé automatiquement à la fermeture de votre navigateur. Lorsque vous vous connecterez,
                        nous mettrons en place un certain nombre de cookies pour enregistrer vos informations de connexion et vos préférences
                        d’écran. La durée de vie d’un cookie de connexion est de 12h. Si vous vous déconnectez de votre compte, le cookie de
                        connexion sera effacé. Contenu embarqué depuis d’autres sites : Les articles de ce site peuvent inclure des contenus
                        intégrés (par exemple des vidéos, images, articles…). Le contenu intégré depuis d’autres sites se comporte de la même
                        manière que si le visiteur se rendait sur cet autre site. Ces sites web pourraient collecter des données sur vous,
                        utiliser des cookies, embarquer des outils de suivis tiers, suivre vos interactions avec ces contenus embarqués si vous
                        disposez d’un compte connecté sur leur site web. Statistiques et mesures d’audience : Citygma  n'utilise pas d'outils
                        afin de mesurer l’audience de son site https://citygma.com/ .</p><br/>

                    <h4>5 . Propriété intellectuelle et contrefaçons.</h4>
                    <p>Illuminaction est propriétaire des droits de propriété intellectuelle et détient les droits d’usage sur tous les éléments
                        accessibles sur le site internet, notamment les textes, images, graphismes, logos, vidéos, icônes et sons. Toute
                        reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du site, quel que soit
                        le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable de : L'association Illuminaction .
                        Toute exploitation non autorisée du site ou de l’un quelconque des éléments qu’il contient sera considérée comme
                        constitutive d’une contrefaçon et poursuivie conformément aux dispositions des articles L.335-2 et suivants du Code de
                        Propriété Intellectuelle.</p><br/>

                    <h4>6 . Limitations de responsabilité.</h4>
                    <p>Illuminaction agit en tant qu’éditeur du site. Illuminaction est responsable de la qualité et de la véracité du Contenu qu’il
                    publie. Illuminaction ne pourra être tenu responsable des dommages directs et indirects causés au matériel de l’utilisateur,
                    lors de l’accès au site internet https://citygma.com/ , et résultant soit de l’utilisation d’un matériel ne répondant pas aux
                    spécifications indiquées au point 4, soit de l’apparition d’un bug ou d’une incompatibilité. Illuminaction ne pourra également
                    être tenu responsable des dommages indirects (tels par exemple qu’une perte de marché ou perte d’une chance) consécutifs à
                    l’utilisation du site  https://citygma.com/ . Des espaces interactifs (possibilité de poser des questions dans l’espace
                    contact) sont à la disposition des utilisateurs. https://citygma.com/ se réserve le droit de supprimer, sans mise en demeure
                    préalable, tout contenu déposé dans cet espace qui contreviendrait à la législation applicable en France, en particulier aux
                    dispositions relatives à la protection des données. Le cas échéant, Illuminaction se réserve également la possibilité de
                    mettre en cause la responsabilité civile et/ou pénale de l’utilisateur, notamment en cas de message à caractère raciste,
                        injurieux, diffamant, ou pornographique, quel que soit le support utilisé (texte, photographie …).</p><br/>

                    <h4>7 . Gestion des données personnelles.</h4>
                    <p>Le Joueur est informé des réglementations concernant la communication marketing, la loi du 21 Juin 2014 pour la
                        confiance dans l’Economie Numérique, la Loi Informatique et Liberté du 06 Août 2004 ainsi que du Règlement Général sur
                        la Protection des Données (RGPD : n° 2016-679).</p><br/>

                    <h5>7 . 1 . Responsables de la collecte des données personnelles</h5>
                    <p>Pour les Données Personnelles collectées dans le cadre de la création du compte personnel de l’Utilisateur et de sa
                        navigation sur le Site, le responsable du traitement des Données Personnelles est : Illuminaction. https://citygma.com/
                        est représenté par Philippe Pérou, son représentant légal En tant que responsable du traitement des données qu’il
                        collecte, https://citygma.com/ s’engage à respecter le cadre des dispositions légales en vigueur. Il lui appartient
                        notamment au Client d’établir les finalités de ses traitements de données, de fournir à ses prospects et clients,
                        à partir de la collecte de leurs consentements, une information complète sur le traitement de leurs données personnelles
                        et de maintenir un registre des traitements conforme à la réalité. Chaque fois que Illuminaction traite des Données
                        Personnelles, Illuminaction prend toutes les mesures raisonnables pour s’assurer de l’exactitude et de la pertinence des
                        Données Personnelles au regard des finalités pour lesquelles Illuminaction les traite les traite.</p><br/>

                    <h5>7 . 2 . Finalité des données collectées</h5>
                    <p>Illuminaction est susceptible de traiter tout ou partie des données : pour permettre la navigation sur le Site et la
                        gestion et la traçabilité des prestations et services commandés par l’utilisateur : données de connexion et d’utilisation
                        du Site, facturation, historique des commandes, etc. pour prévenir et lutter contre la fraude informatique (spamming,
                        hacking…) : matériel informatique utilisé pour la navigation, l’adresse IP, le mot de passe (hashé) pour améliorer la
                        navigation sur le Site : données de connexion et d’utilisation pour mener des enquêtes de satisfaction facultatives sur
                        https://citygma.com/ : adresse email pour mener des campagnes de communication (sms, mail) : numéro de téléphone,
                        adresse email https://citygma.com/ ne commercialise pas vos données personnelles qui sont donc uniquement utilisées par
                        nécessité ou à des fins statistiques et d’analyses.</p><br/>

                    <h5>7 . 3 . Droit d’accès, de rectification et d’opposition</h5>
                    <p>Conformément à la réglementation européenne en vigueur, les Utilisateurs de https://citygma.com/ disposent des droits
                        suivants : droit d’accès (article 15 RGPD) et de rectification (article 16 RGPD), de mise à jour, de complétude des
                        données des Utilisateurs droit de verrouillage ou d’effacement des données des Utilisateurs à caractère personnel
                        (article 17 du RGPD), lorsqu’elles sont inexactes, incomplètes, équivoques, périmées, ou dont la collecte, l’utilisation,
                        la communication ou la conservation est interdite droit de retirer à tout moment un consentement (article 13-2c RGPD)
                        droit à la limitation du traitement des données des Utilisateurs (article 18 RGPD) droit d’opposition au traitement des
                        données des Utilisateurs (article 21 RGPD) droit à la portabilité des données que les Utilisateurs auront fournies,
                        lorsque ces données font l’objet de traitements automatisés fondés sur leur consentement ou sur un contrat
                        (article 20 RGPD) droit de définir le sort des données des Utilisateurs après leur mort et de choisir à qui
                        https://citygma.com/ devra communiquer (ou non) ses données à un tiers qu’ils aura préalablement désigné Dès que
                        https://citygma.com/ a connaissance du décès d’un Utilisateur et à défaut d’instructions de sa part,
                        https://citygma.com/ s’engage à détruire ses données, sauf si leur conservation s’avère nécessaire à des fins
                        probatoires ou pour répondre à une obligation légale. Si l’Utilisateur souhaite savoir comment https://citygma.com/
                        utilise ses Données Personnelles, demander à les rectifier ou s’oppose à leur traitement, l’Utilisateur peut contacter
                        https://citygma.com/ par écrit à l’adresse suivante : Illuminaction – 83 avenue Gros Malhon 35000 Rennes. Dans ce cas,
                        l’Utilisateur doit indiquer les Données Personnelles qu’il souhaiterait que https://citygma.com/ corrige, mette à jour ou
                        supprime, en s’identifiant précisément avec une copie d’une pièce d’identité (carte d’identité ou passeport). Les
                        demandes de suppression de Données Personnelles seront soumises aux obligations qui sont imposées à
                        https://citygma.com/ par la loi, notamment en matière de conservation ou d’archivage des documents. Enfin, les
                        Utilisateurs de https://citygma.com/ peuvent déposer une réclamation auprès des autorités de contrôle, et notamment de
                        la CNIL (https://www.cnil.fr/fr/plaintes).</p><br/>

                    <h5>7 . 4 . Non-communication des données personnelles</h5>
                    <p>Illuminaction s’interdit de traiter, héberger ou transférer les Informations collectées sur ses Clients vers un pays
                        situé en dehors de l’Union européenne ou reconnu comme « non adéquat » par la Commission européenne sans en informer
                        préalablement le client. Pour autant, Illuminaction reste libre du choix de ses sous-traitants techniques et commerciaux
                        à la condition qu’il présentent les garanties suffisantes au regard des exigences du Règlement Général sur la Protection
                        des Données (RGPD : n° 2016-679). Illuminaction s’engage à prendre toutes les précautions nécessaires afin de préserver
                        la sécurité des Informations et notamment qu’elles ne soient pas communiquées à des personnes non autorisées.
                        Cependant, si un incident impactant l’intégrité ou la confidentialité des Informations du Joueur est portée à la
                        connaissance de Illuminaction , celle-ci devra dans les meilleurs délais informer le Client et lui communiquer les
                        mesures de corrections prises. Par ailleurs Illuminaction ne collecte aucune « données sensibles ». Les Données
                        Personnelles de l’Utilisateur peuvent être traitées par des filiales de https://citygma.com/ et des sous-traitants
                        (prestataires de services), exclusivement afin de réaliser les finalités de la présente politique. Dans la limite de
                        leurs attributions respectives et pour les finalités rappelées ci-dessus, les principales personnes susceptibles d’avoir
                        accès aux données des Utilisateurs de https://citygma.com/ sont principalement les agents de notre service client.</p><br/>

                    <h4>8 . Notification d’incident</h4>
                    <p>Quels que soient les efforts fournis, aucune méthode de transmission sur Internet et aucune méthode de stockage
                        électronique n’est complètement sûre. Nous ne pouvons en conséquence pas garantir une sécurité absolue. Si nous prenions
                        connaissance d’une brèche de la sécurité, nous avertirions les utilisateurs concernés afin qu’ils puissent prendre les
                        mesures appropriées. Nos procédures de notification d’incident tiennent compte de nos obligations légales, qu’elles se
                        situent au niveau national ou européen. Nous nous engageons à informer pleinement nos clients de toutes les questions
                        relevant de la sécurité de leur compte et à leur fournir toutes les informations nécessaires pour les aider à respecter
                        leurs propres obligations réglementaires en matière de reporting. Aucune information personnelle de l’utilisateur du
                        site  https://citygma.com/ n’est publiée à l’insu de l’utilisateur, échangée, transférée, cédée ou vendue sur un support
                        quelconque à des tiers. Seule l’hypothèse du rachat de https://citygma.com/ et de ses droits permettrait la transmission
                        des dites informations à l’éventuel acquéreur qui serait à son tour tenu de la même obligation de conservation et de
                        modification des données vis à vis de l’utilisateur du site  https://citygma.com/ . Sécurité Pour assurer la sécurité
                        et la confidentialité des Données Personnelles et des Données Personnelles de Santé, https://citygma.com/ utilise des
                        réseaux protégés par des dispositifs standards tels que par pare-feu, la pseudonymisation, l’encryption et mot de passe.
                        Lors du traitement des Données Personnelles, https://citygma.com/ prend toutes les mesures raisonnables visant à les
                        protéger contre toute perte, utilisation détournée, accès non autorisé, divulgation, altération ou destruction.</p>
                </div>
            </div>
        </Fragment>
    );
}
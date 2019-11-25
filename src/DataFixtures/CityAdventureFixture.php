<?php

namespace App\DataFixtures;

use App\Entity\CityAdventure;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;

class CityAdventureFixture extends Fixture
{
    public function load(ObjectManager $manager)
    {
        $cityAdventure = new CityAdventure();
        $cityAdventure
            ->setAdventureName('La Flame de Rennes')
            ->setAdventureTown('Rennes')
            ->setAdventureDuration('1 heure')
            ->setAdventureDescription('Déambulez dans les rues de Rennes au coeur d’une affaire brûlante. Résolvez des énigmes, suivez une piste grâce à votre GPS et plongez dans l’histoire de la ville ! Cliquez sur JOUER pour obtenir les dossiers confidentiels et commencer l’aventure !')
        ;

        $manager->persist($cityAdventure);

        $manager->flush();
    }
}

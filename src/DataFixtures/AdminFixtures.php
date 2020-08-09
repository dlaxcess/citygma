<?php

namespace App\DataFixtures;

use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Serializer\SerializerInterface;

class AdminFixtures extends Fixture
{
    private $encoder;

    public function __construct(UserPasswordEncoderInterface $encoder)
    {
        $this->encoder = $encoder;
    }

    public function load(ObjectManager $manager)
    {
        $user = new User();
        $user->setUsername('Philou');
        $user->setEmail("contact.philippe.perou@gmail.com");
        $user->setPassword($this->encoder->encodePassword($user, "https://-&-&aA6420642//monCul"));
        $user->setRoles(['ROLE_ADMIN']);


        $manager->persist($user);
        $manager->flush();
    }
}

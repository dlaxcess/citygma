<?php

namespace App\Repository;

use App\Entity\CityAdventure;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;

/**
 * @method CityAdventure|null find($id, $lockMode = null, $lockVersion = null)
 * @method CityAdventure|null findOneBy(array $criteria, array $orderBy = null)
 * @method CityAdventure[]    findAll()
 * @method CityAdventure[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class CityAdventureRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, CityAdventure::class);
    }

    // /**
    //  * @return CityAdventure[] Returns an array of CityAdventure objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('c.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?CityAdventure
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}

<?php

namespace App\Repository;

use App\Entity\EnygmaLoop;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;

/**
 * @method EnygmaLoop|null find($id, $lockMode = null, $lockVersion = null)
 * @method EnygmaLoop|null findOneBy(array $criteria, array $orderBy = null)
 * @method EnygmaLoop[]    findAll()
 * @method EnygmaLoop[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class EnygmaLoopRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, EnygmaLoop::class);
    }

    // /**
    //  * @return EnygmaLoop[] Returns an array of EnygmaLoop objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('e')
            ->andWhere('e.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('e.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?EnygmaLoop
    {
        return $this->createQueryBuilder('e')
            ->andWhere('e.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}

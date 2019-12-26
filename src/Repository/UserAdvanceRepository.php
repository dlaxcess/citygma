<?php

namespace App\Repository;

use App\Entity\UserAdvance;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;

/**
 * @method UserAdvance|null find($id, $lockMode = null, $lockVersion = null)
 * @method UserAdvance|null findOneBy(array $criteria, array $orderBy = null)
 * @method UserAdvance[]    findAll()
 * @method UserAdvance[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class UserAdvanceRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, UserAdvance::class);
    }

    // /**
    //  * @return UserAdvance[] Returns an array of UserAdvance objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('u')
            ->andWhere('u.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('u.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?UserAdvance
    {
        return $this->createQueryBuilder('u')
            ->andWhere('u.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}

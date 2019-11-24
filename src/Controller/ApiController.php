<?php


namespace App\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/api")
 */
class ApiController extends AbstractController
{
    /**
     * @Route("/user", name="user", methods={"GET"})
     */
    public function user(Request $request)
    {
        $user = $this->getUser();
        return $this->json([
            'username' => $user->getName(),
            'email' => $user->getEmail(),
            'roles' => $user->getRoles()
        ]);
    }
}
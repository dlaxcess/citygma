<?php


namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class PageController extends AbstractController
{
    /**
     * @Route("/{reactRouting}", name="homepage", defaults={"reactRouting": null})
     */
    public function homepage()
    {
        return $this->render('base.html.twig');
    }
}
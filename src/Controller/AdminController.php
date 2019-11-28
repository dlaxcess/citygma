<?php

namespace App\Controller;

use App\Entity\CityAdventure;
use App\Form\CityAdventureType;
use App\Repository\CityAdventureRepository;
use App\Service\FileUploader;
use Doctrine\ORM\EntityManagerInterface;
use phpDocumentor\Reflection\Element;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;

class AdminController extends AbstractController
{
    /**
     * @Route("/login_admin", name="login_admin")
     */
    public function login_admin(Request $request, AuthenticationUtils $authenticationUtils)
    {
        // get the login error if there is one
        $error = $authenticationUtils->getLastAuthenticationError();

        // last username entered by the user
        $lastUsername = $authenticationUtils->getLastUsername();

        if ($this->container->get('security.authorization_checker')->isGranted('ROLE_ADMIN')) {
            return $this->redirectToRoute('adminInterface');
        }

        return $this->render('admin/adminLogin.html.twig', array(
            'last_username' => $lastUsername,
            'error'         => $error,
        ));
    }

    /**
     * @Route("/logout_admin", name="logout_admin")
     */
    public function logout()
    {

    }

    /**
     * @Route("/adminInterface", name="adminInterface")
     * @IsGranted("ROLE_ADMIN")
     */
    public function adminInterface(CityAdventureRepository $cityAdventureRepository)
    {
        /*if (!$this->container->get('security.authorization_checker')->isGranted('ROLE_ADMIN')) {
            return $this->redirectToRoute('login_admin');
        }*/
        $citygmaAdventures = $cityAdventureRepository->findAll();


        return $this->render('admin/adminInterface.html.twig', [
            'citygmaAdventures' => $citygmaAdventures,
        ]);
    }

    /**
     * @Route("/adminCitygmaAdventureEdit{id}", name="adminCitygmaAdventureEdit")
     * @IsGranted("ROLE_ADMIN")
     */
    public function adminCitygmaAdventureEdit(int $id = null, Request $request, FileUploader $fileUploader, EntityManagerInterface $entityManager, CityAdventureRepository $cityAdventureRepository)
    {
        if ($id) {
            $cityAdventure = $cityAdventureRepository->find($id);

            /*$cityAdventure->setAdventurePictureFilename(
                new File($this->getParameter('cityAdventures_directory').'/'.$cityAdventure->getAdventurePictureFilename())
            );
            var_dump( $cityAdventure->getAdventurePictureFilename());*/
        } else {
            $cityAdventure = new CityAdventure();
        }

        $form = $this->createForm(CityAdventureType::class, $cityAdventure);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {

            $adventurePictureFile = $form['adventurePictureFilename']->getData();
            $videoAdventureIntroFile = $form['videoAdventureIntroFilename']->getData();
            $videoLastEnigmaFile = $form['videoLastEnigmaFilename']->getData();
            $lastEnigmaPictureFile = $form['lastEnigmaPictureFilename']->getData();
            $videoFinalSequenceFile = $form['videoFinalSequenceFilename']->getData();

            if ($adventurePictureFile) {
                $adventurePictureFileName = $fileUploader->upload($adventurePictureFile);
                $cityAdventure->setAdventurePictureFilename($adventurePictureFileName);
            }
            if ($videoAdventureIntroFile) {
                $videoAdventureIntroFileName = $fileUploader->upload($videoAdventureIntroFile);
                $cityAdventure->setVideoAdventureIntroFilename($videoAdventureIntroFileName);
            }
            if ($videoLastEnigmaFile) {
                $videoLastEnigmaFileName = $fileUploader->upload($videoLastEnigmaFile);
                $cityAdventure->setVideoLastEnigmaFilename($videoLastEnigmaFileName);
            }
            if ($lastEnigmaPictureFile) {
                $lastEnigmaPictureFileName = $fileUploader->upload($lastEnigmaPictureFile);
                $cityAdventure->setLastEnigmaPictureFilename($lastEnigmaPictureFileName);
            }
            if ($videoFinalSequenceFile) {
                $videoFinalSequenceFileName = $fileUploader->upload($adventurePictureFile);
                $cityAdventure->setVideoFinalSequenceFilename($videoFinalSequenceFileName);
            }

            $cityAdventureEnigmas = $cityAdventure->getEnygmaLoops();
            $enigmaEntries = $form->get('enygmaLoops')/*->get('0')->get('videoIntroClueFilename')->getData()*/;
            //dd($enigmaEntries['0']->getData()->getId());
            $i = 0;

            foreach ($enigmaEntries as $enigmaEntry) {
                //var_dump($enigmaEntry->get('videoIntroClueFilename')->getData());

                $videoIntroClueFile = $enigmaEntry->get('videoIntroClueFilename')->getData();

                if ($videoIntroClueFile) {
                    $videoIntroClueFileName = $fileUploader->upload($videoIntroClueFile);
                    $cityAdventureEnigmas[$i]->setVideoIntroClueFilename($videoIntroClueFileName);
                }

                $i++;
            }


            /*if ($cityAdventureEnigmas->count() == $enigmaEntries->count()) {
                for ($i = 0; $i <= $enigmaEntries->count()-1; $i++) {
                    $videoIntroClueFile = $enigmaEntries[$i]->get('videoIntroClueFilename')->getData();

                    if ($videoIntroClueFile) {
                        $videoIntroClueFileName = $fileUploader->upload($videoIntroClueFile);
                        $cityAdventureEnigmas[$i]->setVideoIntroClueFilename($videoIntroClueFileName);
                    }
                }
            }*/

            /*foreach ($enigmaEntries as $enigmaEntry) {

                var_dump($enigmaEntry->get('videoIntroClueFilename')->getData());
                $videoIntroClueFile = $enigmaEntry->getVideoIntroClueFilename()->getData();

                if ($videoIntroClueFile) {
                    $videoIntroClueFileName = $fileUploader->upload($videoIntroClueFile);
                    $enigmaEntry->setVideoIntroClueFilename($videoIntroClueFileName);
                }
            }
            die();*/


            // ... persist the $cityAdventure variable or any other work
            $entityManager->persist($cityAdventure);
            $entityManager->flush();

            return $this->redirect($this->generateUrl('adminInterface'));
        }

        return $this->render('admin/adminCitygmaAdventureEdit.html.twig', [
            'form' => $form->createView(),
            'cityAdventure' => $cityAdventure,
        ]);
    }

    /**
     * @Route("/adminCitygmaAdventureDelete{id}", name="adminCitygmaAdventureDelete")
     * @IsGranted("ROLE_ADMIN")
     */
    public function adminCitygmaAdventureDelete(int $id, EntityManagerInterface $entityManager, CityAdventureRepository $cityAdventureRepository) {
        $cityAdventure = $cityAdventureRepository->find($id);

        $entityManager->remove($cityAdventure);
        $entityManager->flush();

        return $this->redirect($this->generateUrl('adminInterface'));
    }
}

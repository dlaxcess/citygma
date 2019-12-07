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
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;

class AdminController extends AbstractController
{
    /**
     * @Route("/citygma_contact", name="citygma_contact", methods={"POST"})
     */
    public function citygma_contact(Request $request, \Swift_Mailer $mailer)
    {
        $values = json_decode($request->getContent());
        if(isset($values->email,$values->subject,$values->message)) {
            $message = (new \Swift_Message($values->subject))
                ->setFrom($values->email)
                ->setTo('flipiste@free.fr')
                ->setBody(
                    $this->renderView(
                    // templates/emails/registration.html.twig
                        'mails/citygmaContact.html.twig',
                        [
                            'email' => $values->email,
                            'message' => $values->message
                        ]),
                    'text/html'
                )
            ;

            $mailer->send($message);

            $data = [
                'status' => 201,
                'message' => 'Le mail a bien été envoyé'
            ];

        }else {
            $data = [
                'status' => 500,
                'message' => 'Le mail n\'a pas pu être envoyé veuillez réessayer'
            ];
        }

        return new JsonResponse($data, 201);
    }

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
                $videoFinalSequenceFileName = $fileUploader->upload($videoFinalSequenceFile);
                $cityAdventure->setVideoFinalSequenceFilename($videoFinalSequenceFileName);
            }

            $cityAdventureEnigmas = $cityAdventure->getEnygmaLoops();
            $enigmaEntries = $form->get('enygmaLoops')/*->get('0')->get('videoIntroClueFilename')->getData()*/;
            //dd($cityAdventureEnigmas, $enigmaEntries);

            $cityAdventureEnigmasOrderedArray = [];
            foreach ($cityAdventureEnigmas as $cityAdventureEnigma) {
                $cityAdventureEnigmasOrderedArray[] = $cityAdventureEnigma;
            }
            $i = 0;
            //$combinedArray = array_combine($enigmaEntries->getData(), $cityAdventureEnigmas);
            //dd($enigmaEntries);

            //die();

            foreach ($enigmaEntries as $key => $enigmaEntry) {
                //var_dump($enigmaEntry->get('videoIntroClueFilename')->getData());

                $videoIntroClueFile = $enigmaEntry->get('videoIntroClueFilename')->getData();
                $videoHistoryInfoFile = $enigmaEntry->get('videoHistoryInfoFilename')->getData();
                $enygmaQuestionPictureFile = $enigmaEntry->get('enygmaQuestionPictureFilename')->getData();

                if ($videoIntroClueFile) {
                    $videoIntroClueFileName = $fileUploader->upload($videoIntroClueFile);
                    $cityAdventureEnigmasOrderedArray[$i]->setVideoIntroClueFilename($videoIntroClueFileName);
                }

                if ($videoHistoryInfoFile) {
                    $videoHistoryInfoFileName = $fileUploader->upload($videoHistoryInfoFile);
                    $cityAdventureEnigmasOrderedArray[$i]->setVideoHistoryInfoFilename($videoHistoryInfoFileName);
                }

                if ($enygmaQuestionPictureFile) {
                    $enygmaQuestionPictureFileName = $fileUploader->upload($enygmaQuestionPictureFile);
                    $cityAdventureEnigmasOrderedArray[$i]->setEnygmaQuestionPictureFilename($enygmaQuestionPictureFileName);
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
    public function adminCitygmaAdventureDelete(int $id, EntityManagerInterface $entityManager, CityAdventureRepository $cityAdventureRepository)
    {
        $cityAdventure = $cityAdventureRepository->find($id);

        $entityManager->remove($cityAdventure);
        $entityManager->flush();

        return $this->redirect($this->generateUrl('adminInterface'));
    }

    /**
     * @Route("/adminAdventureGetEnigmas{id}", name="adminAdventureGetEnigmas")
     * @IsGranted("ROLE_ADMIN")
     */
    public function adminAdventureGetEnigmas(int $id, CityAdventureRepository $cityAdventureRepository)
    {
        $cityAdventure = $cityAdventureRepository->find($id);

        $enigmaLoops = $cityAdventure->getEnygmaLoops();

        $jsonEnigmaLoops = [];

        foreach ($enigmaLoops as $enigmaLoop) {
            $jsonEnigmaLoops[] = [
                'videoIntroClueFilename' => $enigmaLoop->getVideoIntroClueFilename(),
                'videoHistoryInfoFilename' => $enigmaLoop->getVideoHistoryInfoFilename(),
                'enygmaQuestionPictureFilename' => $enigmaLoop->getEnygmaQuestionPictureFilename(),
            ];
        }

        //return $this->json($jsonEnigmaLoops);
        return new JsonResponse($jsonEnigmaLoops, 201);
    }
}

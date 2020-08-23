<?php


namespace App\Controller;

use App\Entity\UserAdvance;
use App\Repository\CityAdventureRepository;
use App\Repository\EnygmaLoopRepository;
use App\Repository\UserAdvanceRepository;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
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
    private $userRepository;
    private $userAdvanceRepository;
    private $cityAdventuresRepository;
    private $enygmaLoopRepository;

    public function __construct(UserRepository $userRepository, UserAdvanceRepository $userAdvanceRepository, CityAdventureRepository $cityAdventureRepository, EnygmaLoopRepository $enygmaLoopRepository)
    {
        $this->userRepository = $userRepository;
        $this->userAdvanceRepository = $userAdvanceRepository;
        $this->cityAdventuresRepository = $cityAdventureRepository;
        $this->enygmaLoopRepository = $enygmaLoopRepository;
    }

    /**
     * @Route("/user", name="user", methods={"GET"})
     */
    public function user(Request $request)
    {
        $user = $this->getUser();

        return $this->json([
            'id' => $user->getId(),
            'username' => $user->getName(),
            'email' => $user->getEmail(),
            'roles' => $user->getRoles(),
            //'adventuresUserAdvance' => [$user->getUserAdvances()],
        ]);
    }

    /**
     * @Route("/CityAdventures", name="CityAdventures", methods={"GET"})
     */
    public function CityAdventures()
    {
        $cityAdventuresArray = $this->cityAdventuresRepository->findAll();
        $cityAdventures =[];

        foreach ($cityAdventuresArray as $cityAdventureObject) {
            $cityAdventures[] = [
                'adventureId' => $cityAdventureObject->getId(),
                'adventureName' => $cityAdventureObject->getAdventureName(),
                'adventureTown' => $cityAdventureObject->getAdventureTown(),
                'adventurePictureFilename' => $cityAdventureObject->getAdventurePictureFilename(),
                'adventureDuration' => $cityAdventureObject->getAdventureDuration(),
                'adventureDescription' => $cityAdventureObject->getAdventureDescription(),
                'videoAdventureIntroFilename' => $cityAdventureObject->getVideoAdventureIntroFilename(),
                'videoLastEnigmaFilename' => $cityAdventureObject->getVideoLastEnigmaFilename(),
                'lastEnigmaPictureFilename' => $cityAdventureObject->getLastEnigmaPictureFilename(),
                'lastEnigmaQuestionText' => $cityAdventureObject->getLastEnigmaQuestionText(),
                'lastEnigmaExpectedAnswer' => $cityAdventureObject->getLastEnigmaExpectedAnswer(),
                'videoFinalSequenceFilename' => $cityAdventureObject->getVideoFinalSequenceFilename(),
                'adventureWebLink' => $cityAdventureObject->getAdventureWebLink(),
            ];
        }

        return $this->json($cityAdventures);
    }

    /**
     * @Route("/CityAdventure", name="CityAdventure", methods={"POST"})
     */
    public function CityAdventure(Request $request)
    {
        $values = json_decode($request->getContent());
        if (isset($values->id)) {
            $cityAdventure = $this->cityAdventuresRepository->find($values->id);

            $cityAdventureJSON = [
                'adventureId' => $cityAdventure->getId(),
                'adventureName' => $cityAdventure->getAdventureName(),
                'adventureTown' => $cityAdventure->getAdventureTown(),
                'adventurePictureFilename' => $cityAdventure->getAdventurePictureFilename(),
                'adventureDuration' => $cityAdventure->getAdventureDuration(),
                'adventureDescription' => $cityAdventure->getAdventureDescription(),
                'videoAdventureIntroFilename' => $cityAdventure->getVideoAdventureIntroFilename(),
                'videoLastEnigmaFilename' => $cityAdventure->getVideoLastEnigmaFilename(),
                'lastEnigmaPictureFilename' => $cityAdventure->getLastEnigmaPictureFilename(),
                'lastEnigmaQuestionText' => $cityAdventure->getLastEnigmaQuestionText(),
                'lastEnigmaExpectedAnswer' => $cityAdventure->getLastEnigmaExpectedAnswer(),
                'videoFinalSequenceFilename' => $cityAdventure->getVideoFinalSequenceFilename(),
                'lastEnigmaLatitude' => $cityAdventure->getLastEnigmaLatitude(),
                'lastEnigmaLongitude' => $cityAdventure->getLastEnigmaLongitude(),
                'pictoMarker' => $cityAdventure->getPictoMarker(),
                'adventureWebLink' => $cityAdventure->getAdventureWebLink(),
                'pointOfInterest' => $cityAdventure->getPointOfInterest(),
                'catchPositionDistance' => $cityAdventure->getCatchPositionDistance(),
                'adventureLastVidOff' => $cityAdventure->getAdventureLastVidOff(),
                'adventureMapOff' => $cityAdventure->getAdventureMapOff(),
                'adventureFinalQuestionOff' => $cityAdventure->getAdventureFinalQuestionOff(),
                'adventureUseCompass' => $cityAdventure->getAdventureUseCompass(),
            ];

            return $this->json($cityAdventureJSON);
        }
        else {
            $data = [
                'status' => 500,
                'message' => 'L\'aventure n\a pas été trouvée'
            ];

            return new JsonResponse($data, 201);
        }
    }

    /**
     * @Route("/adventureEnigmas", name="adventureEnigmas", methods={"POST"})
     */
    public function adventureEnigmas(Request $request)
    {
        $values = json_decode($request->getContent());
        if (isset($values->adventureId)) {
            $adventureEnigmasArray = $this->cityAdventuresRepository->find($values->adventureId)->getEnygmaLoops();
            $adventureEnigmas = [];

            foreach ($adventureEnigmasArray as $enygmaLoop) {
                $adventureEnigmas[] = [
                    'enigmaId' => $enygmaLoop->getId(),
                    'enigmaStoryOrder' => $enygmaLoop->getStoryOrder(),
                    'enigmaName' => $enygmaLoop->getEnygmaName(),
                    'enigmaLat' => $enygmaLoop->getGpsCoordLatitude(),
                    'enigmaLong' => $enygmaLoop->getGpsCoordLongitude(),
                    'enigmaCompassActive' => $enygmaLoop->getCompasActivate(),
                    'enigmaVideoIntroClue' => $enygmaLoop->getVideoIntroClueFilename(),
                    'enigmaVideoHistoryInfo' => $enygmaLoop->getVideoHistoryInfoFilename(),
                    'enigmaQuestionPicture' => $enygmaLoop->getEnygmaQuestionPictureFilename(),
                    'enigmaQuestionText' => $enygmaLoop->getEnygmaQuestionText(),
                    'enigmaExpectedAnswer' => $enygmaLoop->getEnigmaExpectedAnswer(),
                    'loopPictoMarkerFilename' => $enygmaLoop->getLoopPictoMarker(),
                    'loopDescription' => $enygmaLoop->getLoopDescription(),
                    'loopWebLink' => $enygmaLoop->getLoopWebLink(),
                    'loopCatchPositionDistance' => $enygmaLoop->getLoopCatchPositionDistance(),
                    'loopFirstVidOff' => $enygmaLoop->getLoopFirstVidOff(),
                    'loopMapOff' => $enygmaLoop->getLoopMapOff(),
                    'loopQuestionOff' => $enygmaLoop->getLoopQuestionOff(),
                    'loopUseCompass' => $enygmaLoop->getLoopUseCompass(),
                ];
            }

            return $this->json($adventureEnigmas);
        }
        else {
            $data = [
                'status' => 500,
                'message' => 'Aucune enigme n\'a été trouvée'
            ];

            return new JsonResponse($data, 201);
        }
    }

    /**
     * @Route("/setUserAdvance", name="setUserAdvance", methods={"POST"})
     */
    public function setUserAdvance(Request $request, EntityManagerInterface $entityManager)
    {
        $values = json_decode($request->getContent());
        if (isset($values->userId,$values->adventureId, $values->userAdvance)) {
            $user = $this->userRepository->find($values->userId);
            $userAdvances = $user->getUserAdvances();

            $advantureUserAdvanceExists = false;

            if ($userAdvances) {
                foreach ($userAdvances as $userAdvance) {
                    if ($userAdvance->getAdventureId() === $values->adventureId) {
                        $userAdvance->setAdvanceValue($values->userAdvance);
                        $advantureUserAdvanceExists = true;
                    }
                }
            }

            if ($advantureUserAdvanceExists === false) {
                $newUserAdvance = new UserAdvance();
                $newUserAdvance
                    ->setAdventureId($values->adventureId)
                    ->setAdvanceValue($values->userAdvance)
                ;

                $user->addUserAdvance($newUserAdvance);
            }

            $entityManager->persist($user);
            $entityManager->flush();


            $data = [
                'status' => 201,
                'message' => 'Niveau de joueur enregistré'
            ];

            return new JsonResponse($data, 201);
        }
        else {
            $data = [
                'status' => 500,
                'message' => 'De mauvaises données ont été envoyées'
            ];

            return new JsonResponse($data, 201);
        }
    }

    /**
     * @Route("/getUserAdvance", name="getUserAdvance", methods={"POST"})
     */
    public function getUserAdvance(Request $request)
    {
        $values = json_decode($request->getContent());
        if (isset($values->userId,$values->adventureId)) {
            //$user = $this->userAdvanceRepository->find($values->userId);
            $userAdvanceEntity = $this->userAdvanceRepository->findOneBy(['user' => $values->userId, 'adventureId' => $values->adventureId]);
            $userAdvance = 0;

            if ($userAdvanceEntity) {
                $userAdvance = $userAdvanceEntity->getAdvanceValue();
            }

            $data = [
                'userAdvance' => $userAdvance,
            ];

            return new JsonResponse($data, 201);
        }
        else {
            $data = [
                'status' => 500,
                'message' => 'De mauvaises données ont été envoyées'
            ];

            return new JsonResponse($data, 201);
        }
    }


    /**
     * @Route("/resetUserAdvance", name="resetUserAdvance", methods={"POST"})
     */
    public function resetUserAdvance(Request $request, EntityManagerInterface $entityManager)
    {
        $values = json_decode($request->getContent());
        if (isset($values->userId,$values->adventureId)) {

            $userAdvanceEntity = $this->userAdvanceRepository->findOneBy(['user' => $values->userId, 'adventureId' => $values->adventureId]);


            if ($userAdvanceEntity) {
                $userAdvanceEntity->setAdvanceValue(0);
                $userAdvanceEntity->setGoodAnswersValue(null);

                $entityManager->persist($userAdvanceEntity);
                $entityManager->flush();
            }

            $data = [
                'status' => 201,
                'message' => 'Avancé du joueur réinitialisée'
            ];

            return new JsonResponse($data, 201);
        }
        else {
            $data = [
                'status' => 500,
                'message' => 'De mauvaises données ont été envoyées'
            ];

            return new JsonResponse($data, 201);
        }
    }

    /**
     * @Route("/answerEnigma", name="answerEnigma", methods={"POST"})
     */
    public function answerEnigma(Request $request)
    {
        $values = json_decode($request->getContent());
        if (isset($values->enigmaId,$values->adventureId,$values->enigmaAnswer)) {
            $correctAnswer = '';

            if ($values->enigmaId !== 'none') {
                // Reponse à l'enigme
                $correctAnswer = $this->enygmaLoopRepository->find($values->enigmaId)->getEnigmaExpectedAnswer();

            } else {
                // Reponse à l'enigme finale
                $correctAnswer = $this->cityAdventuresRepository->find($values->adventureId)->getLastEnigmaExpectedAnswer();

            }

            $correctAnswerToLower = strtolower($correctAnswer);
            $enigmaAnswer = strtolower($values->enigmaAnswer);

            $enigmaCorrectAnswerWords = explode(" ", $correctAnswerToLower);
            $answerIsCorrect = false;
            foreach ($enigmaCorrectAnswerWords as $enigmaCorrectAnswerWord) {
                if(preg_match('/'.$enigmaCorrectAnswerWord.'/', $enigmaAnswer) === 1) {
                    $answerIsCorrect = true;
                } else {
                    $answerIsCorrect = false;
                    break;
                }
            }

            if ($answerIsCorrect) {
                $data = [
                    'status' => 201,
                    'message' => 'Bravo ! Bonne réponse !'
                ];

                return new JsonResponse($data, 201);
            } else {
                $data = [
                    'status' => 500,
                    'message' => 'Mauvaise réponse... cherchez encore !'
                ];
                return new JsonResponse($data, 500);
            }

        }
        else {
            $data = [
                'status' => 500,
                'message' => 'Aucune réponse renseignée'
            ];

            return new JsonResponse($data, 500);
        }
    }

    /**
     * @Route("/setGoodAnswersAdvance", name="setGoodAnswersAdvance", methods={"POST"})
     */
    public function setGoodAnswersAdvance(Request $request, EntityManagerInterface $entityManager)
    {
        $values = json_decode($request->getContent());
        if (isset($values->userId,$values->adventureId, $values->goodAnswersAdvance)) {
            $user = $this->userRepository->find($values->userId);
            $userAdvances = $user->getUserAdvances();

            $advantureUserAdvanceExists = false;

            if ($userAdvances) {
                foreach ($userAdvances as $userAdvance) {
                    if ($userAdvance->getAdventureId() === $values->adventureId) {
                        $userAdvance->setGoodAnswersValue(json_encode($values->goodAnswersAdvance));
                        $advantureUserAdvanceExists = true;
                    }
                }
            }

            if ($advantureUserAdvanceExists === false) {
                $newUserAdvance = new UserAdvance();
                $newUserAdvance
                    ->setAdventureId($values->adventureId)
                    ->setGoodAnswersValue(json_encode($values->goodAnswersAdvance));
                ;

                $user->addUserAdvance($newUserAdvance);
            }

            $entityManager->persist($user);
            $entityManager->flush();


            $data = [
                'status' => 201,
                'message' => 'Niveau de réponse aux énigmes de joueur enregistré'
            ];

            return new JsonResponse($data, 201);
        }
        else {
            $data = [
                'status' => 500,
                'message' => 'De mauvaises données ont été envoyées'
            ];

            return new JsonResponse($data, 201);
        }
    }

    /**
     * @Route("/getGoodAnswersAdvance", name="getGoodAnswersAdvance", methods={"POST"})
     */
    public function getGoodAnswersAdvance(Request $request)
    {
        $values = json_decode($request->getContent());
        if (isset($values->userId,$values->adventureId)) {
            //$user = $this->userAdvanceRepository->find($values->userId);
            $userAdvanceEntity = $this->userAdvanceRepository->findOneBy(['user' => $values->userId, 'adventureId' => $values->adventureId]);
            $userGoodAnswersAdvance = null;

            if ($userAdvanceEntity) {
                $userGoodAnswersAdvance = $userAdvanceEntity->getGoodAnswersValue();
            }

            if ($userGoodAnswersAdvance) {
                $data = json_decode($userGoodAnswersAdvance, true);
            } else {
                $data = null;
            }

            return new JsonResponse($data, 201);
        }
        else {
            $data = [
                'status' => 500,
                'message' => 'De mauvaises données ont été envoyées'
            ];

            return new JsonResponse($data, 201);
        }
    }
}
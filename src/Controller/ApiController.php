<?php


namespace App\Controller;

use App\Repository\CityAdventureRepository;
use App\Repository\EnygmaLoopRepository;
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
    private $cityAdventuresRepository;
    private $enygmaLoopRepository;

    public function __construct(CityAdventureRepository $cityAdventureRepository, EnygmaLoopRepository $enygmaLoopRepository)
    {
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
}
<?php


namespace App\Controller;

use App\Repository\CityAdventureRepository;
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

    public function __construct(CityAdventureRepository $cityAdventureRepository)
    {
        $this->cityAdventuresRepository = $cityAdventureRepository;
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

            $cityAdventure = [
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

            return $this->json($cityAdventure);
        }
        else {
            $data = [
                'status' => 500,
                'message' => 'L\'aventure n\a pas été trouvée'
            ];

            return new JsonResponse($data, 201);
        }
    }
}
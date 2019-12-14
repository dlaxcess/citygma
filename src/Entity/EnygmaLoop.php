<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\EnygmaLoopRepository")
 */
class EnygmaLoop
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=10, nullable=true)
     */
    private $storyOrder;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $enygmaName;

    /**
     * @ORM\Column(type="float", nullable=true)
     */
    private $gpsCoordLatitude;

    /**
     * @ORM\Column(type="float", nullable=true)
     */
    private $gpsCoordLongitude;

    /**
     * @ORM\Column(type="boolean", nullable=true)
     */
    private $compasActivate;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $videoIntroClueFilename;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $videoHistoryInfoFilename;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $enygmaQuestionPictureFilename;

    /**
     * @ORM\Column(type="text", nullable=true)
     */
    private $enygmaQuestionText;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $enigmaExpectedAnswer;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\CityAdventure", inversedBy="enygmaLoops")
     */
    private $cityAdventure;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getStoryOrder(): ?string
    {
        return $this->storyOrder;
    }

    public function setStoryOrder(?string $storyOrder): self
    {
        $this->storyOrder = $storyOrder;

        return $this;
    }

    public function getEnygmaName(): ?string
    {
        return $this->enygmaName;
    }

    public function setEnygmaName(?string $enygmaName): self
    {
        $this->enygmaName = $enygmaName;

        return $this;
    }

    public function getGpsCoordLatitude(): ?float
    {
        return $this->gpsCoordLatitude;
    }

    public function setGpsCoordLatitude(?float $gpsCoordLatitude): self
    {
        $this->gpsCoordLatitude = $gpsCoordLatitude;

        return $this;
    }

    public function getGpsCoordLongitude(): ?float
    {
        return $this->gpsCoordLongitude;
    }

    public function setGpsCoordLongitude(?float $gpsCoordLongitude): self
    {
        $this->gpsCoordLongitude = $gpsCoordLongitude;

        return $this;
    }

    public function getCompasActivate(): ?bool
    {
        return $this->compasActivate;
    }

    public function setCompasActivate(?bool $compasActivate): self
    {
        $this->compasActivate = $compasActivate;

        return $this;
    }

    public function getVideoIntroClueFilename(): ?string
    {
        return $this->videoIntroClueFilename;
    }

    public function setVideoIntroClueFilename(?string $videoIntroClueFilename): self
    {
        $this->videoIntroClueFilename = $videoIntroClueFilename;

        return $this;
    }

    public function getVideoHistoryInfoFilename(): ?string
    {
        return $this->videoHistoryInfoFilename;
    }

    public function setVideoHistoryInfoFilename(?string $videoHistoryInfoFilename): self
    {
        $this->videoHistoryInfoFilename = $videoHistoryInfoFilename;

        return $this;
    }

    public function getEnygmaQuestionPictureFilename(): ?string
    {
        return $this->enygmaQuestionPictureFilename;
    }

    public function setEnygmaQuestionPictureFilename(?string $enygmaQuestionPictureFilename): self
    {
        $this->enygmaQuestionPictureFilename = $enygmaQuestionPictureFilename;

        return $this;
    }

    public function getEnygmaQuestionText(): ?string
    {
        return $this->enygmaQuestionText;
    }

    public function setEnygmaQuestionText(?string $enygmaQuestionText): self
    {
        $this->enygmaQuestionText = $enygmaQuestionText;

        return $this;
    }

    public function getEnigmaExpectedAnswer(): ?string
    {
        return $this->enigmaExpectedAnswer;
    }

    public function setEnigmaExpectedAnswer(?string $enigmaExpectedAnswer): self
    {
        $this->enigmaExpectedAnswer = $enigmaExpectedAnswer;

        return $this;
    }

    public function getCityAdventure(): ?CityAdventure
    {
        return $this->cityAdventure;
    }

    public function setCityAdventure(?CityAdventure $cityAdventure): self
    {
        $this->cityAdventure = $cityAdventure;

        return $this;
    }
}

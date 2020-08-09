<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\CityAdventureRepository")
 */
class CityAdventure
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $adventureName;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $adventureTown;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $adventurePictureFilename;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $adventureDuration;

    /**
     * @ORM\Column(type="text", nullable=true)
     */
    private $adventureDescription;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $videoAdventureIntroFilename;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $videoLastEnigmaFilename;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $lastEnigmaPictureFilename;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $lastEnigmaQuestionText;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $lastEnigmaExpectedAnswer;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $videoFinalSequenceFilename;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\EnygmaLoop", mappedBy="cityAdventure", cascade={"persist"}, orphanRemoval=true)
     */
    private $enygmaLoops;

    /**
     * @ORM\Column(type="float", nullable=true)
     */
    private $lastEnigmaLatitude;

    /**
     * @ORM\Column(type="float", nullable=true)
     */
    private $lastEnigmaLongitude;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $pictoMarker;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $adventureWebLink;

    /**
     * @ORM\Column(type="boolean", nullable=true)
     */
    private $pointOfInterest;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $catchPositionDistance;

    /**
     * @ORM\Column(type="boolean", nullable=true)
     */
    private $adventureLastVidOff;

    /**
     * @ORM\Column(type="boolean", nullable=true)
     */
    private $adventureMapOff;

    /**
     * @ORM\Column(type="boolean", nullable=true)
     */
    private $adventureFinalQuestionOff;

    /**
     * @ORM\Column(type="boolean", nullable=true)
     */
    private $adventureUseCompass;

    public function __construct()
    {
        $this->enygmaLoops = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getAdventureName(): ?string
    {
        return $this->adventureName;
    }

    public function setAdventureName(?string $adventureName): self
    {
        $this->adventureName = $adventureName;

        return $this;
    }

    public function getAdventureTown(): ?string
    {
        return $this->adventureTown;
    }

    public function setAdventureTown(?string $adventureTown): self
    {
        $this->adventureTown = $adventureTown;

        return $this;
    }

    public function getAdventurePictureFilename(): ?string
    {
        return $this->adventurePictureFilename;
    }

    public function setAdventurePictureFilename(?string $adventurePictureFilename): self
    {
        $this->adventurePictureFilename = $adventurePictureFilename;

        return $this;
    }

    public function getAdventureDuration(): ?string
    {
        return $this->adventureDuration;
    }

    public function setAdventureDuration(?string $adventureDuration): self
    {
        $this->adventureDuration = $adventureDuration;

        return $this;
    }

    public function getAdventureDescription(): ?string
    {
        return $this->adventureDescription;
    }

    public function setAdventureDescription(?string $adventureDescription): self
    {
        $this->adventureDescription = $adventureDescription;

        return $this;
    }

    public function getVideoAdventureIntroFilename(): ?string
    {
        return $this->videoAdventureIntroFilename;
    }

    public function setVideoAdventureIntroFilename(?string $videoAdventureIntroFilename): self
    {
        $this->videoAdventureIntroFilename = $videoAdventureIntroFilename;

        return $this;
    }

    public function getVideoLastEnigmaFilename(): ?string
    {
        return $this->videoLastEnigmaFilename;
    }

    public function setVideoLastEnigmaFilename(?string $videoLastEnigmaFilename): self
    {
        $this->videoLastEnigmaFilename = $videoLastEnigmaFilename;

        return $this;
    }

    public function getLastEnigmaPictureFilename(): ?string
    {
        return $this->lastEnigmaPictureFilename;
    }

    public function setLastEnigmaPictureFilename(?string $lastEnigmaPictureFilename): self
    {
        $this->lastEnigmaPictureFilename = $lastEnigmaPictureFilename;

        return $this;
    }

    public function getLastEnigmaQuestionText(): ?string
    {
        return $this->lastEnigmaQuestionText;
    }

    public function setLastEnigmaQuestionText(?string $lastEnigmaQuestionText): self
    {
        $this->lastEnigmaQuestionText = $lastEnigmaQuestionText;

        return $this;
    }

    public function getLastEnigmaExpectedAnswer(): ?string
    {
        return $this->lastEnigmaExpectedAnswer;
    }

    public function setLastEnigmaExpectedAnswer(?string $lastEnigmaExpectedAnswer): self
    {
        $this->lastEnigmaExpectedAnswer = $lastEnigmaExpectedAnswer;

        return $this;
    }

    public function getVideoFinalSequenceFilename(): ?string
    {
        return $this->videoFinalSequenceFilename;
    }

    public function setVideoFinalSequenceFilename(?string $videoFinalSequenceFilename): self
    {
        $this->videoFinalSequenceFilename = $videoFinalSequenceFilename;

        return $this;
    }

    /**
     * @return Collection|EnygmaLoop[]
     */
    public function getEnygmaLoops(): Collection
    {
        return $this->enygmaLoops;
    }

    public function addEnygmaLoop(EnygmaLoop $enygmaLoop): self
    {
        if (!$this->enygmaLoops->contains($enygmaLoop)) {
            $this->enygmaLoops[] = $enygmaLoop;
            $enygmaLoop->setCityAdventure($this);
        }

        return $this;
    }

    public function removeEnygmaLoop(EnygmaLoop $enygmaLoop): self
    {
        if ($this->enygmaLoops->contains($enygmaLoop)) {
            $this->enygmaLoops->removeElement($enygmaLoop);
            // set the owning side to null (unless already changed)
            if ($enygmaLoop->getCityAdventure() === $this) {
                $enygmaLoop->setCityAdventure(null);
            }
        }

        return $this;
    }

    public function getLastEnigmaLatitude(): ?float
    {
        return $this->lastEnigmaLatitude;
    }

    public function setLastEnigmaLatitude(?float $lastEnigmaLatitude): self
    {
        $this->lastEnigmaLatitude = $lastEnigmaLatitude;

        return $this;
    }

    public function getLastEnigmaLongitude(): ?float
    {
        return $this->lastEnigmaLongitude;
    }

    public function setLastEnigmaLongitude(?float $lastEnigmaLongitude): self
    {
        $this->lastEnigmaLongitude = $lastEnigmaLongitude;

        return $this;
    }

    public function getPictoMarker(): ?string
    {
        return $this->pictoMarker;
    }

    public function setPictoMarker(?string $pictoMarker): self
    {
        $this->pictoMarker = $pictoMarker;

        return $this;
    }

    public function getAdventureWebLink(): ?string
    {
        return $this->adventureWebLink;
    }

    public function setAdventureWebLink(?string $adventureWebLink): self
    {
        $this->adventureWebLink = $adventureWebLink;

        return $this;
    }

    public function getPointOfInterest(): ?bool
    {
        return $this->pointOfInterest;
    }

    public function setPointOfInterest(?bool $pointOfInterest): self
    {
        $this->pointOfInterest = $pointOfInterest;

        return $this;
    }

    public function getCatchPositionDistance(): ?int
    {
        return $this->catchPositionDistance;
    }

    public function setCatchPositionDistance(?int $catchPositionDistance): self
    {
        $this->catchPositionDistance = $catchPositionDistance;

        return $this;
    }

    public function getAdventureLastVidOff(): ?bool
    {
        return $this->adventureLastVidOff;
    }

    public function setAdventureLastVidOff(?bool $adventureLastVidOff): self
    {
        $this->adventureLastVidOff = $adventureLastVidOff;

        return $this;
    }

    public function getAdventureMapOff(): ?bool
    {
        return $this->adventureMapOff;
    }

    public function setAdventureMapOff(?bool $adventureMapOff): self
    {
        $this->adventureMapOff = $adventureMapOff;

        return $this;
    }

    public function getAdventureFinalQuestionOff(): ?bool
    {
        return $this->adventureFinalQuestionOff;
    }

    public function setAdventureFinalQuestionOff(?bool $adventureFinalQuestionOff): self
    {
        $this->adventureFinalQuestionOff = $adventureFinalQuestionOff;

        return $this;
    }

    public function getAdventureUseCompass(): ?bool
    {
        return $this->adventureUseCompass;
    }

    public function setAdventureUseCompass(?bool $adventureUseCompass): self
    {
        $this->adventureUseCompass = $adventureUseCompass;

        return $this;
    }
}

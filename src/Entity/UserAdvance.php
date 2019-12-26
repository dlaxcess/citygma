<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\UserAdvanceRepository")
 */
class UserAdvance
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $adventureId;

    /**
     * @ORM\Column(type="float", nullable=true)
     */
    private $advanceValue;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\User", inversedBy="userAdvances")
     */
    private $user;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getAdventureId(): ?int
    {
        return $this->adventureId;
    }

    public function setAdventureId(?int $adventureId): self
    {
        $this->adventureId = $adventureId;

        return $this;
    }

    public function getAdvanceValue(): ?float
    {
        return $this->advanceValue;
    }

    public function setAdvanceValue(?float $advanceValue): self
    {
        $this->advanceValue = $advanceValue;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }
}

<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;

/**
 * @ORM\Entity(repositoryClass="App\Repository\UserRepository")
 * @UniqueEntity(fields={"email"}, message="Cet utilisateur existe déjà")
 */
class User implements UserInterface
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=180)
     */
    private $username;

    /**
     * @ORM\Column(type="string", length=180, unique=true)
     */
    private $email;

    /**
     * @ORM\Column(type="json")
     */
    private $roles = [];

    /**
     * @var string The hashed password
     * @ORM\Column(type="string")
     */
    private $password;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\UserAdvance", mappedBy="user", cascade={"persist"})
     */
    private $userAdvances;

    /**
     * @ORM\Column(type="boolean", nullable=true)
     */
    private $userMailingOk;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $userNickName;

    public function __construct()
    {
        $this->userAdvances = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): string
    {
        return (string) $this->username;
    }

    public function setUsername(string $username): self
    {
        $this->username = $username;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUsername(): string
    {
        return (string) $this->email;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function getPassword(): string
    {
        return (string) $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function getSalt()
    {
        // not needed when using the "bcrypt" algorithm in security.yaml
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    /**
     * @return Collection|UserAdvance[]
     */
    public function getUserAdvances(): Collection
    {
        return $this->userAdvances;
    }

    public function addUserAdvance(UserAdvance $userAdvance): self
    {
        if (!$this->userAdvances->contains($userAdvance)) {
            $this->userAdvances[] = $userAdvance;
            $userAdvance->setUser($this);
        }

        return $this;
    }

    public function removeUserAdvance(UserAdvance $userAdvance): self
    {
        if ($this->userAdvances->contains($userAdvance)) {
            $this->userAdvances->removeElement($userAdvance);
            // set the owning side to null (unless already changed)
            if ($userAdvance->getUser() === $this) {
                $userAdvance->setUser(null);
            }
        }

        return $this;
    }

    public function getUserMailingOk(): ?bool
    {
        return $this->userMailingOk;
    }

    public function setUserMailingOk(?bool $userMailingOk): self
    {
        $this->userMailingOk = $userMailingOk;

        return $this;
    }

    public function getUserNickName(): ?string
    {
        return $this->userNickName;
    }

    public function setUserNickName(?string $userNickName): self
    {
        $this->userNickName = $userNickName;

        return $this;
    }
}

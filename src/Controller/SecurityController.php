<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;

/**
 * @Route("/api")
 */
class SecurityController extends AbstractController
{
    /**
     * @Route("/register", name="register", methods={"POST"})
     */
    public function register(Request $request, UserPasswordEncoderInterface $passwordEncoder, EntityManagerInterface $entityManager, SerializerInterface $serializer, ValidatorInterface $validator)
    {
        $values = json_decode($request->getContent());
        if(isset($values->username,$values->email,$values->password)) {
            $user = new User();
            $user->setUsername($values->username);
            $user->setEmail($values->email);
            $user->setPassword($passwordEncoder->encodePassword($user, $values->password));
            $user->setRoles($user->getRoles());

            $errors = $validator->validate($user);
            if(count($errors)) {
                $errors = $serializer->serialize($errors, 'json');
                return new Response($errors, 500, [
                    'Content-Type' => 'application/json'
                ]);
            }

            $entityManager->persist($user);
            $entityManager->flush();

            $data = [
                'status' => 201,
                'message' => 'L\'utilisateur a été créé'
            ];

            return new JsonResponse($data, 201);
        }

        $data = [
            'status' => 500,
            'message' => 'Vous devez renseigner les clés username et password'
        ];
        return new JsonResponse($data, 500);
    }

    /**
     * @Route("/userDataChange", name="userDataChange", methods={"POST"})
     */
    public function userDataChange(Request $request, UserRepository $userRepository, EntityManagerInterface $entityManager)
    {
        $values = json_decode($request->getContent());
        if(isset($values->id,$values->username,$values->email)) {
            $user = $userRepository->find(array('id' => $values->id));

            if ($values->username) {
                $user->setUsername($values->username);
            }
            if ($values->email) {
                $user->setEmail($values->email);
            }



            $entityManager->persist($user);
            $entityManager->flush();

            $data = [
                'status' => 201,
                'message' => 'Les données ont bien été modifiées',
                'email' => $user->getEmail()
            ];

            return new JsonResponse($data, 201);
        }
    }

    /**
     * @Route("/userPasswordChange", name="userPasswordChange", methods={"POST"})
     */
    public function userPasswordChange(Request $request, UserPasswordEncoderInterface $passwordEncoder, UserRepository $userRepository, EntityManagerInterface $entityManager)
    {
        $values = json_decode($request->getContent());
        if (isset($values->oldPass, $values->newPass)) {
            $user = $this->getUser();

            if ($passwordEncoder->isPasswordValid($user, $values->oldPass)) {
                $newEncodedPassword = $passwordEncoder->encodePassword($user, $values->newPass);
                $user->setPassword($newEncodedPassword);

                $entityManager->persist($user);
                $entityManager->flush();

                $data = [
                    'status' => 201,
                    'message' => 'Le mot de passe a bien été modifiées',
                    'email' => $user->getEmail(),
                    'newPass' => $values->newPass
                ];

                return new JsonResponse($data, 201);
            } else {
                $data = [
                    'status' => 500,
                    'message' => 'Ancien mot de passe incorrect',
                ];

                return new JsonResponse($data, 500);
            }
        }
    }

    /**
     * @Route("/login", name="login")
     */
    public function login_admin(Request $request)
    {
        /*$user = $this->getUser();
        return $this->json([
            'username' => $user->getUsername(),
            'roles' => $user->getRoles()
        ]);*/

    }

    /**
     * @Route("/logout", name="logout")
     */
    public function logout()
    {

    }
}

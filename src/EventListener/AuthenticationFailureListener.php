<?php


namespace App\EventListener;


use Lexik\Bundle\JWTAuthenticationBundle\Event\AuthenticationFailureEvent;
use Lexik\Bundle\JWTAuthenticationBundle\Response\JWTAuthenticationFailureResponse;


class AuthenticationFailureListener
{
    /**
     * @param AuthenticationFailureEvent $event
     */
    public function onAuthenticationFailureResponse(AuthenticationFailureEvent $event)
    {
        $data = /*[*/
            //'status' => '401 Unauthorized',
            /*'message' => */'Votre identifiant ou votre mot de passe est incorrect'/*,
        ]*/;

        $response = new JWTAuthenticationFailureResponse($data);

        $event->setResponse($response);
    }
}
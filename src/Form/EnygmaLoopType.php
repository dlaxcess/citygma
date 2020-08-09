<?php

namespace App\Form;

use App\Entity\EnygmaLoop;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\Form\Extension\Core\Type\NumberType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\File;
use Symfony\Component\Validator\Constraints\Image;
use Symfony\Component\Validator\Constraints\NotBlank;

class EnygmaLoopType extends AbstractType
{
    private const VIDEO_MAX_SIZE = 10000000;
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('storyOrder', TextType::class)
            ->add('enygmaName', TextType::class)
            ->add('loopPictoMarker', FileType::class, [
                'label' => 'Marker Gps de la loop',
                'mapped' => false,
                'required' => false,
                'constraints' => [
                    new File([
                        'maxSize' => '1024k',
                        'mimeTypes' => [
                            'image/jpeg',
                            'image/png',
                        ],
                        'mimeTypesMessage' => 'Veuillez selectionner une image JPG ou PNG valide',
                    ])
                ],
            ])
            ->add('loopWebLink', TextType::class)
            ->add('loopCatchPositionDistance', NumberType::class)
            ->add('loopDescription', TextareaType::class)
            ->add('gpsCoordLatitude', NumberType::class, [
                'scale' => 6,
            ])
            ->add('gpsCoordLongitude', NumberType::class, [
                'scale' => 6,
            ])
            ->add('compasActivate', CheckboxType::class, [
                'label'    => 'Utiliser la boussole pour l\'enigme',
                'required' => false,
            ])
            ->add('loopUseCompass', CheckboxType::class, [
                'label'    => 'Utiliser le compas mobile pour la loop d\'énigme',
                'required' => false,
            ])
            ->add('videoIntroClueFilename', FileType::class, [
                'label' => 'Vidéo d\'indice d\'intro de l\'enigme',
                'mapped' => false,
                'required' => false,
                'constraints' => [
                    new File([
                        'maxSize' => '8192k',
                        'mimeTypes' => [
                            'video/mp4',
                            'video/webm'
                        ],
                        'mimeTypesMessage' => 'Veuillez selectionner une vidéo MPEG valide',
                    ])
                ],
            ])
            ->add('videoHistoryInfoFilename', FileType::class, [
                'label' => 'Vidéo d\'information historique sur le lieu',
                'mapped' => false,
                'required' => false,
                'constraints' => [
                    new File([
                        'maxSize' => '8192k',
                        'mimeTypes' => [
                            'video/mp4',
                            'video/webm'
                        ],
                        'mimeTypesMessage' => 'Veuillez selectionner une vidéo MPEG valide',
                    ])
                ],
            ])
            ->add('loopFirstVidOff', CheckboxType::class, [
                'label'    => 'Désactiver la première vidéo de la loop d\'énigme',
                'required' => false,
            ])
            ->add('loopMapOff', CheckboxType::class, [
                'label'    => 'Désactiver la map pour la loop d\'énigme',
                'required' => false,
            ])
            ->add('loopQuestionOff', CheckboxType::class, [
                'label'    => 'Désactiver la question de la loop d\'énigme',
                'required' => false,
            ])
            ->add('enygmaQuestionPictureFilename', FileType::class, [
                'label' => 'Image d\'illustration de la question de l\'enigme',
                'mapped' => false,
                'required' => false,
                'constraints' => [
                    new File([
                        'maxSize' => '1024k',
                        'mimeTypes' => [
                            'image/jpeg',
                        ],
                        'mimeTypesMessage' => 'Veuillez selectionner une image JPG valide',
                    ])
                ],
            ])
            ->add('enygmaQuestionText', TextareaType::class)
            ->add('enigmaExpectedAnswer', TextType::class)
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => EnygmaLoop::class,
        ]);
    }
}

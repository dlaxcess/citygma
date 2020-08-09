<?php

namespace App\Form;

use App\Entity\CityAdventure;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\CollectionType;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\Form\Extension\Core\Type\NumberType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\File;

class CityAdventureType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('adventureName', TextType::class)
            ->add('adventureTown', TextType::class)
            ->add('adventurePictureFilename', FileType::class, [
                'label' => 'Image de l\'aventure',
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
            ->add('adventureDuration', TextType::class)
            ->add('pointOfInterest', CheckboxType::class, [
                'label'    => 'Déclarer comme Point d\'intérêt',
                'required' => false,
            ])
            ->add('adventureDescription', TextareaType::class)
            ->add('pictoMarker', FileType::class, [
                'label' => 'Marker Gps de l\'aventure',
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
            ->add('adventureWebLink', TextType::class)
            ->add('videoAdventureIntroFilename', FileType::class, [
                'label' => 'Vidéo d\'intro de l\'aventure',
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
            ->add('videoLastEnigmaFilename', FileType::class, [
                'label' => 'Vidéo de dernière énigme de l\'aventure',
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
            ->add('adventureLastVidOff', CheckboxType::class, [
                'label'    => 'Désactiver la vidéo d\'énigme finale',
                'required' => false,
            ])
            ->add('adventureMapOff', CheckboxType::class, [
                'label'    => 'Désactiver la carte pour l\'énigme finale',
                'required' => false,
            ])
            ->add('adventureFinalQuestionOff', CheckboxType::class, [
                'label'    => 'Désactiver la Question d\'énigme finale',
                'required' => false,
            ])
            ->add('adventureUseCompass', CheckboxType::class, [
                'label'    => 'Activer le compas mobile',
                'required' => false,
            ])
            ->add('lastEnigmaPictureFilename', FileType::class, [
                'label' => 'Image de dernière énigme l\'aventure',
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
            ->add('lastEnigmaLatitude', NumberType::class, [
                'scale' => 6,
            ])
            ->add('lastEnigmaLongitude', NumberType::class, [
                'scale' => 6,
            ])
            ->add('catchPositionDistance', NumberType::class)
            ->add('lastEnigmaQuestionText', TextareaType::class)
            ->add('lastEnigmaExpectedAnswer', TextType::class)
            ->add('videoFinalSequenceFilename', FileType::class, [
                'label' => 'Vidéo de séquence finale de l\'aventure',
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
            ->add('enygmaLoops', CollectionType::class, array(
                'entry_type'   => EnygmaLoopType::class,
                'allow_add'    => true,
                'allow_delete' => true,
                'by_reference' => false,
            ))

            /*->add('Enregistrer l\'aventure', SubmitType::class)*/
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => CityAdventure::class,
        ]);
    }
}

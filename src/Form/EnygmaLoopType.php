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

class EnygmaLoopType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('storyOrder', TextType::class)
            ->add('enygmaName', TextType::class)
            ->add('gpsCoordLatitude', NumberType::class)
            ->add('gpsCoordLongitude', NumberType::class)
            ->add('compasActivate', CheckboxType::class, [
                'label'    => 'Utiliser la boussole pour l\'enigme',
                'required' => false,
            ])
            ->add('videoIntroClueFilename', FileType::class, [
                'label' => 'Vidéo d\'indice d\'intro de l\'enigme',
                'mapped' => false,
                'required' => false,
                'constraints' => [
                    new File([
                        'maxSize' => '2048k',
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
                        'maxSize' => '2048k',
                        'mimeTypes' => [
                            'video/mp4',
                            'video/webm'
                        ],
                        'mimeTypesMessage' => 'Veuillez selectionner une vidéo MPEG valide',
                    ])
                ],
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

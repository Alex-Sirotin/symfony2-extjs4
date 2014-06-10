<?php

namespace Cognitive\TestBundle\Controller;

use Cognitive\TestBundle\Entity\Education;

class EducationController extends TestBaseController
{
    protected $currentEntity = 'CognitiveTestBundle:Education';

    protected function setEntity($data, $entity = null) {
        $result = $entity;
        if (!$entity) {
            $result = new Education();
        }
        $result->setName($data->name);
        return $result;
    }
}

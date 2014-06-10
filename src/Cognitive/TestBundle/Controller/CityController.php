<?php

namespace Cognitive\TestBundle\Controller;

use Cognitive\TestBundle\Entity\City;

class CityController extends TestBaseController
{
    protected $currentEntity = 'CognitiveTestBundle:City';

    protected function setEntity($data, $entity = null) {
        $result = $entity;
        if (!$entity) {
            $result = new City();
        }
        $result->setName($data->name);
        return $result;
    }
}

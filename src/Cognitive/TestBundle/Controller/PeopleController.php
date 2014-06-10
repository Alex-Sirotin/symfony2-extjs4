<?php

namespace Cognitive\TestBundle\Controller;

use Cognitive\TestBundle\Entity\People;

class PeopleController extends TestBaseController
{
    protected $currentEntity   = 'CognitiveTestBundle:People';
    protected $educationEntity = 'CognitiveTestBundle:Education';
    protected $cityEntity      = 'CognitiveTestBundle:City';

    protected function setEntity($data, $entity = null) {
        $result = $entity;
        if (!$entity) {
            $result = new People();
        }

        $result->setName($data->name);

        $educationRepository = $this->getRepository($this->educationEntity);
        $education = $educationRepository->find($data->education_id);
        if ($education) {
            $result->setEducation($education);
        }

        $cityRepository = $this->getRepository($this->cityEntity);
        $query = $cityRepository->createQueryBuilder('c');
        $query = $query->add('where', $query->expr()->in('c.id', explode('|', $data->city_id)))->getQuery();
        $cities = $query->getResult();
        if ($cities) {
            $result->setCities($cities);
        }

        return $result;
    }
}

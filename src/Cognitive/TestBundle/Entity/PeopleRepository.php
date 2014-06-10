<?php

namespace Cognitive\TestBundle\Entity;

use Doctrine\ORM\EntityRepository;

class PeopleRepository extends TestBaseRepository
{

    function getArray($where = null, $order = null) {
        $query  = $this->createQueryBuilder('r')
            ->select(['p', 'e', 'c'])
            ->from('CognitiveTestBundle:People', 'p')
            ->leftJoin('p.education', 'e')
            ->leftJoin('p.cities', 'c');

        if ($where) {
            foreach($where as $condition) {
                $query = $query->where($condition['field'], $condition['value']);
            }
        }

        if ($order) {
            $query = $query->orderBy($order['field'], $order['direction'] ?: null);
        }

        $result = $query->getQuery()->getArrayResult();

        foreach($result as &$row) {
            $row['education_id']   = $row['education']['id'];
            $row['education_name'] = $row['education']['name'];
            $cities     = [];
            $cities_ids = [];
            foreach($row['cities'] as $city) {
                $cities[]         = $city['name'];
                $cities_ids[]     = $city['id'];
            }
            $row['cities']   = $cities_ids;
            $row['city_id']   = implode(",", $cities_ids);
            $row['city_name'] = implode(", ", $cities);
            //unset(&$row);
        }

        return $result;
    }

}

<?php

namespace Cognitive\TestBundle\Entity;

use Doctrine\ORM\EntityRepository;
//use Symfony\Component\HttpFoundation\JsonResponse;

class TestBaseRepository extends EntityRepository {

    function getAllArray($order = null) {
        return $this->getArray($order);
    }

    function getByIdArray($id, $order = null) {
        return $this->getArray(
            [
                [ 'field' => 'e.id = :id', 'value' => $id ]
            ],
            $order
        );
    }

    function getArray($where = null, $order = null) {
        $query      = $this->createQueryBuilder('e');

        if ($where) {
            foreach($where as $condition) {
                $query = $query->where($condition['field'], $condition['value']);
            }
        }

        if ($order) {
            $query = $query->orderBy($order['field'], $order['direction'] ?: null);
        }

        $result = $query->getQuery()->getArrayResult();

        return $result;
    }
}

?>

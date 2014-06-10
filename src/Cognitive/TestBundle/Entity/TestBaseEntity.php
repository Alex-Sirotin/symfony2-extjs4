<?php

namespace Cognitive\TestBundle\Entity;

class TestBaseEntity {
    function toArray() {
        $reflectedClass   = new \ReflectionClass(get_class());
        $objectProperties = $reflectedClass->getProperties();
        $data             = [];
        foreach ($objectProperties as $objectProperty) {
            $name   = $objectProperty->getName();
            $value  = $objectProperty->getValue();
            $data[]   = [$name => $value];
        }

        return $data;
    }
}

?>

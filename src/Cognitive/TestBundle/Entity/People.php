<?php

namespace Cognitive\TestBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;

/**
 * People
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="Cognitive\TestBundle\Entity\PeopleRepository")
 */
class People extends TestBaseEntity
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="name", type="string", length=50)
     */
    private $name;

    /**
     * @ORM\ManyToOne(targetEntity="Education", inversedBy="peoples")
     * @ORM\JoinColumn(name="education_id", referencedColumnName="id")
     */
    private $education;

    /**
     * @ORM\ManyToMany(targetEntity="City")
     * @ORM\JoinTable(name="peoples_cities",
     *      joinColumns={@ORM\JoinColumn(name="people_id", referencedColumnName="id")},
     *      inverseJoinColumns={@ORM\JoinColumn(name="city_id", referencedColumnName="id")}
     *      )
     */
    private $cities;

    public function __construct() {
        $this->cities = new ArrayCollection();
    }

    public function getId() {
        return $this->id;
    }

    public function getCities() {
        return $this->cities;
    }

    public function setCities($cities) {
        $this->cities = $cities;
    }

    public function setEducation($education) {
        $this->education = $education;
    }

    public function setName($name) {
        $this->name = $name;
        return $this;
    }

    public function getName() {
        return $this->name;
    }

//    function toArray() {
//        $reflectedClass   = new \ReflectionClass(get_class());
//        $objectProperties = $reflectedClass->getProperties();
//        $data             = [];
//        foreach ($objectProperties as $objectProperty) {
//            $name   = $objectProperty->getName();
//            $value  = $objectProperty->getValue();
//            $data[]   = [$name => $value];
//        }
//
//        print_r($data);
//
//        return $data;
//    }
}

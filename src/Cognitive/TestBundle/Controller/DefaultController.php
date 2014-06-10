<?php

namespace Cognitive\TestBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    public function indexAction() {
        return $this->render('CognitiveTestBundle:Default:index.html.twig');
    }
}

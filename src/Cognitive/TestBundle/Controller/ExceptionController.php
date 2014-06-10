<?php

namespace Cognitive\TestBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpKernel\Exception\FlattenException;
use Symfony\Component\HttpKernel\Log\DebugLoggerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;

//class ExceptionController extends \Symfony\Bundle\TwigBundle\Controller\ExceptionController {
class ExceptionController extends Controller {

    public function showAction(Request $request, FlattenException $exception, DebugLoggerInterface $logger = null) {
        $status_code = $exception->getStatusCode();
        $status_text = isset(Response::$statusTexts[$status_code]) ? Response::$statusTexts[$status_code] : '';
        $msg         = $exception->getMessage() ? : "Unknown error!";
        //$currentContent = $this->getAndCleanOutputBuffering($request->headers->get('X-Php-Ob-Level', -1));
        $response = new JsonResponse();
        $response->setData([
            'success'     => false,
            'msg'         => $msg,
            'status_code' => $status_code,
            'status_text' => $status_text
        ]);

        return $response;
    }
}
?>

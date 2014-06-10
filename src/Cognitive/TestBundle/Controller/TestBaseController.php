<?php

namespace Cognitive\TestBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
//use Symfony\Component\HttpKernel\Exception\HttpException;

class TestBaseController extends Controller {

    public function getRepository($currentEntity = null) {
        $currentEntity  = $currentEntity ? : $this->currentEntity;
        $em         = $this->getDoctrine()->getManager();
        $repository = $em->getRepository($currentEntity);
        return $repository;
    }

    public function checkData($entity) {
        $validator = $this->get('validator');
        $errors = $validator->validate($entity);
        if ($errors->count() > 0) {
            //$msg = implode('. ', $errors);
            throw new \Exception($errors);
        }
        return true;
    }

    public function save($entity) {
        $em = $this->getDoctrine()->getManager();
        $this->checkData($entity);
        if ($entity) {
            $em->persist($entity);
        }
        $em->flush();
        return $entity;
    }

    public function getErrorJson($e) {
        if ($e instanceof Exception) {
            $msg = $e->getMessage();
        } else {
            $msg = $e;
        }

        $response = new JsonResponse();
        $response->setData([
            'msg'     => $msg ?: "Unknown error!",
            'success' => false
        ]);

        return $response;
    }

    public function getResultJson($data, $page = 0, $pageSize = 50) {

        if (!is_array($data)) {
            $data = [$data];
        }

        $response = new JsonResponse();
        $response->setData([
            'data'     => $data,
            'total'    => count($data),
            'success'  => true,
            'page'     => $page,
            'pageSize' => $pageSize
        ]);

        return $response;
    }

    public function getRequestData($request) {
        $data = json_decode($request->request->get('data'));
        if (!is_array($data)) {
            $data = [$data];
        }
        return $data;
    }

    protected function setData($data) {
        $result = [];
        $em   = $this->getDoctrine()->getManager();

        foreach($data as $row) {
            $entity = $this->getRepository()->find($row->id);
            if (!$entity) {
                throw $this->createNotFoundException('Unable to find entity!');
            }
            $this->setEntity($row, $entity);
            $this->checkData($entity);
            $result[] = $entity->toArray();
        }
        $em->flush();

        return $result;
    }

    protected function removeData($data) {
        $result = [];
        $em   = $this->getDoctrine()->getManager();

        foreach($data as $row) {
            $entity = $this->getRepository()->find($row->id);
            if (!$entity) {
                throw $this->createNotFoundException('Unable to find entity!');
            }
            $em->remove($entity);
            $result[] = $entity->toArray();
        }
        $em->flush();

        return $result;
    }

    public function readAction() {
        try {
            $data = $this->getRepository()->getAllArray();
            return $this->getResultJson($data);
        } catch (Exception $e) {
            return $this->getErrorJson($e);
        }
    }

    public function createAction(Request $request) {
        try {
            $request_data = $this->getRequestData($request);
            foreach($request_data as $row) {
                $entity = $this->setEntity($row);
                $this->save($entity);
            }
            return $this->getResultJson($entity->toArray());
        } catch (Exception $e) {
            return $this->getErrorJson($e);
        }
    }

    public function updateAction(Request $request) {
        try {
            $request_data = $this->getRequestData($request);
            $data = $this->setData($request_data);
            return $this->getResultJson($data);
        } catch (Exception $e) {
            return $this->getErrorJson($e);
        }
    }

    public function deleteAction(Request $request) {
        try {
            $request_data = $this->getRequestData($request);
            $data = $this->removeData($request_data);
            return $this->getResultJson($data);
        } catch(Exception $e) {
            return $this->getErrorJson($e);
        }
    }
}

?>

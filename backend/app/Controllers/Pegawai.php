<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use App\Models\PegawaiModel;
class Pegawai extends ResourceController
{
    protected $modelName = 'App\Models\PegawaiModel';
    protected $format = 'json';
	
    public function index()
    {
        $model = new PegawaiModel();
        $pegawai = $model->findAll();
        return $this->respond($pegawai);
    }

    // Implement other CRUD methods (create, update, delete) based on your needs
	public function create()
    {
        $model = new PegawaiModel();
        $data = [
            'nip' => $this->request->getPost('nip'),
            'firstname' => $this->request->getPost('firstname'),
            'lastname' => $this->request->getPost('lastname'),
            'email' => $this->request->getPost('email'),
            'address' => $this->request->getPost('address'),
            'phone' => $this->request->getPost('phone'),
            'photo' => $this->request->getPost('photo'),
        ];

        $model->save($data);
        $response = [
            'status' => 201,
            'message' => 'User created successfully',
        ];

        return $this->respondCreated($response);
    }

    public function update($id = null)
    {
        $model = new PegawaiModel();
        $data = [
            'nip' => $this->request->getPost('nip'),
            'firstname' => $this->request->getPost('firstname'),
            'lastname' => $this->request->getPost('lastname'),
            'email' => $this->request->getPost('email'),
            'address' => $this->request->getPost('address'),
            'phone' => $this->request->getPost('phone'),
            'photo' => $this->request->getPost('photo'),
        ];

        $model->update($id, $data);
        $response = [
            'status' => 200,
            'message' => 'User updated successfully',
        ];

        return $this->respond($response);
    }

    public function delete($id = null)
    {
        $model = new PegawaiModel();
        $model->delete($id);
        $response = [
            'status' => 200,
            'message' => 'User deleted successfully',
        ];

        return $this->respondDeleted($response);
    }
}
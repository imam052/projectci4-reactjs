<?php

namespace App\Controllers;

use App\Models\UserModel;
use CodeIgniter\RESTful\ResourceController;

class Users extends ResourceController
{
    protected $modelName = 'App\Models\UserModel';
    protected $format = 'json';
	
    public function index()
    {
        $model = new UserModel();
        $users = $model->findAll();
        return $this->respond($users);
    }

    // Implement other CRUD methods (create, update, delete) based on your needs
	public function create()
    {
        $model = new UserModel();
        $data = [
            'username' => $this->request->getPost('username'),
            'password' => password_hash($this->request->getPost('password'), PASSWORD_BCRYPT),
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
        $model = new UserModel();
        $data = [
            'username' => $this->request->getVar('username'),
            'email' => $this->request->getVar('email'),
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
        $model = new UserModel();
        $model->delete($id);
        $response = [
            'status' => 200,
            'message' => 'User deleted successfully',
        ];

        return $this->respondDeleted($response);
    }
	
    public function register()
    {
        $rules = [
            'username' => 'required|min_length[4]|max_length[20]|is_unique[users.username]',
            'password' => 'required|min_length[8]'
        ];

        if (!$this->validate($rules)) {
            return $this->failValidationErrors($this->validator->getErrors());
        }

        $model = new UserModel();
        $data = [
            'username' => $this->request->getVar('username'),
            'password' => password_hash($this->request->getVar('password'), PASSWORD_BCRYPT),
        ];

        $user_id = $model->insert($data);
        $response = [
            'status' => 201,
            'message' => 'User registered successfully',
            'data' => $user_id,
        ];

        return $this->respondCreated($response);
    }

    public function login()
    {
        $model = new UserModel();
        $user = $model->where('username', $this->request->getVar('username'))->first();
        print_r($user);exit;
        if ($user) {
            if (password_verify($this->request->getVar('password'), $user['password'])) {
                return $this->respond(['message' => 'Login successful']);
            } else {
                return $this->failUnauthorized('Invalid password');
            }
        } else {
            return $this->failNotFound('User not found');
        }
    }
}
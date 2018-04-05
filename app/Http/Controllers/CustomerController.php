<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Models\Customer;
use Input;
use Validator;
use DateTime;

class CustomerController extends Controller
{
    /**
     * Get all Customer Lists
     *
     * @return JSON
     */
    public function getIndex(){
        $customers = Customer::all();
        return response()->success(compact('customers'));
    }

    /**
     * Get Customer details referenced by id.
     *
     * @param int Role ID
     *
     * @return JSON
     */
    public function getShow($id)
    {
        $customer = Customer::find($id);
        return response()->success($customer);
    }

    /**
     * Update Customer data and assign permission.
     *
     * @return JSON success message
     */
    public function putShow()
    {
        $CustomerForm = Input::get('data');
        $CustomerData = [
            'name' => $CustomerForm['name'],
            'date_of_birth' => $CustomerForm['date_of_birth'],
            'subscription_start_date' => $CustomerForm['subscription_start_date'],
            'phone' => $CustomerForm['phone'],
        ];

        $affectedRows = Customer::where('id', '=', intval($CustomerForm['id']))->update($CustomerData);

        return response()->success('success');
    }

    /**
     * Create new Customer 
     *
     * @return JSON
     */
    public function postIndex()
    {
        $customer = Customer::create([
            'name' => Input::get('name'),
            'date_of_birth' => Input::get('date_of_birth'),
            'subscription_start_date' => Input::get('subscription_start_date'),
            'phone' => Input::get('phone'),
        ]);

        return response()->success(compact('customer'));
    }

    /**
     * Delete Customer  referenced by id.
     *
     * @param int Customer ID
     *
     * @return JSON
     */
    public function deleteCustomer($id)
    {
        Customer::destroy($id);

        return response()->success('success');
    }

}

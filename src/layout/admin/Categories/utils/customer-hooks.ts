// hooks/useCustomerForm.ts
import { useState } from 'react';
import { Form, message } from 'antd';
import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

type Customer = {
  name?: string;
  sdt?: number;
  diemth?: string;
};

export const useCustomerForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const [messageApi, contextHolder] = message.useMessage();

  const { mutate: addCustomer } = useMutation({
    mutationFn: (customer: Customer) => axios.post(`http://localhost:3000/customers`, customer),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:["customers"]});
      messageApi.success('Customer added successfully');
    },
    onError: (error) => {
      console.error('Error adding customer:', error);
      messageApi.error('Failed to add customer');
    },
  });

  const onFinish = async (values: Customer) => {
    setLoading(true);
    addCustomer(values);
    setLoading(false);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return {
    form,
    loading,
    onFinish,
    onFinishFailed,
    contextHolder,
  };
};
export const useCustomers = () => {
  return useQuery({
    queryKey: ['customers'],
    queryFn: async () => {
      const { data } = await axios.get(`http://localhost:3000/customers`);
      return data.map((customer: any) => ({
        key: customer.id,
        ...customer,
      }));
    },
    staleTime: 60000, // Data remains fresh for 1 minute
  });
};

export const useDeleteCustomer = () => {
  const queryClient = useQueryClient();
  const [messageApi, contextHolder] = message.useMessage();

  const mutation = useMutation({
    mutationFn: (id: number) => axios.delete(`${`http://localhost:3000/customers`}/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:["customers"]});
      messageApi.success('Customer deleted successfully');
    },
    onError: (error) => {
      console.error('Error deleting customer:', error);
      messageApi.error('Failed to delete customer');
    },
  });

  return { mutate: mutation.mutate, contextHolder };
};
export const useCustomer = (id: string) => {
  return useQuery({
    queryKey: ['customer', id],
    queryFn: () => axios.get(`${`http://localhost:3000/customers`}/${id}`).then(res => res.data),
    enabled: !!id, // Only run the query if id is available
  });
};
export const useUpdateCustomer = (id: string) => {
  const queryClient = useQueryClient();
  const [messageApi, contextHolder] = message.useMessage();

  const mutation = useMutation({
    mutationFn: (customer: any) => axios.put(`${`http://localhost:3000/customers`}/${id}`, customer),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:["customers"]});
      messageApi.success('Customer updated successfully');
    },
    onError: (error) => {
      console.error('Error updating customer:', error);
      messageApi.error('Failed to update customer');
    },
  });

  return { mutate: mutation.mutate, contextHolder };
};
export const useCust = (id: string) => {
  const queryClient = useQueryClient();
  const [messageApi, contextHolder] = message.useMessage();

  
  const { data, isLoading } = useQuery({
    queryKey: ["customers", id],
    queryFn: () => axios.get(`http://localhost:3000/customers/${id}`),
  });

  
  const { mutate } = useMutation({
    mutationFn: (customer: any) => axios.put(`http://localhost:3000/customers/${id}`, customer),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["customer"],
      });
      messageApi.success("Sửa khách hàng thành công");
    },
  });

  return {
    data,
    isLoading,
    mutate,
    contextHolder,
  };
};
